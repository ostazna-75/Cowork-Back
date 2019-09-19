/* ======= Dependencies ======= */
const mongoose = require("mongoose");

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

/* ======= Export the model ======= */
module.exports = User;
