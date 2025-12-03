import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';
// Postgres Neon Database Connection
const pool = new Pool({
    connectionString:`${process.env.CONNECTION_STRING}`,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000,
})

// Test DB Connection
const initDB = async () => {
  try {
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
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log(' Database tables initialized successfully');
  } catch (error) {
    console.error(' Database initialization failed:');
    console.error(error);
    console.error('Server will continue running, but DB operations will fail.');
  }
};

export { pool, initDB };