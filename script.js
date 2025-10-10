// ✅ Grabbing all DOM elements correctly
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

// ❌ fixed: wrong id "result=message" → ✅ "result-message"
const resultMessage = document.getElementById("result-message");

const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// ❌ fixed: typo "quizQuestios" → ✅ "quizQuestions"
const quizQuestions = [
  {
    question: "What is the capital city of Ethiopia?",
    answers: [
      { text: "Bahir Dar", correct: false },
      { text: "Gondar", correct: false },
      { text: "Metema", correct: false },
      { text: "Addis Ababa", correct: true },
    ],
  },
  {
    question: "What is your father's name?",
    answers: [
      { text: "Habtamu", correct: false },
      { text: "Alemayehu", correct: true }, // optional spelling fix
      { text: "Eyob", correct: false },
      { text: "Azanaw", correct: false },
    ],
  },
  {
    question: "What is your favorite subject?",
    answers: [
      { text: "Maths", correct: true },
      { text: "English", correct: false },
      { text: "Biology", correct: false },
      { text: "Chemistry", correct: false },
    ],
  },
  {
    question: "Who is your favorite football player?",
    answers: [
      { text: "Ronaldo", correct: true },
      { text: "Messi", correct: false },
      { text: "Salah", correct: false },
      { text: "Mané", correct: false },
    ],
  },
  {
    question: "Which one is the best city in Ethiopia?",
    answers: [
      { text: "Bahir Dar", correct: false },
      { text: "Gondar", correct: true },
      { text: "Debre Birhan", correct: false },
      { text: "Addis Ababa", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

// ✅ Show total and max question counts
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ✅ Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// ✅ Start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

// ✅ Display question
function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // ✅ Fix: progress percentage calculation (include +1 to update correctly)
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // Clear old answers
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    // ❌ fixed: wrong syntax `.addEventListener("click".selectAnswer)`
    // ✅ should be `.addEventListener("click", selectAnswer)`
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

// ✅ Handle answer selection
function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// ✅ Show results screen
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  // ✅ improved feedback messages
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! 🌟";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Excellent job!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Keep practicing!";
  } else {
    resultMessage.textContent = "Try again!";
  }
}

// ✅ Restart quiz
function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active"); // fixed: ensure you return to start
}
