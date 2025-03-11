const express = require("express");
const {
  getContactById,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controlers/contacts");

const contactsRouter = express.Router();

/**
 * @swagger
 * /v1/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieves a list of contacts with their details.
 *     responses:
 *       200:
 *         description: Successfully retrieved contacts list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactsResponse"
 */
contactsRouter.get("/", getAllContacts);

/**
 * @swagger
 * /v1/contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     description: Fetch a single contact by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactByIdResponse"
 *       404:
 *         description: Contact not found.
 */
contactsRouter.get("/:id", getContactById);

contactsRouter.post("/", createContact);

contactsRouter.patch("/:id", updateContact);

contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;
