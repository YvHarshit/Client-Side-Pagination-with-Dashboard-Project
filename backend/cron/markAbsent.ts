import cron from "node-cron";
import { ATTENDANCE_CONFIG } from "../config/attendance.config.js";
import { AttendenceModel } from "../models/attendace.model.js";

//console.log("Auto Checkout Cron Loaded");

cron.schedule(
  `${ATTENDANCE_CONFIG.officeOverMinute} ${ATTENDANCE_CONFIG.officeOverHour} * * *`, async () => {
    try {
      console.log("Auto Checkout Cron Started");

      const today = new Date().toISOString().split("T")[0];
      if (!today)  throw new Error("today is required") 

      const checkoutTime = new Date();
      checkoutTime.setHours(
        ATTENDANCE_CONFIG.officeOverHour,
        ATTENDANCE_CONFIG.officeOverMinute,
        0, 0 );

       await AttendenceModel.updateMany(
        {
          date: today,
          clockIn: { $exists: true },
          checkOut: { $exists: false },
          status: { $in: ["Present", "Late"] },
        },
        {
          $set: {
            checkOut: checkoutTime,
          },
        }
      );
    //   console.log(result);
    //   const records = await AttendenceModel.find({ date: today });
    //   console.log(records);
    // console.log(`Auto Checkout Completed. ${result.modifiedCount} employees updated.`);
    } 
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error.stack);
      } else {
        console.log("Unexpected Error - ", error);
      }
    }
  }
);