import { pool } from "../../Config/db"
import bcrypt from "bcrypt";

const createUser = async (payload: Record<string, any>) => {
      const {name, email, age, phone, password,role} = payload;

      const hasPassword = await bcrypt.hash(password as string, 10);
      
     
    const result = await pool.query(
          `INSERT INTO users (name,role, age, email, phone, password, address) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [name, role, age, email, phone, hasPassword, payload.address || null]
        );
    return result;
}
const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}
 
const getsingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
}

const UPdateuser = async (id: string, name: string, email: string, age: number, phone: string, address: string) =>{ 
    const result = await pool.query(`
      UPDATE users 
      SET name=$1, email=$2, age=$3, phone=$4, address=$5, updated_at=NOW()
      WHERE id=$6 RETURNING *

      `,[name, email, age, phone, address, id])
    return result;
}
const deleteUser =async (id: string) => {
const result =  await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id]);
return result;
}


export const userServices = { createUser, getAllUsers, getsingleUser, UPdateuser, deleteUser };