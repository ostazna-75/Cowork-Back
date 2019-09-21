/* ======= Dépendances ======= */
const express = require("express");
const app = express();
const User = require("../Models/userModel");
// crypto pour Password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

app.get("/tovo", (req, res) => {
  res.send("tovo is the boss");
});

app.post("/user/signup", (req, res) => {
	console.log("je rentre dans la route signup");

  const token = uid2(64); // uid2 va générer une chaine de caractère aléatoire , une chaine de 64 caractere
  const salt = uid2(64); // une autre chaine de 64
  const hash = SHA256(req.body.password + salt).toString(encBase64); // prendre le password que l'utilisateur et rajouter du salt et se servier de enc 64 pour rajouter une sécu supp
  // créer un nouveau user,
  // dès que un user veut se créer un compte avec le même email
  // va chercher dans la base de donnée dans la colelction User un utilisateut dont le mail est le mail rentré dans le formulaire
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      // si tu as trouveer le m^me utilisateur qui a déja ce mail
      console.log(user);

      res.json({
        status: 409,
        message: "Cette adresse mail est déja utilisée"
      });
    } else {
      // sinon on créer un nouvel utilisateur
      const user = new User({
        // récupere ce que tout l'ulisateur va mettre dans le formulaire d'inscription
        // reprendre ce qui dans le modele ( email , pass, token )
        email: req.body.email,
        token: token,
        hash: hash,
        salt: salt,
        username: req.body.username
      });
      // on va pouvoir sauvegarder le user dans la base de donnée
      user.save(error => {
        // s'il ya une erreur tu me retoune l'érreur
        if (error) {
          // retourner une chaine de caratacère ( réponse du serveur dans Postman)
          return res.send(error.message);
        } else {
          // retounrner la réponse du serveur dans Postmant dans un format json ( objet )
          return res.json({
            id: user._id,
            token: user.token,
            username: user.username
          });
        }
      });
    }
  });
});

module.exports = app;
