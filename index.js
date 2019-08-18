const express = require("express");
const app = express();

// body parser sert a récupérer les information rentré danls es input par exemples
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// crypto pour Passord
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const cors = require("cors");
app.use(cors());

// base de donnée
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Coworking", {
  useNewUrlParser: true
});

// notre modèle (tjrs avec majuscule )user
const User = new mongoose.model("User", {
  email: String,
  password: String,
  token: String,
  // hash et salt : 2 chaine de caratcere qui vont etre le resultat d'1 mixage entre le password, le uid2, le sha256 et 64

  hash: String,
  salt: String,
  // dans son modèle il faudrait un account qui aura un username
  username: String
});

app.post("/signup", (req, res) => {
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

      res.send("Cette adresse email est déja utilisée");
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
