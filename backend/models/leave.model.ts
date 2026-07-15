import mongoose from "mongoose";
import { LEAVE_STATUS, LEAVE_TYPE } from "../utils/enums.js";

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  leaveType: {
    type: String,
    enum: Object.values(LEAVE_TYPE),
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  fromDate: {
    type: Date,
    required: true,
  },

  toDate: {
    type: Date,
    required: true,
  },

  totalDays: {
    type: Number,
    default: 1 ,
  },

  status: {
    type: String,
    enum: Object.values(LEAVE_STATUS),
    default: LEAVE_STATUS.PENDING,
  },

  adminRemark: {
    type: String,
    default: "",
  },
},
{
  timestamps: true,
});


const leaveModel = mongoose.model("leaveModel", leaveSchema)

export default leaveModel ;