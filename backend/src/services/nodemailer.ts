import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure nodemailer transporter
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
    // Verify transporter configuration
    await transporter.verify();
    console.log("Email transporter is ready");

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // your HR email
      subject: `New Join Us Application: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Job Application Received
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Application Details</h3>
            
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Desired Role:</strong> ${role}</p>
            <p><strong>Description:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4f46e5;">
              ${description.replace(/\n/g, '<br>')}
            </div>
            
            <p style="margin-top: 20px;">
              <strong>CV:</strong> 
              <a href="${cvUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: bold;">
                📄 View/Download CV
              </a>
            </p>
          </div>
          
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Action Required:</strong> Please review this application and update the status in the admin dashboard.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This email was sent from the Allura website contact form.
          </p>
        </div>
      `,
    });

    console.log("Join Us email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
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
    // Verify transporter configuration
    await transporter.verify();
    console.log("Email transporter is ready");

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Budget Range:</strong> ${potentialBudget}</p>
            
            <p><strong>Project Types:</strong></p>
            <div style="margin: 10px 0;">
              ${projectTypes.map(type => `<span style="background: #ddd6fe; color: #5b21b6; padding: 4px 8px; border-radius: 4px; margin-right: 8px; font-size: 14px;">${type}</span>`).join('')}
            </div>
            
            <p><strong>Project Description:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4f46e5;">
              ${projectDescription.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Action Required:</strong> Please follow up with this potential client.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This email was sent from the Allura website contact form.
          </p>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};