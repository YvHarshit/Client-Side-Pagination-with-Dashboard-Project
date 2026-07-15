import { Router } from "express";
import { register, login, logout, getMe, sendAuthenticateOtp, authenticateAccount } from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

import { googleLogin } from "../controllers/auth.controller.js"; 
import { getAdminLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";
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

export default authRouter;