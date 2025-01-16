mic.addEventListener("click", function () {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!window.SpeechRecognition) {
    console.log("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", function (e) {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  recognition.addEventListener("error", function (e) {
    console.log("Error occurred in recognition: " + e.error);
  });

  recognition.start();
});
