require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');

const mongodb = require('./src/database/connect');
const contactsRouter = require('./src/routes/contacts');
const swaggerSpec = require('./swagger');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/v1/contacts', contactsRouter);

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`App is listening running on port ${port}`);
    });
  }
});
