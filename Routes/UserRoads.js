/* ---------------------------- */
/* route des user */
/* ======= Dépendances ======= */
/* const express = require("express");
const app = express(); */
const express = require("express");
// const cors =  pour pouvoir lire les fichier à partir d'un autre nom de domaine
/* const cors = require("cors"); */
const router = express.Router();
/* app.use(cors()); */
const User = require("../Models/userModel");
// crypto pour Password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64"); // encBase64 : sécurisé
// .get just pour lire les infos sur le site
router.get("/user/tovo", (req, res) => {
  res.send("tovo is the boss");
});

// voir le username d"une utlisiateur
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id).exec((error, user) => {
    if (user) {
      res.status(200).send(user.username);
    } else {
      res.status(500).send(error.message);
    }
  });
});
/* SIGNUP créer compte email pour site */
router.post("/user/signup", (req, res) => {
  //DESTRUCTURING
  // étapa  1 : récupère ce que l'applicatiok nous envoie
  const { password, email, username } = req.body;

  // si le mail existe déja
  User.findOne({ email }).exec((error, userfound) => {
    if (userfound) {
      res
        .status(302)
        .send("Mail déja utilisé, veuillez vous connectez avec le signin");
    } else {
      //étape 2 : transforme les donnée que l'on a récupéré en user
      const user = new User({
        password,
        email,
        username
      });
      //
      user.save((error, usersaved) => {
        if (error) {
          /*  console.log(error.message); */
          res.status(500).send(error.message);
        } else {
          res.status(200).send(usersaved);
        }
      });
    }
  });
});
/* singnIN */
router.post("/user/signin", (req, res) => {
  const { password, email } = req.body;

  if (password === undefined || email === undefined) {
    res.status(401).send("EMPTY PARAMETERS");
  } else {
    User.findOne({ email, password }).exec((error, userfound) => {
      if (userfound) {
        res.status(200).send(userfound);
        /* else : dans le  cas ou le mail n'existe pas */
      } else {
        res.status(401).send("UNAUTHORIZED");

        //étape 2 : transforme les donnée que l'on a récupéré en user
      }
    });
  }
});

module.exports = router;
