import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { initDB,pool } from './Config/db.js';
import config from './Config/index.js';
import logger from './Middleware/Logger.js';


const app = express();
const PORT = config.port;


//Parse
app.use(express.json())
// From data Pawar jonno


initDB();




app.get('/',logger, (req:Request,res:Response) =>{
  return  res.send('Hello, World to!');
})


// Create User route
app.post('/users',async (req:Request,res:Response) =>{     
    const {name,email,age,phone,address} = req.body;
    try{
        const result = await pool.query(
          `INSERT INTO users (name, age, email, phone, address) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [name, age, email, phone, address || null]
        );
        
        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:result.rows[0]
        })
    } catch(error:any){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
// get user 

app.get('/users',async(req:Request,res:Response) =>{
  try{
    const result = await pool.query(`SELECT * FROM users`);
    return res.status(200).json({
        success:true,
        message:"Users fetched successfully",
        data:result.rows
    })

  }
  catch(error:any){
    return res.status(500).json({
        success:false,
        message:error,
        
    })
  }
})

app.get('/users/:id',async(req:Request,res:Response) =>{
  // console.log(req.params.id);
  try{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
    if(result.rows.length === 0){
      res.status(404).json({
        success:false,
        message:"User not found",
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"User fetched successfully",
        data:result.rows[0]
      })
    }
    
  }
  catch(error:any){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
  }
  

})

app.put('/users/:id',async(req:Request,res:Response) =>{
  const {name,email,age,phone,address} = req.body;
  try{
    const result = await pool.query(`
      UPDATE users 
      SET name=$1, email=$2, age=$3, phone=$4, address=$5, updated_at=NOW()
      WHERE id=$6 RETURNING *

      `,[name, email, age, phone, address, req.params.id])
    if(result.rows.length === 0){
      res.status(404).json({
        success:false,
        message:"User not found",
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"User updated successfully",
        data:result.rows[0]
      })
    }

  }
  catch(error:any){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
  }
})

app.delete('/users/:id',async(req:Request,res:Response) =>{
    try{
      const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [req.params.id]);
      if(result.rows.length === 0){
        res.status(404).json({
          success:false,
          message:"User not found",
        })
      }
      else{
        return res.status(200).json({
          success:true,
          message:"User deleted successfully",
          data:result.rows[0]
        })
      }
    }
    catch(error:any){
      return res.status(500).json({
          success:false,
          message:error.message,
      })
    }
})


// Start the server todos
app.post('/todos',async (req:Request,res:Response) =>{
     const  {user_id,title,description,due_date} = req.body;
     try{
      const result = await pool.query(`
         INSERT INTO todos (user_id, title, description, due_date) 
         VALUES ($1, $2, $3, $4) RETURNING *
      `,[user_id,title,description || null,due_date || null])
      return res.status(201).json({
        success:true,
        message:"Todo created successfully",
        data:result.rows[0]
      })
     }
     catch(error:any){
        return res.status(500).json({
            success:false,
            message:error.message
        })

     }
})
app.get('/todos',async(req:Request,res:Response) =>{
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    return res.status(200).json({
        success:true,
        message:"Todos fetched successfully",
        data:result.rows
    })

  }
  catch(error:any){
    return res.status(500).json({
        success:false,
        message:error,
        
    })
  }
})


app.use((req:Request,res:Response) =>{
    res.status(404).json({
        success:false,
        message:"Route not found",
        path:req.originalUrl
    })
     
})

app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`);
});