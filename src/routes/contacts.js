const express = require("express");
const { getContactById, getAllContacts } = require("../controlers/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getContactById);

module.exports = contactsRouter;
