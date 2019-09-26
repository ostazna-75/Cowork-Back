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
  if (
    password === undefined ||
    email === undefined ||
    username === undefined ||
    password === "" ||
    email === "" ||
    username === ""
  ) {
    res.status(400).send("Veuillez remplir tous les champs demandés");
  } else {
    // si le mail existe déja
    User.findOne({ email }).exec((error, userfound) => {
      if (userfound) {
        res
          .status(302)
          .send("Mail déja utilisé, veuillez vous connectez avec le signin");
      } else {
        /* uid2(64) créer des chaine de caractère unique, 
        sa permet d'avoir un token unique et un salt unique */
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        //étape 2 : transforme les donnée que l'on a récupéré en user
        const user = new User({
          email,
          username,
          token,
          salt,
          hash
        });
        //
        user.save((error, usersaved) => {
          if (error) {
            /*  console.log(error.message); */
            res
              .status(500)
              .send(
                "Problème sur le serveur, veuillez réessayer ultérieurement"
              );
          } else {
            res.status(200).send({
              email: usersaved.email,
              username: usersaved.username,
              token: usersaved.token
            });
          }
        });
      }
    });
  }
});
/* singnIN */
router.post("/user/signin", (req, res) => {
  const { password, email } = req.body;

  if (
    password === undefined ||
    email === undefined ||
    password === "" ||
    email === ""
  ) {
    res.status(401).send("Veuillez remplir tous les champs demandés");
  } else {
    /* si lemail existe dans la base donnée  */
    User.findOne({ email }).exec((error, userfound) => {
      if (userfound) {
        const hash = SHA256(password + userfound.salt).toString(encBase64);

        if (
          /* s'il a trouvé l'email' il regarde le Hash */
          hash === userfound.hash
        ) {
          res.status(200).send({
            email: userfound.email,
            username: userfound.username,
            token: userfound.token
          });
        } else {
          res.status(401).send("Mot de passe incorrect");
        }
        /* else : dans le  cas ou le mail n'existe pas */
      } else {
        res.status(401).send("Email incorrect");

        //étape 2 : transforme les donnée que l'on a récupéré en user
      }
    });
  }
});

/* Si un utilisateur existe avec token et email good sinon bad */
/* Ceci est une sécurité en plus */
router.post("/user/verification", (req, res) => {
  const { email, token } = req.body;
  User.findOne({ email, token }).exec((error, user) => {
    if (error) {
      res.status(500).send("Server error");
    } else if (user) {
      res.status(200).send("autorized");
    } else {
      res.status(401).send("Unauthorized");
    }
  });
});

module.exports = router;
