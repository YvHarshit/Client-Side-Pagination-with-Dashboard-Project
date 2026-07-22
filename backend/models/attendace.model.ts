import mongoose from "mongoose"

const AttendanceSchema = new mongoose.Schema({
    employeeId : {type : String, required : true} ,
    OwnerId : {type: String, required: true} ,
    date: {type: String},
    clockIn: {type: Date},
    checkOut: {type: Date},
    status: {type: String,
    enum: ['Present', 'Absent', 'Late', 'Half Day'],
      },
    email : {type: String, required: true}
}, 
{ timestamps: true });

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export type attendanceSchemaType = mongoose.InferSchemaType<typeof AttendanceSchema>

export const AttendenceModel = mongoose.model<attendanceSchemaType>("AttendanceSchema", AttendanceSchema)

