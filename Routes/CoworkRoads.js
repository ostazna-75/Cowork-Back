/* ---API---- */
/* Copié collé du fichier json 
POur copié collé une api on fait : */

const spaces = [];

// import spaces from "../Json/spaces.json";
const express = require("express");
// const cors =  pour pouvoir lire les fichier à partir d'un autre nom de domaine
/* const cors = require("cors"); */
const router = express.Router();
/* app.use(cors()); */

/* pour importer le cowork modèle pour pouvoir 
créer et sauvegarder et mettre à jour et supprimer des cowork */
const Cowork = require("../Models/coworkModel");

router.post("/cowork/populate", (req, res) => {
  // const { coworkList } = req.body;
  /* insertMany : ca fait un save de tout ce qui a dans le tableau 
  Space(fichier json), chaque entrée du tableau va enregistrer dans la data */
  /* a voir aussi coworkMofel.js */
  Cowork.insertMany(spaces, (err, doc) => {
    time = new Date(Date.now()).toLocaleString();
    console.log("done : ", time);
  });
  res.status(200).send("ok");
});

router.get("/cowork/list", (req, res) => {
  Cowork.find({ categorie: "espaces" }).exec((error, response) => {
    res.status(200).send(response);
  });
});
module.exports = router;
