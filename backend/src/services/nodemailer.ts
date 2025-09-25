import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or "outlook", "yahoo"
  auth: {
    user: process.env.EMAIL_USER, // your Gmail/Outlook email
    pass: process.env.EMAIL_PASS, // App Password (not regular password)
  },
});

// Function to send join us application email
export const sendJoinUsEmail = async (applicationData: {
  fullName: string;
  role: string;
  description: string;
  cvUrl: string;
}) => {
  const { fullName, role, description, cvUrl } = applicationData;

  try {
    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // your HR email
      subject: `New Join Us Application: ${fullName}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>CV:</strong> <a href="${cvUrl}" target="_blank">View CV</a></p>
      `,
    });

    console.log("Join Us email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending join us email:", error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Function to send contact form email
export const sendContactEmail = async (contactData: {
  firstName: string;
  lastName: string;
  projectTypes: string[];
  projectDescription: string;
  phoneNumber: string;
  potentialBudget: string;
}) => {
  const { firstName, lastName, projectTypes, projectDescription, phoneNumber, potentialBudget } = contactData;

  try {
    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Budget Range:</strong> ${potentialBudget}</p>
        <p><strong>Project Types:</strong> ${projectTypes.join(', ')}</p>
        <p><strong>Project Description:</strong> ${projectDescription}</p>
      `,
    });

    console.log("Contact email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};