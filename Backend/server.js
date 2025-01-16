const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
dotenv.config();
const Textspeech = require("./texttospeech");

async function getGenerativeModel(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  Textspeech(result.response.text());
  console.log(result.response.text());
}
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  const transcript = req.body.transcript;
  getGenerativeModel(transcript);
});
app.listen(8080);
