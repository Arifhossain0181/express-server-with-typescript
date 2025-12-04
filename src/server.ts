import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { initDB,pool } from './Config/db.js';
import config from './Config/index.js';
import logger from './Middleware/Logger.js';
import { userRouter } from './Modules/user/user.routes.js';
import { createTodo } from './Modules/todos/todo.service.js';
import { todoRouter } from './Modules/todos/todo.routes.js';
import { authRouter } from './Modules/auth/auth.route.js';


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
app.use('/users',userRouter)

// Start the server todos
app.use('/todos',todoRouter);

//auth route
app.use('/auth',authRouter);




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