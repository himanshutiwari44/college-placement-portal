import express from 'express';

const router = express.Router();

// GET /api/faculty/dashboard/cards
// Returns aggregate counts for dashboard cards
router.get('/dashboard/cards', async (req, res) => {
  try {
    const [students, activeJobs, applications, placements, interviews, companies] = await Promise.all([
      req.db.query('SELECT COUNT(*)::int AS count FROM students'),
      req.db.query("SELECT COUNT(*)::int AS count FROM jobs "),
      req.db.query('SELECT COUNT(*)::int AS count FROM applications'),
      req.db.query("SELECT COUNT(*)::int AS count FROM applications WHERE LOWER(status) = 'placed'"),
      req.db.query("SELECT COUNT(*)::int AS count FROM applications WHERE LOWER(status) = 'interview scheduled'"),
      req.db.query('SELECT COUNT(DISTINCT companyname)::int AS count FROM jobs'),
    ]);

    res.json({
      totalStudents: students.rows[0].count,
      activeJobs: activeJobs.rows[0].count,
      applications: applications.rows[0].count,
      placements: placements.rows[0].count,
      interviewsScheduled: interviews.rows[0].count,
      companiesActive: companies.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch dashboard cards' });
  }
});

// GET /api/faculty/dashboard/recent-applications?limit=3
// Returns latest applications joined with student name and job/company
router.get('/dashboard/recent-applications', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '3', 10) || 3, 10);
    const result = await req.db.query(
      `SELECT a.id,
              a.status,
              s.name AS student_name,
              s.rollno AS roll_number,
              j.companyname AS company_name,
              j.jobid
         FROM applications a
         JOIN students s ON s.studentid = a.studentid
         JOIN jobs j ON j.jobid = a.jobid
         ORDER BY a.id DESC
         LIMIT $1`,
      [limit]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch recent applications' });
  }
});

export default router;


