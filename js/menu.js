var glide = new Glide(".glide", {
  type: "slider",
  startAt: 0,
  perView: 1,
  focusAt: "center",
  rewind: false,
});

// Parameter
var homeEntry = document.getElementById("entry-id");
var RedeemEntry = document.getElementById("entry-redeem-id");
var inGame1Entry = document.getElementById("entry-redeem-g1-id");
var inGame2Entry = document.getElementById("entry-redeem-g2-id");
var gameExit = document.getElementById("game-exit");
var overlay = document.getElementById("overlay");
var inGame1overlay = document.getElementById("game-1-overlay");
var inGame2overlay = document.getElementById("game-2-overlay");
var overlayLoader = document.getElementById("overlay-loader");
var gameoverlayLoader = document.getElementById("game-overlay-loader");
var gamePreview = document.getElementById("game-preview");
var redeemMenu = document.getElementById("redeemMenu");
var confirmRedeemMenu = document.getElementById("confirmRedeemMenu");
var confirmRedeemText = document.getElementById("confirmRedeemText");
var confirmRedeemSText = document.getElementById("confirmRedeemSText");
var confirmRedeemButton = document.getElementById("confirmRedeemButton");

var game1selectbutton = document.getElementById("game1selectbutton");
var game2selectbutton = document.getElementById("game2selectbutton");

// Game Selection Script
function showGameSelectionPreview(div) {
  var game1com = getGameCompleted(1);
  var game2com = getGameCompleted(2);

  removePopClass();
  div.classList.add("active");
  div.classList.remove("closed");
  overlay.style.display = "block";

  if (game1com == 1) {
    game1selectbutton.classList.add("disabled");
    game1selectbutton.querySelector("img").src = "assets/menu/completed-button.png";
  } else {
    game1selectbutton.classList.remove("disabled");
    game1selectbutton.querySelector("img").src = "assets/menu/select-button.png";
  }

  if (game2com == 1) {
    game2selectbutton.classList.add("disabled");
    game2selectbutton.querySelector("img").src = "assets/menu/completed-button.png";
  } else {
    game2selectbutton.classList.remove("disabled");
    game2selectbutton.querySelector("img").src = "assets/menu/select-button.png";
  }
}

function showPreview(div) {
  removePopClass();
  updateGameEntry();
  div.classList.add("active");
  div.classList.remove("closed");
  overlay.style.display = "block";
}

function showPreviewInGame(div) {
  removePopClass();
  updateGameEntry();
  div.classList.add("active");
  div.classList.remove("closed");
  inGame1overlay.style.display = "block";
  inGame2overlay.style.display = "block";
}

function hidePreviewInGame(div) {
  updateGameEntry();
  removePopClass();
  div.classList.add("closed");
  div.classList.remove("active");
  inGame1overlay.style.display = "none";
  inGame2overlay.style.display = "none";
}

function hidePreview(div) {
  updateGameEntry();
  removePopClass();
  div.classList.remove("active");
  div.classList.add("closed");
  overlay.style.display = "none";
}

function hideGamePreview(div) {
  updateGameEntry();
  removePopClass();
  div.classList.remove("active");
  div.classList.add("closed");
  overlay.style.display = "none";
}

function showRedeemMenu(div) {
  removePopClass();
  updateGameEntry();
  div.classList.add("active");
  div.classList.remove("closed");
  overlay.style.display = "block";

  var entry = getTotalGameEntries();

  if (entry == 0) {
    confirmRedeemText.innerHTML = "You have 0 entry, start to play our games to earn entry!";
    confirmRedeemButton.style.display = "none";
    confirmRedeemSText.style.display = "none";
  } else {
    confirmRedeemText.innerHTML = "Are you ready to redeem the rewards? Show this screen to our staff!";
    confirmRedeemButton.style.display = "block";
    confirmRedeemSText.style.display = "block";
  }
}

function confirmRedeem() {
  removePopClass();
  redeemMenu.classList.remove("active");
  redeemMenu.classList.add("closed");
  overlayLoader.style.display = "flex";
  setTimeout(() => {
    deleteGameEntry();
    updateGameEntry();
    overlayLoader.style.display = "none";
    confirmRedeemMenu.classList.add("active");
    confirmRedeemMenu.classList.remove("closed");
  }, 3000);
}

function confirmExit() {
  gameExit.classList.remove("closed");
  gameExit.classList.add("active");
  inGame1overlay.style.display = "block";
  inGame2overlay.style.display = "block";
}

