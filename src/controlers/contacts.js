const Contact = require("../models/Contact");

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contactRaw = await Contact.findById(contactId).lean();
    if (contactRaw) {
      const contact = {
        id: contactRaw._id,
        ...contactRaw,
      };
      delete contact._id;
      return res
        .status(200)
        .json({ msg: "Contact retrieved successfully", contact });
    } else {
      return res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    console.log("Error getting contact from Database: ", error);
    return res.status(500).json({ error: "Getting Contact Error" });
  }
};

const getAllContacts = async (req, res) => {
  console.log("Controler");
  try {
    const contactsRaw = await Contact.find().lean();
    const contacts = contactsRaw.map((contact) => {
      const newContact = {
        id: contact._id,
        ...contact,
      };
      delete newContact._id;
      return newContact;
    });
    return res
      .status(200)
      .json({ msg: "Contacts retrieved successfully", contacts });
  } catch (error) {
    console.log("Error getting contacts from Database: ", error);
    return res.status(500).json({ error: "Getting Contacts Error" });
  }
};

module.exports = {
  getContactById,
  getAllContacts,
};
