import cron from "node-cron";
import { ATTENDANCE_CONFIG } from "../config/attendance.config.js";
import Employee from "../models/user.model.js";
import { AttendenceModel } from "../models/attendace.model.js";

//console.log("Mark Absent after 2'oclock Attendance Cron Loaded");

cron.schedule(`${ATTENDANCE_CONFIG.absentCheckMinute} ${ATTENDANCE_CONFIG.absentCheckHour}  * * *`, async () => {

    try {

        console.log("Auto Absent Attendance After 2'oclock Marking Cron Started");
        const today = new Date().toISOString().split("T")[0];
        const employees = await Employee.find();

        for (const emp of employees) {

            if (!emp.Eid || !emp.userId || !emp.email || !today)   continue;
            
             const attendance = await AttendenceModel.findOne({
                employeeId: emp.Eid,
                date: today,
            });

            if (attendance) continue;

            await AttendenceModel.create({
                employeeId: emp.Eid,
                OwnerId: emp.userId,
                email: emp.email,
                date: today,
                status: "Absent",
            });
        }
        console.log("Attendance Cron Completed");

    }
    catch (error) {

        if (error instanceof Error) {
            console.log(error.message);
            console.log(error.stack);
        }
        else {
            console.log("Unexpected Error - ", error);
        }

    }

});



// it only update the status to "Late" [Don't add clock-in field in DB]and another cron job I schedule at 2 o'clock which mark absent to those who have not check-in yet 