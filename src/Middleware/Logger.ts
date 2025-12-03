


// loger middeluser
import { Request, Response } from "express";
import { NextFunction } from "express";

const logger = (req:Request,res:Response,next:NextFunction) =>{

  console.log(`${req.method}  Request to ${req.path} at ${new Date().toISOString()} \n Body: ${JSON.stringify(req.body)}`);
  next()

}
export default logger