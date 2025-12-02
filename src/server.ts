import express from 'express';
import { Request, Response } from 'express';
import {Pool} from "pg"
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.join(process.cwd(),'.env')});
const app = express();
const PORT = 5000;

//Parse
app.use(express.json())
// From data Pawar jonno
// app.use(express.urlencoded({ extended: true }))

// Postgres Neon Database Connection
const pool = new Pool({
    connectionString:`${process.env.CONNECTION_STRING}`
})

// Test DB Connection
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      age INT NOT NULL,
      phone VARCHAR(15) NOT NULL UNIQUE,
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tods(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()


    )`)
};
initDB()







app.get('/',(req:Request,res:Response) =>{
    res.send('Hello, World to!');
})

app.post('/',(req:Request,res:Response) =>{
    console.log(req.body)
    res.status(201).json({
        success:true,
        message:"data posteddddd successfully"
    })
})

app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`);
});