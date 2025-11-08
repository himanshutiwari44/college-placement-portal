import express from 'express';

const router = express.Router();

// GET /api/faculty/notifications - get all notifications for a teacher
router.get('/notifications', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    // Get teacher_id from email
    const teacherResult = await req.db.query(
      'SELECT teacherid FROM teachers WHERE email = $1',
      [email]
    );

    if (teacherResult.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacher_id = teacherResult.rows[0].teacherid;

    // Get all notifications with view statistics
    const result = await req.db.query(
      `SELECT 
        n.notification_id,
        n.teacher_id,
        n.title,
        n.message,
        n.created_at,
        COUNT(nr.recipient_id) as total_recipients,
        COUNT(CASE WHEN nr.is_read = true THEN 1 END) as viewed_count,
        COUNT(CASE WHEN nr.is_read = false THEN 1 END) as not_viewed_count
       FROM notifications n
       LEFT JOIN notification_recipients nr ON n.notification_id = nr.notification_id
       WHERE n.teacher_id = $1
       GROUP BY n.notification_id, n.teacher_id, n.title, n.message, n.created_at
       ORDER BY n.created_at DESC`,
      [teacher_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch notifications' });
  }
});

// GET /api/faculty/notifications/:notification_id - get a single notification with recipient details
router.get('/notifications/:notification_id', async (req, res) => {
  try {
    const { notification_id } = req.params;

    // Get notification details
    const notificationResult = await req.db.query(
      `SELECT n.notification_id, n.teacher_id, n.title, n.message, n.created_at,
              t.name as teacher_name
       FROM notifications n
       JOIN teachers t ON n.teacher_id = t.teacherid
       WHERE n.notification_id = $1`,
      [notification_id]
    );

    if (notificationResult.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Get recipients with their read status
    const recipientsResult = await req.db.query(
      `SELECT nr.recipient_id, nr.student_id, nr.is_read,
              s.name as student_name, s.email as student_email
       FROM notification_recipients nr
       JOIN students s ON nr.student_id = s.studentid
       WHERE nr.notification_id = $1
       ORDER BY s.name ASC`,
      [notification_id]
    );

    res.json({
      notification: notificationResult.rows[0],
      recipients: recipientsResult.rows
    });
  } catch (err) {
    console.error('Error fetching notification details:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch notification details' });
  }
});

// POST /api/faculty/notifications - create a new notification
router.post('/notifications', async (req, res) => {
  try {
    const { email, title, message, student_ids } = req.body;

    if (!email || !title || !message) {
      return res.status(400).json({ message: 'email, title, and message are required' });
    }

    // Get teacher_id from email
    const teacherResult = await req.db.query(
      'SELECT teacherid FROM teachers WHERE email = $1',
      [email]
    );

    if (teacherResult.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacher_id = teacherResult.rows[0].teacherid;

    // Insert notification
    const notificationResult = await req.db.query(
      `INSERT INTO notifications (teacher_id, title, message)
       VALUES ($1, $2, $3)
       RETURNING notification_id, teacher_id, title, message, created_at`,
      [teacher_id, title, message]
    );

    const notification = notificationResult.rows[0];
    const notification_id = notification.notification_id;

    // If student_ids provided, create recipients for specific students
    // Otherwise, create recipients for all students
    let recipients = [];
    if (student_ids && Array.isArray(student_ids) && student_ids.length > 0) {
      // Create recipients for specified students
      for (const student_id of student_ids) {
        const recipientResult = await req.db.query(
          `INSERT INTO notification_recipients (notification_id, student_id)
           VALUES ($1, $2)
           RETURNING recipient_id, notification_id, student_id, is_read`,
          [notification_id, student_id]
        );
        recipients.push(recipientResult.rows[0]);
      }
    } else {
      // Create recipients for all students
      const allStudentsResult = await req.db.query(
        'SELECT studentid FROM students'
      );
      
      for (const student of allStudentsResult.rows) {
        const recipientResult = await req.db.query(
          `INSERT INTO notification_recipients (notification_id, student_id)
           VALUES ($1, $2)
           RETURNING recipient_id, notification_id, student_id, is_read`,
          [notification_id, student.studentid]
        );
        recipients.push(recipientResult.rows[0]);
      }
    }

    res.status(201).json({
      notification,
      recipients_count: recipients.length
    });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ message: err.message || 'Failed to create notification' });
  }
});

// PUT /api/faculty/notifications/:notification_id - update a notification
router.put('/notifications/:notification_id', async (req, res) => {
  try {
    const { notification_id } = req.params;
    const { title, message } = req.body;

    if (!title && !message) {
      return res.status(400).json({ message: 'At least one field (title or message) is required' });
    }

    const updateFields = [];
    const values = [];
    let paramIndex = 1;

    if (title) {
      updateFields.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }

    if (message) {
      updateFields.push(`message = $${paramIndex}`);
      values.push(message);
      paramIndex++;
    }

    values.push(notification_id);

    const result = await req.db.query(
      `UPDATE notifications
       SET ${updateFields.join(', ')}
       WHERE notification_id = $${paramIndex}
       RETURNING notification_id, teacher_id, title, message, created_at`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ message: err.message || 'Failed to update notification' });
  }
});

// DELETE /api/faculty/notifications/:notification_id - delete a notification
router.delete('/notifications/:notification_id', async (req, res) => {
  try {
    const { notification_id } = req.params;

    // Check if notification exists
    const checkResult = await req.db.query(
      'SELECT notification_id FROM notifications WHERE notification_id = $1',
      [notification_id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Delete notification (recipients will be deleted automatically due to CASCADE)
    await req.db.query(
      'DELETE FROM notifications WHERE notification_id = $1',
      [notification_id]
    );

    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: err.message || 'Failed to delete notification' });
  }
});

// GET /api/faculty/notifications/:notification_id/recipients - get recipients for a notification
router.get('/notifications/:notification_id/recipients', async (req, res) => {
  try {
    const { notification_id } = req.params;

    const result = await req.db.query(
      `SELECT nr.recipient_id, nr.student_id, nr.is_read,
              s.name as student_name, s.email as student_email, s.rollno, s.branch
       FROM notification_recipients nr
       JOIN students s ON nr.student_id = s.studentid
       WHERE nr.notification_id = $1
       ORDER BY s.name ASC`,
      [notification_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching recipients:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch recipients' });
  }
});

export default router;

