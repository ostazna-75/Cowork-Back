const express = require("express");
const app = express();

// body parser sert a récupérer les information rentré danls es input par exemples
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// base de donnée
const mongoose = require("mongoose");
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/Coworking",
	{
		useNewUrlParser: true
	}
);

app.get("/", (req, res) => {
	res.send("Bienvenue");
});

// Routes users
const userRoads = require("./Routes/UserRoads");
app.use(userRoads);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server Started");
});
