import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import studentProfileApi from './apis/studentApi/profileApi.js';
import studentChangePasswordApi from './apis/studentApi/changePasswordApi.js';
import studentApplicationsApi from './apis/studentApi/applicationsApi.js';
import studentJobsApi from './apis/studentApi/jobsApi.js';
import facultyProfileApi from './apis/facultyApi/profileApi.js';
import facultyChangePasswordApi from './apis/facultyApi/changePasswordApi.js';
import facultyJobsApi from './apis/facultyApi/jobsApi.js';
import facultyDashboardApi from './apis/facultyApi/dashboardApi.js';
import facultyStudentsApi from './apis/facultyApi/studentsApi.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
let db;

const connectDB = async () => {
  try {
    if (!process.env.dbconn) {
      throw new Error('Database connection string not found in environment variables');
    }
    
    const pool = new pg.Pool({
      connectionString: process.env.dbconn,
    });
    
    db = pool;
    await pool.query('SELECT NOW()'); // Test connection
    console.log('PostgreSQL Connected!');

    // Updated table creation for PostgreSQL
    await db.query(`
      CREATE TABLE IF NOT EXISTS student_credentials (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )`
    );

    await db.query(`
      CREATE TABLE IF NOT EXISTS teacher_credentials (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )`
    );

    await db.query(`
      CREATE TABLE IF NOT EXISTS students (
        studentid INTEGER PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        university VARCHAR(255),
        rollno INTEGER,
        cgpa FLOAT,
        contact VARCHAr(10),
        branch VARCHAR(255),
        admission_year INTEGER,
        grad_year INTEGER,
        semester INTEGER,
        linkedin VARCHAR(255),
        github VARCHAR(255),
        portfolio VARCHAR(255)
      )`
    );

    await db.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        teacherid INTEGER PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        department VARCHAR(255),
        contact VARCHAR(10)
      )`
    );

    // Jobs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        jobid INTEGER PRIMARY KEY,
        companyname VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        salary VARCHAR(255) NOT NULL,
        expereience VARCHAR(255) NOT NULL,
        deadline DATE NOT NULL,
        jobdescription VARCHAR(255) NOT NULL,
        requirements VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL
      )`
    );

    // Applications table
    await db.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        job_id INTEGER NOT NULL,
        student_email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_email) REFERENCES students(email)
      )`
    );
  } catch (error) {
    console.error('PostgreSQL Connection Failed:', error.message);
    throw error;
  }
}

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ message: 'Database connection not established' });
  }
  next();
});

// Add db to req object middleware
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Authentication Routes

// Student Signup
app.post('/api/auth/student/signup', async (req, res) => {
  try {
    const { email, password, name, university, rollno, studentId, cgpa } = req.body;
    
    // Check if student exists
    const existingStudent = await db.query(
      'SELECT * FROM student_credentials WHERE email = $1',
      [email]
    );
    
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO student_credentials (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    
    await db.query(
      'INSERT INTO students (studentid, email, name, university, rollno, cgpa) VALUES ($1, $2, $3, $4, $5, $6)',
      [studentId, email, name, university, rollno, cgpa]
    );
    
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Student signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Faculty Signup
app.post('/api/auth/faculty/signup', async (req, res) => {
  try {
    const { email, password, teacherId, name, department } = req.body;
    
    // Check if faculty already exists
    const existingFaculty = await db.query(
      'SELECT * FROM teacher_credentials WHERE email = $1',
      [email]
    );
    
    if (existingFaculty.rows.length > 0) {
      return res.status(400).json({ message: 'Faculty already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert faculty credentials
    await db.query(
      'INSERT INTO teacher_credentials (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    
    // Insert faculty details
    await db.query(
      'INSERT INTO teachers (teacherid, email, name, department) VALUES ($1, $2, $3, $4)',
      [teacherId, email, name, department]
    );
    
    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error('Faculty signup error:', error);
    // Send more specific error message
    res.status(500).json({ 
      message: error.message || 'Faculty registration failed. Please try again.'
    });
  }
});

// Login (for both students and faculty)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    let tableName, userTable;
    if (role === 'student') {
      tableName = 'student_credentials';
      userTable = 'students';
    } else if (role === 'faculty') {
      tableName = 'teacher_credentials';
      userTable = 'teachers';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    // Find user credentials
    const credentialsResult = await db.query(
      `SELECT * FROM ${tableName} WHERE email = $1`,
      [email]
    );
    
    if (credentialsResult.rows.length === 0) {
      return res.status(401).json({ message: 'Email not found' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, credentialsResult.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // Get user details
    const userDetailsResult = await db.query(
      `SELECT * FROM ${userTable} WHERE email = $1`,
      [email]
    );
    
    if (userDetailsResult.rows.length === 0) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        email: credentialsResult.rows[0].email,
        role: role,
        ...userDetailsResult.rows[0]
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: error.message || 'Login failed. Please try again.'
    });
  }
});

// Add new routes (prefixed with /api to match frontend)
app.get('/api/faculty/applications', async (req, res) => {
  try {
    // First get all applications with student details
    const result = await db.query(`
      SELECT 
        a.job_id,
        a.status,
        a.applied_date,
        s.name as student_name,
        s.email as student_email,
        s.cgpa,
        s.branch,
        s.semester,
        s.university
      FROM applications a
      JOIN students s ON a.student_email = s.email
      ORDER BY a.applied_date DESC
    `);
    
    // Group applications by job_id
    const applications = result.rows.reduce((acc, curr) => {
      if (!acc[curr.job_id]) {
        acc[curr.job_id] = {
          job_id: curr.job_id,
          applicants: []
        };
      }
      acc[curr.job_id].applicants.push({
        name: curr.student_name,
        email: curr.student_email,
        cgpa: curr.cgpa,
        branch: curr.branch,
        semester: curr.semester,
        university: curr.university,
        status: curr.status,
        applied_date: curr.applied_date
      });
      return acc;
    }, {});

    res.json(Object.values(applications));
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Improve server startup
const startServer = async () => {
  try {
    await connectDB();
app.use('/api/student', studentProfileApi);
app.use('/api/student', studentChangePasswordApi);
app.use('/api/student', studentApplicationsApi);
app.use('/api/student', studentJobsApi);
app.use('/api/faculty', facultyProfileApi);
app.use('/api/faculty', facultyChangePasswordApi);
app.use('/api/faculty', facultyJobsApi);
app.use('/api/faculty', facultyDashboardApi);
app.use('/api/faculty', facultyStudentsApi);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and DB connection...');
  if (db) {
    await db.end();
  }
  process.exit(0);
});

startServer();

// No code changes required — follow the git steps above to commit & push this file as-is.