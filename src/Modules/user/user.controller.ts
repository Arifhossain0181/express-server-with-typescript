import { Request, Response } from "express";
import {pool } from "../../Config/db";
import { userServices } from "./user.service";


const createUser = async (req:Request,res:Response) =>{     
    
    try{
        const result = await userServices
        .createUser(req.body);
        
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
}
const getAllUsers =async(req:Request,res:Response) =>{
  try{
    const result = await userServices.getAllUsers();
   res.status(200).json({
        success:true,
        message:"Users fetched successfully",
        data:result.rows
    })

  }
  catch(error:any){
    res.status(500).json({
        success:false,
        message:error,
        
    })
  }
}
const getsingleUser = async(req:Request,res:Response) =>{  
  try{
    const result = await userServices.getsingleUser(req.params.id as string);
    if(!result || result.rows.length === 0){
      res.status(404).json({
        success:false,
        message:"User not found",
      })
    }
    else{
       res.status(200).json({
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
  

}
const UPdateuser = async(req:Request,res:Response) =>{
  const {name,email,age,phone,address} = req.body;
  try{
    const result = await userServices.UPdateuser(req.params.id as string, name, email, age, phone, address);
    if(!result || result.rows.length === 0){
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
}
const deleteUser = async(req:Request,res:Response) =>{
    try{
      const result = await userServices.deleteUser(req.params.id as string);
      if(!result || result.rows.length === 0){
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
}

export const userController = { createUser, getAllUsers, getsingleUser, UPdateuser, deleteUser };