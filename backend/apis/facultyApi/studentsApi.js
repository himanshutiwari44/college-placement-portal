import express from 'express';

const router = express.Router();

// GET /api/faculty/students/cards
// Returns counts for students page cards
router.get('/students/cards', async (req, res) => {
  try {
    const [totalStudentsRes, placedStudentsRes, avgCgpaRes] = await Promise.all([
      req.db.query('SELECT COUNT(*)::int AS count FROM students'),
      req.db.query("SELECT COUNT(DISTINCT a.studentid)::int AS count FROM applications a WHERE LOWER(a.status) = 'placed'"),
      req.db.query('SELECT ROUND(AVG(cgpa)::numeric, 2) AS avg FROM students WHERE cgpa IS NOT NULL'),
    ]);

    res.json({
      totalStudents: totalStudentsRes.rows[0].count,
      placedStudents: placedStudentsRes.rows[0].count,
      averageCgpa: Number(avgCgpaRes.rows[0].avg) || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch students cards' });
  }
});

// GET /api/faculty/students?search=...
// Returns students with aggregated placement stats; supports text search across many columns
router.get('/students', async (req, res) => {
  try {
    const { search } = req.query;

    const like = (v) => `%${v.toLowerCase()}%`;
    const searchable = [
      'LOWER(name) LIKE $1',
      'CAST(rollno AS TEXT) LIKE $1',
      'LOWER(email) LIKE $1',
      'LOWER(university) LIKE $1',
      'LOWER(branch) LIKE $1',
      'LOWER(contact) LIKE $1',
      'LOWER(linkedin) LIKE $1',
      'LOWER(github) LIKE $1',
      'LOWER(portfolio) LIKE $1',
    ];

    const whereClause = search ? `WHERE ${searchable.join(' OR ')}` : '';
    const params = search ? [like(search)] : [];

    const query = `
      SELECT s.studentid,
             s.name,
             s.email,
             s.rollno,
             s.branch,
             s.grad_year AS year,
             s.cgpa,
             s.contact AS phone,
             COALESCE(app_counts.total_applications, 0) AS applications,
             COALESCE(interview_counts.total_interviews, 0) AS interviews,
             COALESCE(placed_counts.total_placements, 0) AS placements
        FROM students s
        LEFT JOIN (
          SELECT a.studentid, COUNT(*)::int AS total_applications
            FROM applications a
           GROUP BY a.studentid
        ) app_counts ON app_counts.studentid = s.studentid
        LEFT JOIN (
          SELECT a.studentid, COUNT(*)::int AS total_interviews
            FROM applications a
           WHERE LOWER(a.status) = 'interview scheduled'
           GROUP BY a.studentid
        ) interview_counts ON interview_counts.studentid = s.studentid
        LEFT JOIN (
          SELECT a.studentid, COUNT(*)::int AS total_placements
            FROM applications a
           WHERE LOWER(a.status) = 'placed'
           GROUP BY a.studentid
        ) placed_counts ON placed_counts.studentid = s.studentid
        ${whereClause}
        ORDER BY s.studentid ASC`;

    const result = await req.db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch students' });
  }
});

export default router;
// GET /api/faculty/students/:studentid - single student details
router.get('/students/:studentid', async (req, res) => {
  try {
    const { studentid } = req.params;
    const result = await req.db.query(
      `SELECT studentid, name, email, rollno, branch, university, admission_year, grad_year, semester, cgpa, contact, linkedin, github, portfolio
         FROM students
        WHERE studentid = $1`,
      [studentid]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Student not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch student details' });
  }
});

// GET /api/faculty/students/:studentid/applications - student's applications with job info
router.get('/students/:studentid/applications', async (req, res) => {
  try {
    const { studentid } = req.params;
    const apps = await req.db.query(
      `SELECT a.id,
              a.status,
              j.jobid,
              j.companyname,
              j.location,
              j.salary,
              j.expereience,
              j.deadline,
              j.jobdescription,
              j.requirements,
              j.link
         FROM applications a
         JOIN jobs j ON j.jobid = a.jobid
        WHERE a.studentid = $1
        ORDER BY a.id DESC`,
      [studentid]
    );
    res.json(apps.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch student applications' });
  }
});


