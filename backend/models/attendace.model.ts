import mongoose, { mongo } from "mongoose"

const AttendanceSchema = new mongoose.Schema({
    employeeId : {type : String, required : true} ,
    OwnerId : {type: String, required: true} ,
    date: {type: String, required: true},
    clockIn: {type: Date, required: true},
    checkOut: {type: Date},
    status: {type: String,
    enum: ['Present', 'Absent', 'Late', 'On Leave'],
    default: 'Absent'},
    email : {type: String, required: true}
}, 
{ timestamps: true });

// Prevent duplicate entries for the same user on the same date
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export type attendanceSchemaType = mongoose.InferSchemaType<typeof AttendanceSchema>

export const AttendenceModel = mongoose.model<attendanceSchemaType>("AttendanceSchema", AttendanceSchema)

