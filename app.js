const questions = document.querySelector(".question");
const next = document.querySelector("#next");
const answerBtn = document.querySelector(".answers");

let currentQuestindex = 0;
let score = 0;
let i = 0;
loadQuiz();

function startQuiz() {
  currentQuestindex = 0;
  score = 0;
  i = 0;
  next.innerHTML = "Next";
  loadQuiz();
}

function loadQuiz() {

  fetch("question.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      resetState();
  
      questions.innerHTML = data[i].question;
      let currentQuestion = data[i].question;
      let questionNo = currentQuestindex + 1;
      questions.innerHTML = questionNo + ". " + currentQuestion;

      data[i].options.map((item) => {
        const button = document.createElement("button");
        button.innerHTML = item.option;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        // console.log(answerBtn.appendChild(button))
        
        if(item.correct) {
          button.dataset.correct = item.correct
        }
        // console.log(item.correct)
        button.addEventListener("click", selectAns)
      })
    })

    .catch((err) => {
      console.log(err);
    });
}

function resetState() {
  next.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAns(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("wrong")
  }

  Array.from(answerBtn.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  next.style.display = "block";
}

next.addEventListener("click", () => {

  if (currentQuestindex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz
  }
})

function handleNextBtn() {
  currentQuestindex++;
  i++;
  if (currentQuestindex < questions.length) {
    loadQuiz();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questions.innerHTML = `You scored ${score} out of ${questions.length}`;
  next.innerHTML = "Play Again";
  next.style.display = "block";
}

startQuiz();