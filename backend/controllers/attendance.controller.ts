import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/user.model.js";
import { AttendenceModel } from "../models/attendace.model.js";


export const checkIn = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        const emp = await Employee.findOne({ email: decoded.email });
        if (!emp) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
        const { date, clockIn } = req.body;

        if (!date || !clockIn) {
            return res.status(400).json({
                success: false,
                message: "Missing details"
            });
        }
        if (!emp.Eid || !emp.userId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID or Admin ID is missing"
            });
        }
        const existingAttendance = await AttendenceModel.findOne({ employeeId: emp.Eid,  date });
        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: "Attendance already marked for today"
            });
        }

        const attendance = await AttendenceModel.create({
            employeeId: emp.Eid,
            OwnerId: emp.userId,
            email: emp.email!,
            date,
            clockIn: new Date(clockIn)           
        });

        return res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            attendance
        });

    }
    catch (error: unknown) {

        if (error instanceof Error) {
            console.log(error.message);
            console.log(error.stack);
        }
        else  console.log("Unexpected Error - ", error);
        
      return res.status(500).json({
          success: false,
          message: "Check-In Failed"
        });
    }
};

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

    const start = new Date(attendance.clockIn!);
    const end = new Date(attendance.checkOut);

    const workedHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (workedHours < 4) attendance.status = "Absent";
    else if (workedHours < 7)  attendance.status = "Half Day";
    else attendance.status = "Present"

    await attendance.save();

    return res.status(200).json({
    success: true,
    message: "Check Out Successfully",
    workedHours: workedHours.toFixed(2),
    status: attendance.status,
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
    
    const attendance = await AttendenceModel
      .find({ email: decoded.email})
      .sort({ date: -1 })
      .limit(30);

    return res.status(200).json({ attendance });
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


export const getMyEmpAttendance = async(req: Request, res: Response) => {
   try { 
    const userId = (req).userId
    const today = new Date().toISOString().split("T")[0];

    const empTodayAttendence = await AttendenceModel.find({OwnerId : userId!, date : today!})

    return res.status(200).json({
        message: "Employees Today's Attendenace Found",
        success: true ,
        TotalEmployee : empTodayAttendence.length,
        empTodayAttendence
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