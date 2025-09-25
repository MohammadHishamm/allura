import { joinUsModel, IJoinUs } from "../modules/joinUsModel";

export const createJoinUsApplication = async (applicationData: IJoinUs) => {
  try {
    const application = new joinUsModel(applicationData);
    const savedApplication = await application.save();
    return {
      statusCode: 201,
      data: {
        message: "Application submitted successfully",
        application: savedApplication
      }
    };
  } catch (error) {
    console.error("Error creating join us application:", error);
    return {
      statusCode: 500,
      data: {
        message: "Failed to submit application",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};

export const getAllJoinUsApplications = async () => {
  try {
    const applications = await joinUsModel.find().sort({ createdAt: -1 });
    return {
      statusCode: 200,
      data: {
        message: "Applications retrieved successfully",
        applications
      }
    };
  } catch (error) {
    console.error("Error retrieving join us applications:", error);
    return {
      statusCode: 500,
      data: {
        message: "Failed to retrieve applications",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};

export const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
  try {
    const application = await joinUsModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    
    if (!application) {
      return {
        statusCode: 404,
        data: {
          message: "Application not found"
        }
      };
    }

    return {
      statusCode: 200,
      data: {
        message: "Application status updated successfully",
        application
      }
    };
  } catch (error) {
    console.error("Error updating application status:", error);
    return {
      statusCode: 500,
      data: {
        message: "Failed to update application status",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};
