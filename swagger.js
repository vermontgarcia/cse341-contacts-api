require("dotenv").config();

const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API documentation for managing contacts",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "67c921fe5c73a5b0fffdd325",
            },
            firstName: {
              type: "string",
              example: "Elena",
            },
            lastName: {
              type: "string",
              example: "Martinez",
            },
            email: {
              type: "string",
              format: "email",
              example: "elena.martinez@email.com",
            },
            favoriteColor: {
              type: "string",
              example: "green",
            },
            birthday: {
              type: "string",
              example: "07/25",
            },
          },
        },
        ContactsResponse: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Contacts retrieved successfully",
            },
            contacts: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Contact",
              },
            },
          },
        },
        ContactByIdResponse: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Contact retrieved successfully",
            },
            contact: {
              $ref: "#/components/schemas/Contact",
            },
          },
        },
        ContactCreateResponse: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Contact created successfully",
            },
            contact: {
              $ref: "#/components/schemas/Contact",
            },
          },
        },
        ContactUpdateResponse: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Contact updated successfully",
            },
            contact: {
              $ref: "#/components/schemas/Contact",
            },
          },
        },
        DeleteContactResponse: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Contact deleted successfully",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Make sure your route files are scanned
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
