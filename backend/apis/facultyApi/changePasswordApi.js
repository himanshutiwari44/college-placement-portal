import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /api/faculty/change-password
router.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Email, current password, and new password are required' });
    }

    const creds = await req.db.query('SELECT password FROM teacher_credentials WHERE email = $1', [email]);
    if (creds.rows.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, creds.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await req.db.query('UPDATE teacher_credentials SET password = $1 WHERE email = $2', [hashed, email]);

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Faculty change password error:', err);
    return res.status(500).json({ message: err.message || 'Failed to change password' });
  }
});

export default router;


