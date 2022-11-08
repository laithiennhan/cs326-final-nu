import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// app.use(express.static(path.resolve(__dirname, "./frontend")));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/users/login", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./frontend/login/login.html"));
})

app.get("/api/users", (req, res) => {
	res.send({ message: "Testing" });
});

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
