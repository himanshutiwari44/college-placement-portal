import express from 'express';

const router = express.Router();

// GET /api/faculty/reports/overview
// Returns overview statistics
router.get('/reports/overview', async (req, res) => {
  try {
    // Build queries array
    const queries = [
      req.db.query('SELECT COUNT(*)::int AS count FROM students'),
      req.db.query("SELECT COUNT(DISTINCT a.studentid)::int AS count FROM applications a WHERE LOWER(a.status) = 'placed'"),
      req.db.query('SELECT COUNT(*)::int AS count FROM applications'),
      req.db.query("SELECT COUNT(*)::int AS count FROM applications a WHERE LOWER(a.status) = 'interview scheduled'"),
      req.db.query('SELECT COUNT(DISTINCT companyname)::int AS count FROM jobs'),
      req.db.query('SELECT COUNT(*)::int AS count FROM jobs'),
    ];

    const [totalStudents, placedStudents, totalApplications, totalInterviews, totalCompanies, activeJobs] = await Promise.all(queries);

    const totalStudentsCount = totalStudents.rows[0].count;
    const placedStudentsCount = placedStudents.rows[0].count;
    const placementPercentage = totalStudentsCount > 0 
      ? ((placedStudentsCount / totalStudentsCount) * 100).toFixed(1) 
      : 0;

    res.json({
      totalStudents: totalStudentsCount,
      placedStudents: placedStudentsCount,
      placementPercentage: parseFloat(placementPercentage),
      totalApplications: totalApplications.rows[0].count,
      totalInterviews: totalInterviews.rows[0].count,
      totalCompanies: totalCompanies.rows[0].count,
      activeJobs: activeJobs.rows[0].count,
    });
  } catch (err) {
    console.error('Error fetching overview report:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      dateRange: req.query.dateRange
    });
    res.status(500).json({ 
      message: err.message || 'Failed to fetch overview report',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// GET /api/faculty/reports/branches
// Returns branch-wise placement statistics
router.get('/reports/branches', async (req, res) => {
  try {
    const result = await req.db.query(
      `SELECT 
        s.branch,
        COUNT(DISTINCT s.studentid)::int AS total_students,
        COUNT(DISTINCT CASE WHEN LOWER(a.status) = 'placed' THEN s.studentid END)::int AS placed_students,
        COUNT(DISTINCT a.id)::int AS total_applications,
        COUNT(DISTINCT CASE WHEN LOWER(a.status) = 'interview scheduled' THEN a.id END)::int AS interviews,
        ROUND(AVG(s.cgpa)::numeric, 2) AS avg_cgpa
      FROM students s
      LEFT JOIN applications a ON a.studentid = s.studentid
      WHERE s.branch IS NOT NULL AND s.branch != ''
      GROUP BY s.branch
      ORDER BY placed_students DESC, total_students DESC`
    );

    const branchData = result.rows.map(row => {
      const totalStudents = row.total_students || 0;
      const placedStudents = row.placed_students || 0;
      const percentage = totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(1) : 0;

      return {
        branch: row.branch || 'Not Specified',
        students: totalStudents,
        placed: placedStudents,
        percentage: parseFloat(percentage),
        applications: row.total_applications || 0,
        interviews: row.interviews || 0,
        avgCgpa: parseFloat(row.avg_cgpa) || 0,
      };
    });

    res.json(branchData);
  } catch (err) {
    console.error('Error fetching branch report:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch branch report' });
  }
});

// GET /api/faculty/reports/companies
// Returns company performance statistics
router.get('/reports/companies', async (req, res) => {
  try {
    const query = `SELECT 
          j.companyname,
          COUNT(DISTINCT j.jobid)::int AS jobs_posted,
          COUNT(DISTINCT a.id)::int AS total_applications,
          COUNT(DISTINCT CASE WHEN LOWER(a.status) = 'interview scheduled' THEN a.id END)::int AS interviews,
          COUNT(DISTINCT CASE WHEN LOWER(a.status) = 'placed' THEN a.id END)::int AS placements,
          COUNT(DISTINCT CASE WHEN LOWER(a.status) = 'offer received' THEN a.id END)::int AS offers_received
        FROM jobs j
        LEFT JOIN applications a ON a.jobid = j.jobid
        GROUP BY j.companyname
        HAVING COUNT(DISTINCT j.jobid) > 0
        ORDER BY placements DESC, interviews DESC, total_applications DESC`;

    const result = await req.db.query(query);

    const companyData = result.rows.map(row => {
      const applications = row.total_applications || 0;
      const placements = row.placements || 0;
      const conversion = applications > 0 ? ((placements / applications) * 100).toFixed(1) : 0;

      return {
        company: row.companyname,
        jobsPosted: row.jobs_posted || 0,
        applications: applications,
        interviews: row.interviews || 0,
        placements: placements,
        offersReceived: row.offers_received || 0,
        conversion: parseFloat(conversion),
      };
    });

    res.json(companyData);
  } catch (err) {
    console.error('Error fetching company report:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch company report' });
  }
});

// GET /api/faculty/reports/students
// Returns student performance statistics
router.get('/reports/students', async (req, res) => {
  try {
    const { sortBy = 'applications' } = req.query;

    let orderBy = 'total_applications DESC';
    if (sortBy === 'placements') orderBy = 'total_placements DESC';
    else if (sortBy === 'cgpa') orderBy = 's.cgpa DESC NULLS LAST';
    else if (sortBy === 'interviews') orderBy = 'total_interviews DESC';

    const result = await req.db.query(
      `SELECT 
        s.studentid,
        s.name,
        s.email,
        s.rollno,
        s.branch,
        s.cgpa,
        s.university,
        COALESCE(app_counts.total_applications, 0)::int AS total_applications,
        COALESCE(interview_counts.total_interviews, 0)::int AS total_interviews,
        COALESCE(placed_counts.total_placements, 0)::int AS total_placements,
        COALESCE(offer_counts.total_offers, 0)::int AS total_offers
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
      LEFT JOIN (
        SELECT a.studentid, COUNT(*)::int AS total_offers
        FROM applications a
        WHERE LOWER(a.status) = 'offer received'
        GROUP BY a.studentid
      ) offer_counts ON offer_counts.studentid = s.studentid
      ORDER BY ${orderBy}`
    );

    const studentData = result.rows.map(row => ({
      studentid: row.studentid,
      name: row.name,
      email: row.email,
      rollno: row.rollno,
      branch: row.branch,
      cgpa: row.cgpa ? parseFloat(row.cgpa) : null,
      university: row.university,
      applications: row.total_applications || 0,
      interviews: row.total_interviews || 0,
      placements: row.total_placements || 0,
      offers: row.total_offers || 0,
    }));

    res.json(studentData);
  } catch (err) {
    console.error('Error fetching student report:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch student report' });
  }
});

// GET /api/faculty/reports/status-breakdown
// Returns application status breakdown
router.get('/reports/status-breakdown', async (req, res) => {
  try {
    const result = await req.db.query(
      `SELECT 
        LOWER(COALESCE(status, 'applied')) AS status,
        COUNT(*)::int AS count
      FROM applications
      GROUP BY LOWER(COALESCE(status, 'applied'))
      ORDER BY count DESC`
    );

    const statusData = result.rows.map(row => ({
      status: row.status || 'applied',
      count: row.count || 0,
    }));

    res.json(statusData);
  } catch (err) {
    console.error('Error fetching status breakdown:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch status breakdown' });
  }
});

export default router;

