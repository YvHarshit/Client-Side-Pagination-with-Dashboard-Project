// import nodemailer from "nodemailer";
// import dotenv from "dotenv" ;

// dotenv.config() ;

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port:587,
//     secure:false,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error("SMTP Error:", error);
// //   } else {
// //     console.log("SMTP connection successful");
// //   }
// // });

// export default transporter;


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

    if(error){
        console.log("SMTP ERROR:", error);
    }
    else{
        console.log("SMTP connection successful");
    }

});


export default transporter;