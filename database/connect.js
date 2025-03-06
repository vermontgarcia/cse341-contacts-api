require("dotenv").config();

const mongoose = require("mongoose");

let database;

const initDB = (callback) => {
  if (database) {
    console.log("DB is already initialized!");
    return callback(null, database);
  }
  console.log(process.env.DB_URL);
  console.log(process.env.DB_NAME);
  mongoose
    .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
    .then((db) => {
      database = db;
      console.log(
        `Connected to Mongo! Database name: "${db.connections[0].name}"`
      );
      callback(null, database);
    })
    .catch((error) => {
      console.error("DB connection error: ", error);
      callback(error);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase,
};
