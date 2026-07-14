import {getUsers, addUser, deleteUserByID, updateUserByID, empLogin, getEmpDetail, updateDetailsFromDashboard, empLogout, empChangePassword} from "../controllers/user.controller.js"
import {Router} from "express";
import logger from "../middleware/loggers.js"
import { validate } from "../middleware/zodValidation.js";
import { updateEmployeeSchema, zodValidSchema} from "../validators/zodSchema.js"
import userAuth from "../middleware/userAuth.js";
import checkAuth from "../middleware/checkAuth.js";



const router = Router();

router.get("/users",userAuth,logger, getUsers)
router.post("/add-user",userAuth,checkAuth, validate(zodValidSchema), addUser)
// router.get("/user/:Eid",userAuth, getUserByID)
router.delete("/user/:Eid",userAuth, deleteUserByID)
router.put("/user/:Eid",userAuth, updateUserByID)


router.post("/user/emplogin", empLogin)

router.get("/user/emp-details", getEmpDetail)

router.patch("/user/update-profile", validate(updateEmployeeSchema), updateDetailsFromDashboard)

router.post("/user/emplogout", empLogout)

router.post("/user/emp-change-password", empChangePassword)

export default router;

 