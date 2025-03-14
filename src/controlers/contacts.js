const Contact = require("../models/Contact");

const projection = {
  _id: 1,
  firstName: 1,
  lastName: 1,
  email: 1,
  favoriteColor: 1,
  birthday: 1,
};

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contactRaw = await Contact.findById(contactId, projection);
    if (contactRaw) {
      const contact = {
        id: contactRaw.id,
        ...contactRaw._doc,
        _id: undefined,
      };
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
    const contactsRaw = await Contact.find({}, projection);
    const contacts = contactsRaw.map((contact) => {
      const newContact = {
        id: contact.id,
        ...contact._doc,
        _id: undefined,
      };
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
  try {
    const newContact = await Contact.create(req.body);
    const contactRaw = await Contact.findById(newContact._id, projection);
    const contact = {
      id: contactRaw.id,
      ...contactRaw._doc,
      _id: undefined,
    };
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
    );
    if (contactRaw) {
      const contact = {
        id: contactRaw.id,
        ...contactRaw._doc,
        _id: undefined,
      };
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
