import { Router } from "express";
import { register, login, logout, getMe, sendAuthenticateOtp, authenticateAccount } from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

import { googleLogin } from "../controllers/auth.controller.js"; 
import { getAdminLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";
import { getAllEmployees, myEmpOnly } from "../controllers/user.controller.js";
import { getMyEmpAttendance } from "../controllers/attendance.controller.js";
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/getme", userAuth, getMe); 
authRouter.post("/send-otp", userAuth, sendAuthenticateOtp);
authRouter.post("/authenticate-account", userAuth, authenticateAccount);
authRouter.post("/google", googleLogin); 
authRouter.get("/admin/get/leave", getAdminLeaves)
authRouter.patch("/admin/update/leave/:id", updateLeaveStatus)
authRouter.get("/admin/getallemp", userAuth, getAllEmployees)

authRouter.get("/myemp/today/attendance", userAuth, getMyEmpAttendance)
authRouter.get("/admin/my-emp", userAuth, myEmpOnly)

export default authRouter;