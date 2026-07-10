import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

  Eid: {  type: String,},
  name: { type: String, },
  email: { type: String, },
  phone: { type: String, },
  department: { type: String,},
  password : { type: String } ,

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
