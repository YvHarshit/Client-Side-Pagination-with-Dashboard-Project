import mongoose from "mongoose";

const authCounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1
  }
});

const AuthCounter = mongoose.model("AuthCounter", authCounterSchema);

export default AuthCounter;