import nodemailer from "nodemailer";
import dotenv from "dotenv" ;

dotenv.config() ;

const transporter = nodemailer.createTransport({
    service: "gmail",
   port: 465,
   secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP connection successful");
  }
});

export default transporter;
