import express from 'express';

const router = express.Router();

// GET /api/student/notifications?email=... - get all notifications for a student
router.get('/notifications', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    // Get student_id from email
    const studentResult = await req.db.query(
      'SELECT studentid FROM students WHERE email = $1',
      [email]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const student_id = studentResult.rows[0].studentid;

    // Get all notifications for this student with teacher info
    // Sort: unread first, then by created_at DESC
    const result = await req.db.query(
      `SELECT 
        nr.recipient_id,
        nr.notification_id,
        nr.student_id,
        nr.is_read,
        n.title,
        n.message,
        n.created_at,
        t.name as teacher_name,
        t.department as teacher_department
       FROM notification_recipients nr
       JOIN notifications n ON nr.notification_id = n.notification_id
       JOIN teachers t ON n.teacher_id = t.teacherid
       WHERE nr.student_id = $1
       ORDER BY nr.is_read ASC, n.created_at DESC`,
      [student_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching student notifications:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch notifications' });
  }
});

// PUT /api/student/notifications/:recipient_id/read - mark notification as read
router.put('/notifications/:recipient_id/read', async (req, res) => {
  try {
    const { recipient_id } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    // Get student_id from email
    const studentResult = await req.db.query(
      'SELECT studentid FROM students WHERE email = $1',
      [email]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const student_id = studentResult.rows[0].studentid;

    // Verify the recipient belongs to this student
    const recipientCheck = await req.db.query(
      'SELECT recipient_id FROM notification_recipients WHERE recipient_id = $1 AND student_id = $2',
      [recipient_id, student_id]
    );

    if (recipientCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found or access denied' });
    }

    // Update is_read to true
    const result = await req.db.query(
      `UPDATE notification_recipients
       SET is_read = true
       WHERE recipient_id = $1
       RETURNING recipient_id, notification_id, student_id, is_read`,
      [recipient_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: err.message || 'Failed to mark notification as read' });
  }
});

export default router;

