import nodemailer from "nodemailer"
import dotenv  from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_SENDER_MAIL,
    pass: process.env.NODEMAILER_SENDER_PASSWORD,
  },
});

const sendMail = async ({name,sendTo,subject,html}) => {
  try {
      
        const info = await transporter.sendMail({
            from: '"Shoppz " <shoppz@gmail.com>', // sender address
            to: sendTo, // list of receivers
            subject: subject, // Subject line
            text: "Hello world?", // plain text body
            html: html, // html body
          });
        
        return info
    } catch (error) {
        console.log(error.message)
    }
} 


export default sendMail