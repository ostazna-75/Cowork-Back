//index.js : c'est le point d'entrée sur le Serveur
// Back = Serveur
//------------------------------------->
// npm install express
// Le serveur express puisse tourner, pour l'utliser
// express : sans express très compliqué de faire touner le back
// ce sont des fonction qui permettetnt de faciliter l"écriture du back
// Grace à express on peut faire des manipulation dans le backend
const express = require("express");
// const cors =  pour pouvoir lire les fichier à partir d'un autre nom de domaine
const cors = require("cors");
const app = express();
app.use(cors());

// body parser sert a récupérer les information rentré dans les input par exemples
// bodyparser sert à récupérer des informations que l'on envoie dans les requêtes
// avec Postman logiciel qui permet de lire les infos dans le body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// MongoDb = base de donnée
// On va pouvoir changer et manipuler les données qui sont envoyé par Postman ou les requête envoyé par postman ou l'application
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/Coworking",
  {
    useNewUrlParser: true
  }
);
// Get sert à lire les donnée
app.get("/", (req, res) => {
  res.send("Bienvenue");
});

// Routes users
// 1: pour récupérer toute les route dans le fichier user roads
// 2 : Use est pour les utiliser

const userRoads = require("./Routes/UserRoads");
app.use(userRoads);

// Permet de démarer le serveur, de l'écouter
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
