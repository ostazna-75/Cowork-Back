/* modèle : Les informations que nous aurontdans un cowork */

const mongoose = require("mongoose");

const Cowork = new mongoose.model("Cowork", {
  brand: String /* Logo */,
  bullet1: String /* surface entiere */,
  bullet2: String /* nombre poste  */,
  bullet3: String /* nombre salle */,
  description: String /* descprition cowork */,
  details: String /* details des lieu */,
  image: String,
  location: { lat: String, lon: String },
  name: String,
  street: String,
  zipcode: String,
  categorie: String
});

module.exports = Cowork;
