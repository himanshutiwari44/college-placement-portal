import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config();

const app=express();


app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
let db;

const connectDB = async () => {
  try {
    if (!process.env.dbconn) {
      throw new Error('Database connection string not found in environment variables');
    }
    
    db = await mysql.createConnection(process.env.dbconn);
    
    console.log('MySQL Connected!');

    // Add ping to verify connection
    await db.ping();

    // Ensure required tables exist (idempotent)
    await db.execute(
      `CREATE TABLE IF NOT EXISTS student_credentials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        
      )`
    );

    await db.execute(
      `CREATE TABLE IF NOT EXISTS teacher_credentials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        
      )`
    );

    await db.execute(
      `CREATE TABLE IF NOT EXISTS students (
        studentid INT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        university VARCHAR(255),
        rollno INT,
        cgpa FLOAT
      )`
    );

    await db.execute(
      `CREATE TABLE IF NOT EXISTS teachers (
        teacherid INT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        department VARCHAR(255)
      )`
    );
  } catch (error) {
    console.error('MySQL Connection Failed:', error.message);
    throw error; // Propagate error up
  }
}

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ message: 'Database connection not established' });
  }
  next();
});

// Authentication Routes

// Student Signup
app.post('/api/auth/student/signup', async (req, res) => {
  try {
    const { email, password, name, university, rollno, studentId, cgpa } = req.body;
    
    // Check if student already exists
    const [existingStudent] = await db.execute(
      'SELECT * FROM student_credentials WHERE email = ?',
      [email]
    );
    
    if (existingStudent.length > 0) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert student credentials
    await db.execute(
      'INSERT INTO student_credentials (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    
    // Insert student details (students table is created at startup in connectDB)
    await db.execute(
      'INSERT INTO students (studentid, email, name, university, rollno, cgpa) VALUES (?, ?, ?, ?, ?, ?)',
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
    const [existingFaculty] = await db.execute(
      'SELECT * FROM teacher_credentials WHERE email = ?',
      [email]
    );
    
    if (existingFaculty.length > 0) {
      return res.status(400).json({ message: 'Faculty already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert faculty credentials
    await db.execute(
      'INSERT INTO teacher_credentials (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    
    // Insert faculty details (assuming you have a teachers table)
    await db.execute(
      'CREATE TABLE IF NOT EXISTS teachers (teacherid INT PRIMARY KEY, email VARCHAR(255) UNIQUE, name VARCHAR(255), department VARCHAR(255))'
    );
    await db.execute(
      'INSERT INTO teachers (teacherid,email, name, department) VALUES (?, ?, ?, ?)',
      [teacherId,email,name, department]
    );
    
    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error('Faculty signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login (for both students and faculty)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
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
    const [credentials] = await db.execute(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email]
    );
    
    if (credentials.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, credentials[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Get user details
    const [userDetails] = await db.execute(
      `SELECT * FROM ${userTable} WHERE email = ?`,
      [email]
    );
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        email: credentials[0].email,
        role: role,
        ...userDetails[0]
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
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