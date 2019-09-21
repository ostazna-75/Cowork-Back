/* ---------------------------- */
/* ======= Dépendances ======= */
/* const express = require("express");
const app = express(); */
const express = require("express");
// const cors =  pour pouvoir lire les fichier à partir d'un autre nom de domaine
/* const cors = require("cors"); */
const app = express();
/* app.use(cors()); */
const User = require("../Models/userModel");
// crypto pour Password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64"); // encBase64 : sécurisé
// .get just pour lire les infos sur le site
app.get("/user/tovo", (req, res) => {
  res.send("tovo is the boss");
});

app.post("/user/signup", (req, res) => {
  /*  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username; */

  //DESTRUCTURING
  // étapa  1 : récupère ce que l'applicatiok nous envoie
  const { password, email, username } = req.body;
  //étape 2 : transforme les donnée que l'on a récupéré en user
  const user = new User({
    password,
    email,
    username
  });

  res.send(user);
});

module.exports = app;
