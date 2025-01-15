const say = require("say");

const Textspeech = (text) => {
  say.speak(text || "I can't hear you");
};
module.exports = Textspeech;
