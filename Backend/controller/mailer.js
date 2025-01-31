//we are using node mailer library to send mail to the user
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import dotenv from 'dotenv';
dotenv.config();

let nodeConfig ={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
}
let transporter = nodemailer.createTransport(nodeConfig);
let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})
export const registerMail = async(req,res)=>{
    const {username ,userEmail,text,subject} =req.body;

    //let's create the body of the email
    var email ={
        body :{
            name:username,
            intro:text || 'Welcome to Iconique!We\'re very excited to have you on board. ',
            outro:'Need help,or have questions? Just reply to this mail,we\'d love to help.'
        }
    }
    var emailBody = MailGenerator.generate(email);
    let message ={
        from : process.env.EMAIL,
        to:userEmail,
        subject: subject || "signup Successfull",
        html : emailBody,
    }
    //send mail
    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg :"You would have received an email from us"})
        })
        .catch(error => res.status(500).send({error}))
}