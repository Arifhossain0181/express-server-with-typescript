// higher order middleware for authentication return function that will act asim
import Jwt, { JwtPayload } from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import config from "../Config";
const auth = (...role:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
       try{
         const token = req.headers.authorization;
        console.log({token})
            if (!token) {
                return res.status(401).json({
                success:false,
                message:"Unauthorized: No token provided"
            })
            }
            const decoded = Jwt.verify(token, config.jwtSecret as string) as { id: number; role: string,name:string,email:string} as JwtPayload;
            
            req.user = decoded ;
            if(role.length && !role.includes(req.user.role)){
                return res.status(403).json({
                    success:false,
                    message:"Forbidden: You do not have the required role"
                });
            }
            next()
       }
         catch(error:any){  
              return res.status(401).json({
                success:false,
                message:"Unauthorized"
              })
         }

}}

export default auth;