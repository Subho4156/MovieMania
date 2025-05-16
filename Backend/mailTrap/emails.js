import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_MAIL_TEMPLATE } from "./emailTemplates.js"
import { transporter, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);

    const response = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: htmlContent,
    });

    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    const htmlContent = WELCOME_MAIL_TEMPLATE.replace("{{name}}", username);

    const response = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Netflix CloneApp",
      html: htmlContent,
    });

    console.log("Welcome email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

    const response = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: htmlContent,
    });

    console.log("Password reset email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};