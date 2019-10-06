/* modèle : Les informations que nous aurontdans un cowork */

const mongoose = require("mongoose");

const Cowork = new mongoose.model("Cowork", {
  name: String,
  adress: String,
  type: String,
  squaremeters: String,
  meetingroom: String,
  description: String,
  categories: Array, // icon descritpion
  openday: Array, // jours d'entrée
  services: Array, // service gratuit
  extra_service: Array // service payants
});

module.exports = Cowork;
