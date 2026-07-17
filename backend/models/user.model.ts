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
        },

  experience : {
    type : String ,
    enum : Object.values(EXPERIENCE) ,
    },      


  password : { type: String } ,
  isFirstLogin : {type : Boolean, default :true} ,


  age : {type : Number} ,
  

  skills: {
    type: [String],
    default: [],
  },

  userId: { type: String },
  addedBy: { type: String },

  salary : {type : Number,  default: 20} ,
});

export type employeeType = mongoose.InferSchemaType<typeof employeeSchema>

const Employee = mongoose.model<employeeType>("Employee", employeeSchema);
export default Employee;
