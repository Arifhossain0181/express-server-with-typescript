import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

// Load environment variables first
dotenv.config({path:path.join(process.cwd(),'.env')});

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
        role VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        age INT NOT NULL,
        phone VARCHAR(15) NOT NULL UNIQUE,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Add password column if it doesn't exist (for existing tables)
    await pool.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='users' AND column_name='password'
        ) THEN
          ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT '';
        END IF;
      END $$;
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