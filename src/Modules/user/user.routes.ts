
import  express  from "express";
import { userController } from "./user.controller";
import auth from  "../../Middleware/auth.js";

const router = express.Router();

// aPP.use("/users",userRouter)
router.post("/",userController.createUser);

router.get("/",auth("admin"),userController.getAllUsers);
router.get("/:id",userController.getsingleUser);
router.put("/:id",userController.UPdateuser );
router.delete("/:id",userController.deleteUser);


export const userRouter = router;