import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginuser = async (req:Request,res:Response) =>{
    try{
        const result = await authService.loginuser(req.body.email, req.body.password);
        
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
        res.status(200).json({
            success:true,
            message:"Login successful",
            token: result.token,
            data: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email
            }
        })  
    }
    catch(error:any){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
export const authController = { loginuser };