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
      delete contact.created_at;
      delete contact.updated_at;
      delete contact.__v;
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
  try {
    const contactsRaw = await Contact.find().lean();
    const contacts = contactsRaw.map((contact) => {
      const newContact = {
        id: contact._id,
        ...contact,
      };
      delete newContact._id;
      delete newContact.created_at;
      delete newContact.updated_at;
      delete newContact.__v;
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

const createContact = async (req, res) => {
  console.log(req.body);
  try {
    const contactRaw = await Contact.create(req.body);
    console.log("HERE", contactRaw);
    const contact = {
      id: contactRaw._doc._id,
      ...contactRaw._doc,
    };
    delete contact._id;
    delete contact.created_at;
    delete contact.updated_at;
    delete contact.__v;
    return res
      .status(200)
      .json({ msg: "Contact created successfully", contact });
  } catch (error) {
    return res.status(500).json({ error: "Creating Contact Error" });
  }
};

const updateContact = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const contactRaw = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).lean();
    if (contactRaw) {
      const contact = {
        id: contactRaw._id,
        ...contactRaw,
      };
      delete contact._id;
      delete contact.created_at;
      delete contact.updated_at;
      delete contact.__v;
      return res
        .status(200)
        .json({ msg: "Contact updated successfully", contact });
    } else {
      return res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Updating Contact Error" });
  }
};

const deleteContact = async (req, res) => {
  console.log(req.params.id);
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact) {
      return res.status(200).json({ msg: "Contact deleted successfully" });
    } else {
      return res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Deleting Contact Error" });
  }
};

module.exports = {
  getContactById,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};
