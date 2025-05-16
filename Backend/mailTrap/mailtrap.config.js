import nodemailer from 'nodemailer';
import { ENV_VARS } from "../config/envVars.js";

const GMAIL_USER = ENV_VARS.GMAIL_USER;  // Your Gmail address
const GMAIL_PASS = ENV_VARS.GMAIL_APP_PASSWORD; // Gmail app password

// Create Nodemailer transporter using Gmail SMTP credentials
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // TLS port
  secure: false, // Use TLS
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

export const sender = {
  email: GMAIL_USER,  // Use your Gmail address
  name: "Seven",      // Your name or business name
};
