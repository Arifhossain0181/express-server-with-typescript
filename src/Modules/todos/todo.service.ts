import { pool } from  '../../Config/db'

const createtodos = async (user_id: number, title: string, description?: string, due_date?: string) => {
const result =  await pool.query(`
         INSERT INTO todos (user_id, title, description, due_date) 
         VALUES ($1, $2, $3, $4) RETURNING *
      `,[user_id,title,description || null,due_date || null])
      return result;
    }
    const todogetall = async () => {
    
    const result =  await pool.query(`SELECT * FROM todos`);
    return result;
    }

    export const createTodo = { createtodos, todogetall };