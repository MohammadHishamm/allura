import { contactModel, IContact } from "../modules/contactModel";

export const createContact = async (contactData: IContact) => {
  try {
    const contact = new contactModel(contactData);
    const savedContact = await contact.save();
    return {
      statusCode: 201,
      data: {
        message: "Contact form submitted successfully",
        contact: savedContact
      }
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      statusCode: 500,
      data: {
        message: "Failed to submit contact form",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};

export const getAllContacts = async () => {
  try {
    const contacts = await contactModel.find().sort({ createdAt: -1 });
    return {
      statusCode: 200,
      data: {
        message: "Contacts retrieved successfully",
        contacts
      }
    };
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return {
      statusCode: 500,
      data: {
        message: "Failed to retrieve contacts",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};
