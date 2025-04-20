// from: Your email address
// to: Recipient's email address
// subject: Email subject
// text or html: Email body (text or HTML format)

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Create and export the sendingMail function
export const sendingMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      // html: `<h1>${text}</h1>` // Optional HTML format
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully:", mailResponse.response);
    return mailResponse;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error; // Let calling function handle it
  }
};
