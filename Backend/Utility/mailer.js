const nodemailer = require('nodemailer');



const sendMail = (to, subject, text) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password or app-specific password
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text
        };
    
        return transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Error while sending mail (mailSender) - ', email);
    }  
};

module.exports = sendMail;