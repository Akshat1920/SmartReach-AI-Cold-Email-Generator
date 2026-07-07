const nodemailer = require("nodemailer");


const sendEmail = async (email, otp)=>{
    try {
        
    if(!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD){
        throw new Error(`Email credentials are not set in environment variables`);
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    console.log("EMAIL:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASSWORD);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your SmartReach Account",
        text: `Your OTP is ${otp}`
    });

    

    console.log("Email Sent Successfully");

    } catch (error) {

        console.log("Error Occured",error.message);
        throw error;
    }
}

module.exports = sendEmail;