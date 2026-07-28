import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_PASSWORD 
  }
});


transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY FAILED:", error.message);
  } else {
    console.log("SMTP Connection Successful! Ready to send emails.");
  }
});

export default transporter;