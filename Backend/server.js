const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
const Textspeech = require("./texttospeech");

async function getGenerativeModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "okey please stop";

  const result = await model.generateContent(prompt);
  Textspeech(result.response.text());
}

getGenerativeModel();
