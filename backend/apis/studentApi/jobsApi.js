import express from 'express';

const router = express.Router();

// GET /api/student/jobs?email=...
// Returns jobs not yet applied by the student resolved via email
router.get('/jobs', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'email is required' });

    const studentRes = await req.db.query('SELECT studentid FROM students WHERE email = $1', [email]);
    if (studentRes.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const studentid = studentRes.rows[0].studentid;

    const jobsRes = await req.db.query(
      `SELECT j.jobid,
              j.companyname,
              j.location,
              j.salary,
              j.expereience,
              j.deadline,
              j.jobdescription,
              j.requirements,
              j.link,
              CASE WHEN a.id IS NOT NULL THEN true ELSE false END as is_applied
         FROM jobs j
         LEFT JOIN applications a ON a.studentid = $1 AND a.jobid = j.jobid
         ORDER BY j.deadline ASC NULLS LAST, j.jobid ASC`,
      [studentid]
    );

    res.json(jobsRes.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch jobs' });
  }
});

export default router;


