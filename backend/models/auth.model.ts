import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    } ,
    
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
    type: String,
    default: "",
    },


    otp :{
      type: Number,
      default: 0 ,
    },

    otpExpiresAt: {
      type: Number,
      default: 0

    },

    isAuthenticated:{
      type: Boolean,
      default: false
    },
    provider: {
      type : String,
    default : "local"
    } ,

    role:{
      type : String ,
      default : "Admin"
    }
  },
  
);
const AuthUser = mongoose.model("AuthUser", authUserSchema);
export default AuthUser;