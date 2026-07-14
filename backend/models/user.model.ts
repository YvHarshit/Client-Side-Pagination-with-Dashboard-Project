import mongoose from "mongoose";
import { DEPARTMENT , EXPERIENCE, GENDER} from "../utils/enums.js";

const employeeSchema = new mongoose.Schema({

  Eid: {  type: String,},
  name: { type: String, },
  email: { type: String, unique: true },
  phone: { type: String, },

  department: { type: String,
          enum: Object.values(DEPARTMENT),
          required: true },

  gender: {
        type: String,
        enum: Object.values(GENDER),
        default: GENDER.MALE },

  experience : {
    type : String ,
    enum : Object.values(EXPERIENCE) ,
    default : EXPERIENCE.ZeroToOneYears },      


  password : { type: String } ,
  isFirstLogin : {type : Boolean, default :true} ,
  age : {type : Number,  default: 20} ,
  

  skills: {
    type: [String],
    default: [],
  },

  userId: { type: String },
  addedBy: { type: String },
});

export type employeeType = mongoose.InferSchemaType<typeof employeeSchema>

const Employee = mongoose.model<employeeType>("Employee", employeeSchema);

export default Employee;
