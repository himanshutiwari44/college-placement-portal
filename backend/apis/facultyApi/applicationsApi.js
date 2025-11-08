import express from 'express';

const router = express.Router();

// GET /api/faculty/applications - get all jobs with their applicants
// Returns list of jobs, each with job details and list of students who applied
router.get('/applications', async (req, res) => {
  try {
    // Get all jobs with their application counts
    // Note: applications table uses jobid and studentid columns
    const jobsResult = await req.db.query(
      `SELECT j.jobid, j.companyname, j.location, j.salary, j.expereience, 
              j.deadline, j.jobdescription, j.requirements, j.link,
              COUNT(a.id) as application_count
       FROM jobs j
       LEFT JOIN applications a ON j.jobid = a.jobid
       GROUP BY j.jobid, j.companyname, j.location, j.salary, j.expereience, 
                j.deadline, j.jobdescription, j.requirements, j.link
       ORDER BY j.jobid ASC`
    );

    // For each job, get the list of students who applied
    const jobsWithApplicants = await Promise.all(
      jobsResult.rows.map(async (job) => {
        const applicantsResult = await req.db.query(
          `SELECT s.studentid, s.name, s.email, s.rollno, s.branch, 
                  s.semester, s.cgpa, s.university, s.contact,
                  a.id as application_id, a.status
           FROM applications a
           JOIN students s ON a.studentid = s.studentid
           WHERE a.jobid = $1
           ORDER BY a.id DESC`,
          [job.jobid]
        );

        return {
          jobid: job.jobid,
          companyname: job.companyname,
          location: job.location,
          salary: job.salary,
          expereience: job.expereience,
          deadline: job.deadline,
          jobdescription: job.jobdescription,
          requirements: job.requirements,
          link: job.link,
          application_count: parseInt(job.application_count) || 0,
          applicants: applicantsResult.rows.map(applicant => ({
            studentid: applicant.studentid,
            name: applicant.name,
            email: applicant.email,
            rollno: applicant.rollno,
            branch: applicant.branch,
            semester: applicant.semester,
            cgpa: applicant.cgpa,
            university: applicant.university,
            contact: applicant.contact,
            application_id: applicant.application_id,
            status: applicant.status
          }))
        };
      })
    );

    res.json(jobsWithApplicants);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch applications' });
  }
});

// GET /api/faculty/applications/:jobid - get applicants for a specific job
router.get('/applications/:jobid', async (req, res) => {
  try {
    const { jobid } = req.params;

    // Get job details
    const jobResult = await req.db.query(
      `SELECT jobid, companyname, location, salary, expereience, deadline, 
              jobdescription, requirements, link
       FROM jobs
       WHERE jobid = $1`,
      [jobid]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const job = jobResult.rows[0];

    // Get applicants for this job
    // Note: applications table uses jobid and studentid columns
    const applicantsResult = await req.db.query(
      `SELECT s.studentid, s.name, s.email, s.rollno, s.branch, 
              s.semester, s.cgpa, s.university, s.contact,
              a.id as application_id, a.status
       FROM applications a
       JOIN students s ON a.studentid = s.studentid
       WHERE a.jobid = $1
       ORDER BY a.id DESC`,
      [jobid]
    );

    res.json({
      job: job,
      applicants: applicantsResult.rows
    });
  } catch (err) {
    console.error('Error fetching job applications:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch job applications' });
  }
});

export default router;

