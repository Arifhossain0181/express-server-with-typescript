import  express  from "express";
import { todocontroller } from "./todo.controller";
import { Request, Response } from "express";
import { pool } from "../../Config/db";
import { createTodo } from "./todo.service";
const router = express.Router();

router.post("/", todocontroller.createtodos);
router.get("/", todocontroller.todogetall);

export const todoRouter = router;