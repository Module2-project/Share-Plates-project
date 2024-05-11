//aqui estamos requieriendo todas las instacian y lo que vamos a usar en nuestras apps

require("dotenv").config();

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const logger = require("morgan");
const app = express();
const session = require("./config/session.config");
const Handlebars = require("handlebars");
// aqui estamos requiriendo la confi de moongose que la tendremos por separado

require("./config/db.config");

//el scritp para iniciar

app.use(logger("dev"));

//aqui estamos enlazando las vistas de nuestro proyecto , crearemos una carpeta views para tenerlo todo por separado

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// para leer el json

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para indicar donde estan los partials

hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.static("public"));

app.use(session.sessionConfig);
app.use(session.getCurrentCurrentUser);

// para indicar donde estan las routes

const router = require("./config/routes.config");
app.use("/", router);

// para saber en que puerto estamos

app.listen("3000", () => {
  console.log("Escuchando en el puerto 3000");
});
