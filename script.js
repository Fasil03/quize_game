const startScreen=document.getElementById("start")
const quizScreen=document.getElementById("quiz-screen")
const resultScreen=document.getElementById("result-screen")
const startButton=document.getElementById("start-btn")
const questionText=document.getElementById("question-text")
const answersContainer=document.getElementById("answers-container")
const currentQuestionSpan=document.getElementById("current-question")
const totalQuestionSpan=document.getElementById("total-questions")
const scoreSpan=document.getElementById("score")
const finalScoreSpan=document.getElementById("final-score")
const maxScoreSpan=document.getElementById("max-score")
const resultMesssage=document.getElementById("result=message")
const restartButton=document.getElementById("restart-btn")
const progressbar=document.getElementById("progress")
const quizQuestios=[
    {
    question:"what is the capital of Ethiopia?",
    answers: [
        {text:"bahir dar",correct: false},
        {text:"gondar",correct: false},
        {text:"metema",correct: false},
        {text:"addis abeba",correct: true},
   ],
 },

]
let currentQuestionIndex=onabort;
let score=0;
let answerDisabled=false;

totalQuestionSpan.textContent=quizQuestios.length;
maxScoreSpan.textContent=quizQuestios.length;
//event listener
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

}
function restartQuiz(){

}

