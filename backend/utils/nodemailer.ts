import nodemailer from "nodemailer";
import dotenv from "dotenv";

console.log("nodemailer.ts loaded");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
//   connectionTimeout: 10000, // 10 seconds
//   greetingTimeout: 10000,   // 10 seconds
//   socketTimeout: 10000,     // 10 seconds
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_PASSWORD 
  }
});

console.log("BREVO_EMAIL:", process.env.BREVO_EMAIL);
console.log("BREVO_PASSWORD exists:", !!process.env.BREVO_PASSWORD);
// console.log("BREVO_PASSWORD:", process.env.BREVO_PASSWORD);

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY FAILED:", error.message);
  } else {
    console.log("SMTP Connection Successful! Ready to send emails. Success : ", success);
  }
});

export default transporter