function exitGame() {
  document.querySelectorAll(".mini-game-container").forEach((container) => {
    gameExit.classList.remove("active");
    overlay.style.display = "none";
    inGame1overlay.style.display = "none";
    inGame2overlay.style.display = "none";
    container.classList.remove("active");
    container.classList.add("closed");
  });
}

function noExitGame() {
  gameExit.classList.remove("active");
  gameExit.classList.add("closed");

  const activeContainers = document.querySelectorAll(".pop-container.active");
  if (activeContainers.length > 0) {
    inGame1overlay.style.display = "block";
    inGame2overlay.style.display = "block";
  } else {
    inGame1overlay.style.display = "none";
    inGame2overlay.style.display = "none";
  }
}

function menustartGame(gameId) {
  hidePreview(gamePreview);
  document.getElementById(gameId).classList.remove("closed");
  document.getElementById(gameId).classList.add("active");
  // You might want to initialize or reset the game here
  if (gameId === "game1") {
    game1Logic();
  } else if (gameId === "game2") {
    game2Logic();
  }
  setTimeout(() => {
    glide.go("<<");
  }, 2000);
}

function removePopClass() {
  document.querySelectorAll(".pop-container").forEach((container) => {
    // Remove classes from the pop-container itself
    container.classList.remove("closed", "active");
    overlay.style.display = "none";
    inGame1overlay.style.display = "none";
  });
}

function game1Logic() {
  // Game 1 code here
  gameoverlayLoader.style.display = "flex";
  setTimeout(() => {
    gameoverlayLoader.style.display = "none";
    resetJigsawGame();
    showPreviewInGame(howtoplayDivg1);
  }, 3000);

  console.log("Game 1 started in full screen");
}

function game2Logic() {
  // Game 2 code here
  gameoverlayLoader.style.display = "flex";
  setTimeout(() => {
    gameoverlayLoader.style.display = "none";
    resetFlipGame();
    showPreviewInGame(howtoplayDivg2);
  }, 3000);

  console.log("Game 2 started in full screen");
}

function readyAndGoScreen(game) {
  document.getElementById("readyGoScreen").style.display = "block";
  document.getElementById("readyText").innerHTML = "Ready!";
  setTimeout(function () {
    document.getElementById("readyText").innerHTML = "Go!";
    setTimeout(function () {
      document.getElementById("readyGoScreen").style.display = "none";
    }, 1000); // 1 second delay
  }, 1000); // 3 seconds delay
}

function addGameEntry() {
  let tentry = getTotalGameEntries();

  // Create or update the cookie for the game entry
  tentry += 1;
  document.cookie = `game-entry=${tentry}; path=/;`;
}

function setGameCompleted(game) {
  document.cookie = `game-${game}=1; path=/;`;
}

function getGameCompleted(game) {
  // Check the current total game entries from the cookie
  const cookies = document.cookie.split("; ");
  let gamePlayed = 0;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name === "game-" + game) {
      // Check for the specific cookie name
      gamePlayed = parseInt(value) || 0; // Get the value if it exists
    }
  });
  return gamePlayed;
}

function getTotalGameEntries() {
  // Check the current total game entries from the cookie
  const cookies = document.cookie.split("; ");
  let totalEntries = 0;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name === "game-entry") {
      // Check for the specific cookie name
      totalEntries = parseInt(value) || 0; // Get the value if it exists
    }
  });

  if (totalEntries > 2) {
    totalEntries = 0;
  }
  return totalEntries;
}

function deleteGameEntry() {
  // Delete the cookie for the game entry
  document.cookie = `game-entry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `game-1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `game-2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function updateGameEntry() {
  let tentry = getTotalGameEntries();

  homeEntry.innerHTML = tentry;
  inGame1Entry.innerHTML = tentry;
  inGame2Entry.innerHTML = tentry;
  RedeemEntry.innerHTML = tentry;
}

document.addEventListener("DOMContentLoaded", function () {
  glide.on("run", function () {
    const index = glide.index;
    if (index == 0) {
      document.getElementById("prev-btn").style.display = "none";
      document.getElementById("next-btn").style.display = "flex";
    } else if (index == 1) {
      document.getElementById("prev-btn").style.display = "flex";
      document.getElementById("next-btn").style.display = "none";
    }
  });
  updateGameEntry();
  glide.mount();
});

window.addEventListener("load", function () {
  glide.update();

  // Show Loader
  // gameoverlayLoader.style.display = "flex";
  // setTimeout(() => {
  //   gameoverlayLoader.style.display = "none";
  // }, 3000);
});
