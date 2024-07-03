const questions = [
  {
    //hier werden alle Fragen gespeichert als Objekt deswegen {}
    id: 1, // die id ist da um genau die Frage mit den Antworten zu verifizieren
    question:
      "Welches Raumschiff ist das Flagschiff der Föderation in der Serie Star Trek The next Generation?", //hier wird die Frage gestellt
    answers: [
      // mehere Antwortmöglichkeiten möglich deswegen Array []  und diese wieder in Objekten {}
      {
        id: "a", // id um sicher zu gehen das es passt, "a"<-- frei wählbar
        text: "USS Enterprise-D", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: true, // in dem Fall wäre es richtig ansonsten "false"
      },
      {
        id: "b", // id um sicher zu gehen das es passt, "b"<-- frei wählbar
        text: "USS Enterprise-A", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "true"
      },
      {
        id: "c", // id um sicher zu gehen das es passt, "c"<-- frei wählbar
        text: "USS Voyager", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "true"
      },
      {
        id: "d", // id um sicher zu gehen das es passt, "d"<-- frei wählbar
        text: "USS Defiant", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "true"
      },
    ],
  },
  {
    id: 2, // die id ist da um genau die Frage mit den Antworten zu verifizieren
    question:
      "Welcher Captain kommandiert die USS Enterprise in Star Trek The Next Generation?", //hier wird die Frage gestellt
    answers: [
      // mehere Antwortmöglichkeiten möglich deswegen Array []  und diese wieder in Objekten {}
      {
        id: "a", // id um sicher zu gehen das es passt, "a"<-- frei wählbar
        text: "Captain James T. Kirk", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "false"
      },
      {
        id: "b", // id um sicher zu gehen das es passt, "b"<-- frei wählbar
        text: "Captain Jean-Luc Picard", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: true, // in dem Fall wäre es richtig ansonsten "true"
      },
      {
        id: "c", // id um sicher zu gehen das es passt, "c"<-- frei wählbar
        text: "Captain Benjamin Sisko", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "true"
      },
      {
        id: "d", // id um sicher zu gehen das es passt, "d"<-- frei wählbar
        text: "Captain Kathryn Janeway", // text kann auch anders heißen, hier kommt die Antwortmöglichkeit
        correct: false, // in dem Fall wäre es richtig ansonsten "true"
      },
    ],
  },
];

let currentQuestion; // die rausgeholte frage rendern (welche es ist) um die nächste frage zu laden /speichern aktuelle Frage
let currentQuestionPointer = -1; // den aktuellen verweiß auf die id oder Array (an welcher stelle die Aktuelle frage ist) -1 weil keine frage geladen haben

//Frage Rendern ( den Weiterbutton betätigen so das es weitergeht)
function renderQuestion(question) {
  //funktion zum rendern der Fragen
  const questionDiv = document.createElement("div"); // ein neues Div erstellen für html Namens questionDiv
  questionDiv.id = question.id; // dem questiondiv eine id geben
  questionDiv.classList.add("app-container"); //hinzufügen einer Klasse in dem DIV (appContainerDiv)

  const questionTitel = document.createElement("div"); // titelelement als Div erstellt
  questionTitel.classList.add("question-titel"); //hinzufügen einer Klasse in dem DIV (questionTitel)

  questionTitel.appendChild(document.createTextNode(question.question)); //den Text aus question und der.question (Inhalt)

  const questionAnswers = document.createElement("div"); // Antworten als Div erstellt
  questionAnswers.classList.add("grid-container-button"); //hinzufügen einer Klasse in dem DIV (grid-container-button)

  question.answers.forEach((answer) => {
    //auslesen von anwers und button mit klasse erzeugen
    const answerDiv = document.createElement("button");
    answerDiv.id = answer.id;
    answerDiv.setAttribute("onclick", `validate('${answer.id}')`); // ort für validate" jeder Antwortmöglichkeit ein onclick
    answerDiv.classList.add("btn-answer");
    answerDiv.appendChild(document.createTextNode(answer.text));
    questionAnswers.appendChild(answerDiv);
  });

  questionDiv.appendChild(questionTitel);
  questionDiv.appendChild(questionAnswers);

  document.getElementById("display-question").appendChild(questionDiv); //eine Funktion die rendern und einfügen kann
}
// "weiterButton"
function nextQuestion() {
  if (currentQuestion) {
    document.getElementById(String(currentQuestion.id)).remove(); // entfernt die andere Frage
  }
  if (currentQuestionPointer + 1 < questions.length) {
    // nächste Frage
    currentQuestionPointer++;
    currentQuestion = questions[currentQuestionPointer];
  } else {
    currentQuestionPointer = 0; //ansonst fängt es wieder von vorn an
    currentQuestion = questions[currentQuestionPointer];
  }
  renderQuestion(currentQuestion);
}
//Frage beantworten
function validate(answerId) {
  //funktion mit antwort ID um zu sehen ob es richtig oder falsch ist
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct; // durch das Array gehen (find), holen das element(answer) raus und geben den Wert von correct zurück wenn correct true ist gibt er es zurück
  });

  if (correctAnswer.id === answerId) {
    // alert("Richtig!");
    document.getElementById(answerId).classList.add("correct");
  } else {
    alert("Deine Antwort ist FALSCH");
    document.getElementById(answerId).classList.add("incorrect");
    document.getElementById(correctAnswer.id).classList.add("correct");
  }
}
//Lösung
function showSolution() {
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct; // durch das Array gehen (find), holen das element(answer) raus und geben den Wert von correct zurück wenn correct true ist gibt er es zurück
  });
  document.getElementById(correctAnswer.id).classList.add("correct"); //besorge uns das HTML:Element
}
//zurück
function lastQuestion() {
  if (currentQuestion) {
    document.getElementById(String(currentQuestion.id)).remove(); // entfernt die andere Frage
  }
  if (currentQuestionPointer + 1 < questions.length) {
    // nächste Frage
    currentQuestionPointer--; // dadurch wir die vorherrige Frage angeziegt
    currentQuestion = questions[currentQuestionPointer];
  } else {
    currentQuestionPointer = 0; //ansonst fängt es wieder von vorn an
    currentQuestion = questions[currentQuestionPointer];
  }
  renderQuestion(currentQuestion);
}
