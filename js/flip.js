"use-strict";

const theme = ["flip1", "flip2", "flip3", "flip4", "flip5", "flip6"];

let cards = [];
let history = [];
let flipped = 0;
let need = 2;
let paused = false;

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

function start() {
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
}

start();

function click(e) {
  let t = e.target.id; // “t” is the target element
  if (!paused && t.startsWith("Back") && !e.target.classList.contains("Flip")) {
    // Is it a selectable card?
    let a = t.split("-"); // Target array…
    let n = a[1]; // Number
    //console.log("Card " + n + " was selected.");
    history.push(n);
    flip(n);
    flipped++;
    if (flipped == need) {
      h1 = history[history.length - 2];
      h2 = history[history.length - 1];
      c1 = document.getElementById("Front-" + h1).getAttribute("cid");
      c2 = document.getElementById("Front-" + h2).getAttribute("cid");
      if (c1 == c2) {
        //console.log("Match! 🙂");
        flipped = 0;
      } else {
        //console.log("No Match! 🙁");
        paused = true;
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

function flip(n) {
  document.getElementById("Front-" + n).classList.toggle("Flip");
  document.getElementById("Back-" + n).classList.toggle("Flip");
}
