import express from 'express';

const router = express.Router();

// GET /api/faculty/jobs - list all jobs
router.get('/jobs', async (req, res) => {
  try {
    const result = await req.db.query(
      `SELECT jobid, companyname, location, salary, expereience, deadline, jobdescription, requirements, link
       FROM jobs
       ORDER BY jobid ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch jobs' });
  }
});

// POST /api/faculty/jobs - create a new job
router.post('/jobs', async (req, res) => {
  try {
    const {
      jobid,
      companyname,
      location,
      salary,
      expereience,
      deadline,
      jobdescription,
      requirements,
      link,
    } = req.body;

    if (
      jobid == null ||
      !companyname ||
      !location ||
      !salary ||
      !expereience ||
      !deadline ||
      !jobdescription ||
      !requirements ||
      !link
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const insertQuery = `
      INSERT INTO jobs (jobid, companyname, location, salary, expereience, deadline, jobdescription, requirements, link)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING jobid, companyname, location, salary, expereience, deadline, jobdescription, requirements, link`;

    const result = await req.db.query(insertQuery, [
      jobid,
      companyname,
      location,
      salary,
      expereience,
      deadline,
      jobdescription,
      requirements,
      link,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to create job' });
  }
});

// PUT /api/faculty/jobs/:jobid - update a job
router.put('/jobs/:jobid', async (req, res) => {
  try {
    const { jobid } = req.params;
    const {
      companyname,
      location,
      salary,
      expereience,
      deadline,
      jobdescription,
      requirements,
      link,
    } = req.body;

    const updateQuery = `
      UPDATE jobs
      SET companyname = COALESCE($1, companyname),
          location = COALESCE($2, location),
          salary = COALESCE($3, salary),
          expereience = COALESCE($4, expereience),
          deadline = COALESCE($5, deadline),
          jobdescription = COALESCE($6, jobdescription),
          requirements = COALESCE($7, requirements),
          link = COALESCE($8, link)
      WHERE jobid = $9
      RETURNING jobid, companyname, location, salary, expereience, deadline, jobdescription, requirements, link`;

    const result = await req.db.query(updateQuery, [
      companyname,
      location,
      salary,
      expereience,
      deadline,
      jobdescription,
      requirements,
      link,
      jobid,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to update job' });
  }
});

export default router;


