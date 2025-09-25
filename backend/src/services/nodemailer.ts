import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const validateEmailConfig = () => {
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please add the following to your .env file:');
    missingVars.forEach(varName => {
      console.error(`${varName}=your_value_here`);
    });
    return false;
  }
  
  console.log('✅ All required email environment variables are present');
  return true;
};

// Validate configuration on startup
if (!validateEmailConfig()) {
  console.error('❌ Email service will not work without proper configuration');
}

// Configure nodemailer transporter with fallback options
const createTransporter = () => {
  // Primary configuration (Gmail SMTP)
  const primaryConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  };

  // Fallback configuration (Gmail with different settings)
  const fallbackConfig = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  };

  // Try primary config first, fallback if needed
  try {
    return nodemailer.createTransport(primaryConfig);
  } catch (error) {
    console.log("⚠️ Primary email config failed, trying fallback...");
    return nodemailer.createTransport(fallbackConfig);
  }
};

const transporter = createTransporter();

// Test email configuration on startup
const testEmailConfig = async () => {
  try {
    console.log("🧪 Testing email configuration...");
    await transporter.verify();
    console.log("✅ Email configuration is valid and ready");
    return true;
  } catch (error) {
    console.error("❌ Email configuration test failed:", error);
    return false;
  }
};

// Run test on startup
testEmailConfig();

// Function to send join us application email
export const sendJoinUsEmail = async (applicationData: {
  fullName: string;
  role: string;
  description: string;
  cvUrl: string;
}) => {
  const { fullName, role, description, cvUrl } = applicationData;

  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Attempting to send join us email (attempt ${attempt}/${maxRetries})`);
      
      // Verify transporter configuration
      await transporter.verify();
      console.log("✅ Email transporter is ready");

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

      console.log("✅ Join Us email sent successfully:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      lastError = error;
      console.error(`❌ Error sending join us email (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt < maxRetries) {
        const delay = attempt * 2000; // 2s, 4s, 6s delays
        console.log(`⏳ Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error("❌ Failed to send join us email after all retries");
  throw new Error(`Failed to send email after ${maxRetries} attempts: ${lastError instanceof Error ? lastError.message : 'Unknown error'}`);
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

  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Attempting to send contact email (attempt ${attempt}/${maxRetries})`);
      
      // Verify transporter configuration
      await transporter.verify();
      console.log("✅ Email transporter is ready");

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

      console.log("✅ Contact email sent successfully:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      lastError = error;
      console.error(`❌ Error sending contact email (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt < maxRetries) {
        const delay = attempt * 2000; // 2s, 4s, 6s delays
        console.log(`⏳ Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error("❌ Failed to send contact email after all retries");
  throw new Error(`Failed to send email after ${maxRetries} attempts: ${lastError instanceof Error ? lastError.message : 'Unknown error'}`);
};