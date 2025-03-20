const express = require('express');
const {
  getContactById,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controlers/contacts');
const {
  createContactRulesInterceptor,
  validateRules,
} = require('../utils/validator');

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
contactsRouter.get('/', getAllContacts);

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
contactsRouter.get('/:id', getContactById);

/**
 * @swagger
 * /v1/contacts:
 *   post:
 *     summary: Create contact
 *     description: Create a new contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContactBody"
 *     responses:
 *       200:
 *         description: Contact created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactCreateResponse"
 *       404:
 *         description: Contact not found.
 */
contactsRouter.post(
  '/',
  createContactRulesInterceptor(),
  validateRules,
  createContact
);

/**
 * @swagger
 * /v1/contacts/{id}:
 *   put:
 *     summary: Update contact
 *     description: Update a contact.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContactBody"
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactUpdateResponse"
 *       404:
 *         description: Contact not found.
 */
contactsRouter.put('/:id', updateContact);

/**
 * @swagger
 * /v1/contacts/{id}:
 *   delete:
 *     summary: Delete contact
 *     description: Delete a specific contact.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteContactResponse"
 *       404:
 *         description: Contact not found.
 */
contactsRouter.delete('/:id', deleteContact);

module.exports = contactsRouter;
