// userModel.js est comment sauvegarder les donnée du User dans le back
/* ======= Dependencies ======= */
// Toute les information que l'on aura dans user

const mongoose = require("mongoose");

// notre modèle (tjrs avec majuscule )user
const User = new mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String
  // token: String,
  // dans son modèle il faudrait un account qui aura un username
  // token est ce que l'on envoie au front pour lui dire ( pour vérifier l'identité de user )
  // permet de garder son email ouvert
  // Le back va vérififer et aller dans la base de donnée et le mail qui corrspond c'est bon,
  // le back dit que tu peut rester connecter
  /* token ----------------------------->  */
  // hash et salt : 2 chaine de caratcere qui vont etre le resultat d'1 mixage entre le password, le uid2, le sha256 et 64
  // pour enregistrer le mot de pass en maniere crypté
  // transformatiokn du password ou on ne peut pas revenir au password
  /* hash and salt-------------------------->  */
  // hash est le password tranformé par rapport au Salt
  // quand on récupère le password, on le fait rtentré dand une fonction qui a le salt en argments
  // et qui transfrome le tout en chaine de caractère qu'on va appelé Hash.
  // quand l'utilisateur voudra se connecter et mettre son password , on utilisera mla meme fonction qui tranforme le password au salt
  // et compare le password que l'user a rentrer avec le hash qui est dans la base de donnée ( qu'on a enregistré la premiere fois )
});

/* ======= Export the model ======= */
module.exports = User;
