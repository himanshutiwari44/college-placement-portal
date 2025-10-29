import express from 'express';

const router = express.Router();

// GET /api/student/applications?email=...&limit=...
// Finds student by email, then returns applications joined with jobs
router.get('/applications', async (req, res) => {
  try {
    const { email, limit } = req.query;
    if (!email) return res.status(400).json({ message: 'email is required' });

    const studentRes = await req.db.query(
      'SELECT studentid FROM students WHERE email = $1',
      [email]
    );
    if (studentRes.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const studentid = studentRes.rows[0].studentid;
    const limitNum = limit ? parseInt(limit, 10) : null;

    let query = `SELECT a.id,
              a.studentid,
              a.jobid,
              a.status,
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
        ORDER BY a.id DESC`;
    
    const params = [studentid];
    if (limitNum && limitNum > 0) {
      query += ` LIMIT $2`;
      params.push(limitNum);
    }

    const apps = await req.db.query(query, params);

    res.json(apps.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch applications' });
  }
});

// PUT /api/student/applications/:id - update status
router.put('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = [
      'applied',
      'interview scheduled',
      'offer received',
      'placed',
      'rejected',
    ];
    if (!status || !allowed.includes(status.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await req.db.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING id, studentid, jobid, status',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to update application' });
  }
});

export default router;
// POST /api/student/applications - create new application with status
// body: { email, jobid, status }
router.post('/applications', async (req, res) => {
  try {
    const { email, jobid, status } = req.body;
    if (!email || !jobid) {
      return res.status(400).json({ message: 'email and jobid are required' });
    }
    const allowed = [
      'applied',
      'interview scheduled',
      'offer received',
      'placed',
      'rejected',
    ];
    const normalizedStatus = (status || 'applied').toLowerCase();
    if (!allowed.includes(normalizedStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const studentRes = await req.db.query('SELECT studentid FROM students WHERE email = $1', [email]);
    if (studentRes.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const studentid = studentRes.rows[0].studentid;

    // prevent duplicates
    const exists = await req.db.query('SELECT 1 FROM applications WHERE studentid = $1 AND jobid = $2', [studentid, jobid]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'Already applied to this job' });
    }

    const insert = await req.db.query(
      'INSERT INTO applications (studentid, jobid, status) VALUES ($1, $2, $3) RETURNING id, studentid, jobid, status',
      [studentid, jobid, normalizedStatus]
    );
    res.status(201).json(insert.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to create application' });
  }
});


