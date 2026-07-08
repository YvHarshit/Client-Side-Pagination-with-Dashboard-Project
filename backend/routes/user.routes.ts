import {getUsers, addUser, getUserByID, deleteUserByID, updateUserByID} from "../controllers/user.controller.js"
import {Router} from "express";
import logger from "../middleware/loggers.js"
import { validate } from "../middleware/zodValidation.js";
import {zodValidSchema} from "../validators/zodSchema.js"
import userAuth from "../middleware/userAuth.js";
import checkAuth from "../middleware/checkAuth.js";



const router = Router();

router.get("/users",userAuth,logger, getUsers)
router.post("/add-user",userAuth,checkAuth, validate(zodValidSchema), addUser)
router.get("/user/:Eid",userAuth, getUserByID)
router.delete("/user/:Eid",userAuth, deleteUserByID)
router.put("/user/:Eid",userAuth, updateUserByID)

export default router;

 