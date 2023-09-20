const btn = document.querySelector(".rules");
const closeBtn = document.querySelector(".close");
const modal = document.querySelector(".modal-container");
const border = document.querySelectorAll(".border");
const paper = document.querySelector(".border-paper");
const rock = document.querySelector(".border-rock");
const scissors = document.querySelector(".border-scissors");
const game = document.querySelector(".game");
const play = document.querySelector(".play");
const content = document.querySelectorAll(".content .border");
const result = document.querySelector(".result");
const scCircle = document.querySelector(".scissors");
const computer = document.querySelector(".computer");
const image = document.querySelector(".compImage");
const paraText = document.querySelector(".para");
const middleText = document.querySelector(".mid-text");
const checkWin = document.querySelector(".mid-text h2");
const playAgainBtn = document.querySelector(".mid-text button");
// console.log(checkWin.textContent)

let score = 0;


btn.addEventListener("click", showModal);
closeBtn.addEventListener("click", closeModal);

function showModal() {
  modal.style.visibility = "visible";
}

function closeModal() {
  modal.style.visibility = "hidden";
}

content.forEach((item) => {
  item.addEventListener("click", function (e) {
    let pper = e.target.dataset.paper;
    let sciss = e.target.dataset.scissors;
    let rck = e.target.dataset.rock;
    if (pper !== undefined) {
      pickPaper();
    } else if (sciss !== undefined) {
      pickScissors();
    } else if (rck !== undefined) {
      pickRock();
    }
    const myChoice = item.dataset.choice;
    console.log(myChoice);
    const computerChoice = computerTurn();
    console.log(computerChoice);
    compare();

    function compare() {
      const myChoice = item.dataset.choice;
      console.log(myChoice)
      if (myChoice === computerChoice) {
        checkWin.textContent = "DRAW";
        playAgain();
      } else if (myChoice === "scissors") {
        if (computerChoice === "paper") {
          checkWin.textContent = "YOU WIN";
          score++
          result.textContent = score;

          playAgain();
        } else {
          checkWin.textContent = "YOU LOSE";
          score--;
          if (score < 0) {
            score = 0;
          }
          result.textContent = score;
          playAgain();
        }
      } else if (myChoice === "paper") {
        if (computerChoice === "rock") {
          checkWin.textContent = "YOU WIN";
          score++
          result.textContent = score;
          playAgain();
        } else {
          checkWin.textContent = "YOU LOSE";
          score--
          if (score < 0) {
            score = 0;
          }
          result.textContent = score;
          playAgain();
        }
      } else if (myChoice === "rock") {
        if (computerChoice === "scissors") {
          checkWin.textContent = "YOU WIN";
          score++
          result.textContent = score;
          playAgain();
        } else {
          checkWin.textContent = "YOU LOSE";
          score--
          if (score < 0) {
            score = 0;
          }
          result.textContent = score;
          playAgain();
        }
      } else {
        checkWin.textContent = "YOU LOSE";
        score--
        if (score < 0) {
          score = 0;
        }
        result.textContent = score;
        playAgain();
      }
    }
  });
});



function pickPaper() {
  game.classList.remove("game");
  game.classList.add("play");
  paper.classList.add("paper");
  paper.style.display = "flex";
  rock.style.display = 'none'
  scissors.style.display = 'none'
  paraText.style.display = "flex";
  middleText.style.display = "flex";
}

function pickScissors() {
  // console.log(scissors)
  game.classList.remove("game");
  game.classList.add("play");
  scissors.classList.remove("paper");
  scissors.classList.add("border-scissors");
  scissors.style.display = "flex";
  paper.style.display = "none";
  rock.style.display = 'none'
  paraText.style.display = "flex";
  middleText.style.display = "flex";
}

function pickRock() {
  console.log(rock);
  game.classList.remove("game");
  game.classList.add("play");
  rock.classList.remove("paper");
  rock.classList.add("border-rock");
  rock.style.display = "flex";
  paper.style.display = "none";
  scissors.style.display = 'none'
  paraText.style.display = "flex";
  middleText.style.display = "flex";
}

function computerTurn() {
  const computerArr = ["rock", "paper", "scissors"];
  let computerIndex = Math.floor(Math.random() * computerArr.length);
  const choice = computerArr[computerIndex];

  if (choice == "rock") {
    computer.classList.add("border-rock");
    image.setAttribute("src", "./images/icon-rock.svg");
  } else if (choice == "paper") {
    computer.classList.add("border-paper");
    image.setAttribute("src", "./images/icon-paper.svg");
  } else if (choice == "scissors") {
    computer.classList.add("border-scissors");
    image.setAttribute("src", "./images/icon-scissors.svg");
  }

  return choice;
}

function playAgain() {
    playAgainBtn.addEventListener("click", () => {
      game.classList.remove("play");
      game.classList.add("game");
      paraText.style.display = "none";
      middleText.style.display = "none";
      paper.style.display = "flex";
      rock.style.display = 'flex'
      scissors.style.display = 'flex'

    });
  }