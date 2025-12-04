import { Request, Response } from "express";
import { createTodo } from "./todo.service";


const createtodos = async (req:Request,res:Response) =>{
     const  {user_id,title,description,due_date} = req.body;
     try{
      const result = await createTodo.createtodos(user_id,title,description,due_date);
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
}
const todogetall = async(req:Request,res:Response) =>{
  try{
    const result = await createTodo.todogetall();
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
}

export const todocontroller = { createtodos, todogetall };