import type { Request, Response } from "express";
import { AttendenceModel } from "../models/attendace.model.js";
import { ATTENDANCE_CONFIG } from "../config/attendance.config.js";
import Employee from "../models/user.model.js";

export const autoCheckout = async (req: Request, res: Response) => {
  try {
    console.log("Auto Checkout Started");

    const today = new Date().toISOString().split("T")[0];

    const checkoutTime = new Date();
    checkoutTime.setHours(
      ATTENDANCE_CONFIG.officeOverHour,
      ATTENDANCE_CONFIG.officeOverMinute,
      0,
      0
    );

    const records = await AttendenceModel.find({
      date: today!,
      clockIn: { $exists: true },
      checkOut: { $exists: false },
    });

    for (const attendance of records) {
      attendance.checkOut = checkoutTime;

      const workedHours =
        (checkoutTime.getTime() - attendance.clockIn!.getTime()) /
        (1000 * 60 * 60);

      if (workedHours < 4)
        attendance.status = "Absent";
      else if (workedHours <= 6)
        attendance.status = "Half Day";
      else if (attendance.status === "Late")
        attendance.status = "Late";
      else
        attendance.status = "Present";

      await attendance.save();
    }

    res.status(200).json({
      success: true,
      message: "Auto checkout completed",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Cron failed",
    });
  }
};




export const autoAbsent = async (req: Request, res: Response) => {
  try {
    console.log("Auto Absent Started");

    const today = new Date().toISOString().split("T")[0];

    const employees = await Employee.find();

    for (const emp of employees) {
      if (!emp.Eid || !emp.userId || !emp.email) continue;

      const attendance = await AttendenceModel.findOne({
        employeeId: emp.Eid!,
        date: today!,
      });

      if (attendance) continue;

      await AttendenceModel.create({
        employeeId: emp.Eid!,
        OwnerId: emp.userId!,
        email: emp.email!,
        date: today!,
        status: "Absent",
      });
    }

    res.json({
      success: true,
      message: "Absent marking completed",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};