const Contact = require("../models/Contact");

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      return res
        .status(200)
        .json({ msg: "Contact retrieved successfully", contact });
    } else {
      return res.status(200).json({ msg: "Contact doesn't exist" });
    }
  } catch (error) {
    console.log("Error getting contact from Database: ", error);
    return res.status(400).json({ error: "Getting Contact Error" });
  }
};

const getAllContacts = async (req, res) => {
  console.log("Controler");
  try {
    const contacts = await Contact.find();
    return res
      .status(200)
      .json({ msg: "Contacts retrieved successfully", contacts });
  } catch (error) {
    console.log("Error getting contacts from Database: ", error);
    return res.status(400).json({ error: "Getting Contacts Error" });
  }
};

module.exports = {
  getContactById,
  getAllContacts,
};
