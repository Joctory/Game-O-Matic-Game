"use-strict";

const theme = ["flip1", "flip2", "flip3", "flip4", "flip5", "flip6"];
// const theme = ["flip1", "flip2"];

let cards = [];
let history = [];
let flipped = 0;
let matched = 0;
let need = 2;
let paused = false;
let timerg2;
let timerdata2 = 60;

const startButtong2 = document.getElementById("startButtong2");
const restartButtong2 = document.getElementById("restartButtong2");
const completeMenug2 = document.getElementById("completeMenug2");
const failMenug2 = document.getElementById("failMenug2");
const homebuttong2 = document.getElementById("homebuttong2");
const shuffle = new Audio("/assets/menu/card-shuffle.mp3");

window.addEventListener("resize", zoom);

function zoom() {
  let e = document.getElementById("Grid");
  let w = Number(window.innerWidth);
  let h = Number(window.innerHeight);
  let z = Math.min(w / 1920, h / 1080) * 0.95;
  // document.body.style.transform = "scale(" + z + ")";
}

zoom();

document.getElementById("Grid").addEventListener("click", click);

startButtong2.addEventListener("click", start);
restartButtong2.addEventListener("click", restartGame2);

function start() {
  // Clear existing images from front cards
  for (let i = 1; i <= theme.length * 2; i++) {
    let src = document.getElementById("Front-" + i);
    if (src) {
      src.innerHTML = ""; // Remove existing images
    }
  }

  theme.forEach((i) => {
    cards.push(i); // Push image paths to cards
    cards.push(i); // Do it twice!
  });

  let i = 0;

  while (cards.length > 0) {
    i++;
    let r = Math.floor(Math.random() * cards.length); // Random Card
    let c = cards[r];
    var img = document.createElement("img");
    img.src = "../assets/game-assets/" + c + ".png";
    var src = document.getElementById("Front-" + i);
    src.appendChild(img);
    src.setAttribute("cid", c);
    // document.getElementById("Front-" + i).innerText = c;
    cards.splice(r, 1);
  }

  readyAndGoScreen();
  setTimeout(() => {
    if (areSoundEffectsOn) {
      shuffle.play();
    }
    let delay = 0.5; // Delay in seconds
    let animationsFinished = 0; // Counter for finished animations
    const totalCards = document.querySelectorAll(".Card").length; // Total number of cards

    document.querySelectorAll(".Card").forEach((card, index) => {
      card.style.animationDelay = `${index * delay}s`;
      card.classList.add("bounce-in-top");

      // Add an event listener for the animation end
      card.addEventListener("animationend", () => {
        animationsFinished++; // Increment the counter when an animation ends

        // Check if all animations have finished
        if (animationsFinished === totalCards) {
          gameTimerg2();
          document.getElementById("Grid").classList.remove("disabled");
        }
      });
    });
  }, 1000);
}

function click(e) {
  playSoundEffect("assets/menu/card-flip.mp3");
  let t = e.target.id; // “t” is the target element
  if (!paused && t.startsWith("Back") && !e.target.classList.contains("Flip")) {
    // Is it a selectable card?
    let a = t.split("-"); // Target array…
    let n = a[1]; // Number
    history.push(n);
    flip(n);
    flipped++;
    if (flipped == need) {
      h1 = history[history.length - 2];
      h2 = history[history.length - 1];
      c1 = document.getElementById("Front-" + h1).getAttribute("cid");
      c2 = document.getElementById("Front-" + h2).getAttribute("cid");
      if (c1 == c2) {
        flipped = 0;
        playSoundEffect("/assets/menu/flip-correct.mp3");
        matched++;
        // Check if all cards are matched
        if (matched === theme.length) {
          allCardsMatched(); // Call the function when all cards are matched
        }
      } else {
        paused = true;
        playSoundEffect("/assets/menu/flip-wrong.mp3");
        setTimeout(function () {
          flip(h1);
          flip(h2);
          flipped = 0;
          paused = false;
        }, 1000);
      }
    }
  }
}

function restartGame2() {
  resetFlipGame();
  start();
}

function flip(n) {
  document.getElementById("Front-" + n).classList.toggle("Flip");
  document.getElementById("Back-" + n).classList.toggle("Flip");
}

// New function to handle all cards matched
function allCardsMatched() {
  clearInterval(timerg2);
  addGameEntry();
  updateGameEntry();
  setGameCompleted(2);
  playSoundEffect("/assets/menu/level-complete.mp3");
  showPreviewInGame(completeMenug2);
  confetti({
    particleCount: 400,
    spread: 250,
    origin: { y: 0.5 },
  });
}

function resetFlipGame() {
  if (areSoundEffectsOn) {
    shuffle.pause();
    shuffle.currentTime = 0;
  }
  // Reset the game timer or any other game state variables if necessary
  clearInterval(timerg2);
  document.getElementById("g2timeleft").innerHTML = timerdata2;
  document.getElementById("Grid").classList.add("disabled");

  cards = []; // Clear the cards array
  history = []; // Clear the history array
  flipped = 0; // Reset flipped count
  matched = 0; // Reset matched count
  paused = false; // Unpause the game

  // Clear the existing card elements from the DOM
  for (let i = 1; i <= theme.length * 2; i++) {
    let front = document.getElementById("Front-" + i);
    let back = document.getElementById("Back-" + i);
    if (front) front.classList.remove("Flip"); // Reset front card
    if (back) back.classList.remove("Flip"); // Reset back card
  }

  document.querySelectorAll(".Card").forEach((card, index) => {
    card.classList.remove("bounce-in-top");
  });
}

function gameTimerg2() {
  var sec = timerdata2;
  timerg2 = setInterval(function () {
    document.getElementById("g2timeleft").innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timerg2);
      playSoundEffect("/assets/menu/level-fail.mp3");
      showPreviewInGame(failMenug2);
      document.getElementById("Grid").classList.add("disabled");
    }
  }, 1000);
}
