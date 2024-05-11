// aqui estamos enlazando este archivo al app.js , esto lo hacemos para no tener el bloque de codifo de mongoose en el mismo app.js

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const MONGODB_NAME = "share-plates";

const DB = `${MONGODB_URI}/${MONGODB_NAME}`;

mongoose
  .connect(`${DB}`)
  .then(() => console.log(`Connected to DB: ${MONGODB_NAME}`))
  .catch((err) => console.error("Database error:", err));

module.exports = DB;