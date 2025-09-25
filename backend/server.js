import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2/promise';

dotenv.config();

const app=express();
const port=process.env.PORT;

app.use(cors());
app.use(express.json());

let db;
const connectDB = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("MySQL Connected!");
  } catch (error) {
    console.error("MySQL Connection Failed:", error.message);
    process.exit(1);
  }
};

app.listen(port,async()=>{
    await connectDB();
    console.log(`Server running on port ${port}`);
});