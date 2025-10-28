# College Placement Portal - Authentication Setup

## Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the backend directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=5000
```

3. Make sure your MySQL database has the following tables:

### student_credentials table:
```sql
CREATE TABLE student_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### teacher_credentials table:
```sql
CREATE TABLE teacher_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### students table:
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    university VARCHAR(255) NOT NULL,
    rollno VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### teachers table:
```sql
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    teacher_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Start the backend server:
```bash
npm start
```

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```

## Features Implemented

- **Role-based Authentication**: Separate login/signup for students and faculty
- **Student Signup**: Email, password, name, university, roll number, student ID, CGPA
- **Faculty Signup**: Email, password, teacher ID, name, department
- **Protected Routes**: Students can only access student routes, faculty can only access faculty routes
- **Password Hashing**: Secure password storage using bcryptjs
- **Session Management**: User authentication state managed with React Context

## Usage

1. Visit the homepage to see role selection
2. Click "New user? Create account" to go to signup
3. Select your role (Student or Faculty) and fill in the required information
4. After successful signup, you'll be redirected to login
5. Login with your credentials and selected role
6. You'll be redirected to the appropriate dashboard based on your role
