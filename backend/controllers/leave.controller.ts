// POST   /leave/create
// GET    /leave/my-leaves

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/user.model.js";
import leaveModel from "../models/leave.model.js";
import AuthUser from "../models/auth.model.js";


export const createleave = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Please Login"
            });
        }

        const decoded = jwt.verify( token, process.env.JWT_SECRET as string ) as { email:string };
        const employee = await Employee.findOne({ email:decoded.email });

        if(!employee){
            return res.status(404).json({
                success:false,
                message:"Employee not found"
            });
        }

        const { leaveType, reason, fromDate, toDate} = req.body;

        if (!employee.Eid || !employee.userId) {
            return res.status(400).json({
              success: false,
               message: "Employee ID or Admin ID is missing",
            });
        }

        const leave = await leaveModel.create({
            employeeId: employee.Eid,
            userId: employee.userId,

            leaveType, reason, fromDate, toDate 
        });

        return res.status(201).json({
            success:true,
            message:"Leave request submitted",
            leave
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};


export const getMyLeaves = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Please Login"
            });
        }
        const decoded = jwt.verify( token, process.env.JWT_SECRET as string ) as { email:string };
        const employee = await Employee.findOne({ email:decoded.email });

        if(!employee){
            return res.status(404).json({
                success:false,
                message:"Employee not found"
            });
        }
        const employeeId = employee.Eid;

        if (!employeeId) {
          return res.status(400).json({
            success: false,
            message: "Employee ID missing",
          });
        }

        const leaves = await leaveModel.find({ employeeId }).sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            leaves
        });
    } 

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }

};


export const getAdminLeaves = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }
    const decoded = jwt.verify( token, process.env.JWT_SECRET as string ) as { id: string };
    const leaves = await leaveModel.find({ userId: decoded.id}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalLeaves: leaves.length,
      leaves,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };   
    const { status, adminRemark } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    const leave = await leaveModel.findOne({ _id: req.params.id, userId: decoded.id});
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    leave.status = status;
    leave.adminRemark = adminRemark || "";

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave Updated Successfully",
      leave,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};