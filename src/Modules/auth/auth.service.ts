import { pool } from "../../Config/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../Config/index.js";
const loginuser = async (email:string , password:string) =>{
   const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
   if(result.rows.length === 0){
    return null 
   }
   const user = result.rows[0];

   const isPasswordMatch = await bcrypt.compare(password, user.password);

   if(!isPasswordMatch){
    return null
   }
   const token = jwt.sign({name: user.name, email: user.email, id: user.id , role: user.role}, config.jwtSecret as string, {expiresIn: '1h'});
   user.token = token;
   console.log(token)
   
   return {token, user};
}

export const authService = { loginuser };
