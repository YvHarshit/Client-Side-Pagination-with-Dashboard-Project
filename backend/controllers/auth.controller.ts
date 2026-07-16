import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUser from "../models/auth.model.js";
import { authNextId } from "../utils/authUserIdAllocator.js";
import transporter from "../utils/nodemailer.js";

import { getAuth } from "firebase-admin/auth";
import "../config/firebaseAdmin.js";


export const googleLogin = async ( req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({
        success: false,
        message: "Firebase ID Token is required",
      });
      return;
    }

    // Verify Firebase Token
    const decodedToken = await getAuth().verifyIdToken(idToken);


    const { email, name } = decodedToken;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email not found in Google account",
      });
      return;
    }

let user = await AuthUser.findOne({ email });

if (!user) {
  const userId = await authNextId("userId");

  user = await AuthUser.create({
    userId,
    name,
    email,
    password: "",
    provider: "google",
    isAuthenticated: true,
  });
}

    // Create your own JWT
    const token = jwt.sign({id: user.userId,},process.env.JWT_SECRET as string, {expiresIn: "7d"} );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
};



export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
   const userId = await authNextId ('userId'); 

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthUser({ userId, name, email, password: hashedPassword });
    await user.save();


    return res.json({ success: true, message: "Registered successfully" });
  } 
  catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};    

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
  return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });


    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
}   );

    return res.json({ success: true, message: "Logged in successfully" });
  } catch (error : unknown) {
        if(error instanceof Error) {
            console.log(error.message) 
            console.log(error.stack)
        }
        else console.log("An un-expected error : ", error)
        
    }
};



export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getMe = async (req: Request, res: Response) => {
  console.log("req.userId in getMe (auth.controller) =", (req.userId));

  try {
    const user = await AuthUser.findOne({ userId: Number(req.userId),}).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      userData: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const sendAuthenticateOtp = async (req: Request, res: Response) => {
  try {
    console.log("sendAuthenticateOtp called");
    const userId = (req).userId;
    const user = await AuthUser.findOne({userId: Number(userId)}); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isAuthenticated) {
      return res.status(400).json({
        success: false,
        message: "User already authenticated",
      });
    }

    const otp = Math.floor(Math.random() * 9000) + 1000;

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    console.log("Sender Mail : ",process.env.EMAIL)
    console.log("Received At : ",user.email)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "User Account Authentication OTP",
      text: `Your OTP is ${otp}. This OTP is valid for 15 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Send OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


export const authenticateAccount = async( req: Request, res: Response) => {
  const userId = req.userId ;
  const {otp} = req.body ;

    if(!userId || !otp) {
      return res.json({
        success : false ,
        message : "Missing deatils"
      })
    }

    try {
        console.log("Searching userId in authenticateAccount :", userId);
        
        const user = await AuthUser.findOne({userId: Number(userId),}) ;

        if(!user){
          return res.json({
          success : false ,
          message : "User not found"
          })
        }

        if(user.otp !== parseInt(otp) || user.otp === null){
            return res.json({
                success : false ,
                message : "Invalid OTP"
            })
        }

        if(user.otpExpiresAt < Date.now()){
            return res.json({
                success : false ,
                message : "OTP expired"
            })
        }

        user.isAuthenticated = true ;
        user.otp = 0 ;
        user.otpExpiresAt = 0 ;
        await user.save() ;

        return res.json({
            success : true ,
            message : "Account has Authenticated successfully"
        })
        
    } 
    catch (error) {
        return res.json({
            success : false ,
            message : "Failed to authenticate account"
        })        
    }
}

