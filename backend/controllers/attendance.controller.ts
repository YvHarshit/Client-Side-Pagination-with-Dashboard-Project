import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/user.model.js";
import { AttendenceModel } from "../models/attendace.model.js";


export const checkIn = async(req: Request, res: Response) => {
    try {
        const token = req.cookies.token ;
    
    if(!token) {
        res.json({
            success : false,
            message : "Invalid Token"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string ) as {email : string} 
    
    const emp = await Employee.findOne({ email: decoded.email });
        if (!emp) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }
    
    const { date, clockIn, status } = req.body;
        if (!date || !clockIn || !status) {
        return res.status(400).json({
        success: false,
        message: "Missing details",
        });
    }
    
    if (!emp.Eid || !emp.userId) {
        return res.status(400).json({
        success: false,
        message: "Employee ID or Admin ID is missing",
        });
    }
    
    const checkIn = await AttendenceModel.create({
        employeeId: emp.Eid,
        OwnerId: emp.userId,
        email: emp.email!,
        date,
        clockIn: new Date(clockIn),
        status,
    }); 
    return res.status(201).json({
            success:true,
            message:"Attendance marked",
            checkIn
        });
 }
 catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Check-In Error:", error.message);
        console.error(error.stack);
    } 
    else console.error("Unexpected Error:", error);
    

    return res.status(500).json({
        success: false,
        message: "Check-In failed"
    });
 }
}

export const checkOut = async (req:Request, res: Response) => {
    try {
        const token = req.cookies.token 
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string ) as {email : string}  
    
    const { checkOut, date } = req.body;  
    const attendance = await AttendenceModel.findOne({email: decoded.email, date});      
    
    if (!attendance) {
     return res.status(404).json({
       success: false,
       message: "Attendance record not found",
      });
    }
    if (attendance.checkOut) {
        return res.json({
            success : false ,
            mesage : "Already checked out"
        })
    }

   attendance.checkOut = new Date(checkOut);
   await attendance.save();
    
    return res.status(201).json({
            success:true,
            message:"checkOut Successfully",
            checkOut
        });        
  } 
    catch (error : unknown) {
        if(error instanceof Error){
            console.error(error.message)
            console.error(error.stack)
        }
        else console.log("Un-expected Error : ", error)

       return res.json({
        success : false ,
        message : "Failed To Check-out"
       }) 
    }
}

export const getAttendancehistory = async(req: Request, res : Response) => {
    try {
        const token = req.cookies.token 
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string ) as {email : string}  
    const attendance = await AttendenceModel.find({ email: decoded.email}).sort({ date: -1 });     
    
    if (!attendance) {
     return res.status(404).json({
       success: false,
       message: "Attendance record not found",
      });
    }
    
    return res.json({
        success: true ,
        message : "Data Found",
        attendance
    })

  }
    catch (error : unknown) {
        if(error instanceof Error){
            console.error(error.message)
            console.error(error.stack)
        }
        else console.log("Un-expected Error : ", error)

       return res.json({
        success : false ,
        message : "Failed To Bring the Attendance data"
       }) 
    }

}