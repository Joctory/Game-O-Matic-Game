/* Developed by Joel Lee @ Joasis Web */
var glide = new Glide(".glide", {
  type: "slider",
  startAt: 0,
  perView: 1,
  focusAt: "center",
  rewind: false,
});

// Parameter
var homeEntry = document.getElementById("entry-id");
var logoMain = document.getElementById("logo-main");
var startBtn = document.getElementById("startBtn");
var selectionMain = document.getElementById("selection-main");
var RedeemEntry = document.getElementById("entry-redeem-id");
var inGame1Entry = document.getElementById("entry-redeem-g1-id");
var inGame2Entry = document.getElementById("entry-redeem-g2-id");
var gameExit = document.getElementById("game-exit");
var gameExitoverlay = document.getElementById("game-exit-overlay");
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
var prevButton = document.getElementById("prev-btn");
var nextButton = document.getElementById("next-btn");

// Init Game Var
var gameInitLoader = document.getElementById("game-init-loader");
const initLoader = document.querySelector(".init-loader");
var gameInitButton = document.getElementById("game-init-button");

// Setting
var musicImg = document.getElementById("music-img");
var soundeffectImg = document.getElementById("sound-effect-img");

var game1selectbutton = document.getElementById("game1selectbutton");
var game2selectbutton = document.getElementById("game2selectbutton");

// Global variable to track sound effects state
const audio = new Audio(
  "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/bg-music.mp3"
); // Replace with your music file path
let areSoundEffectsOn = true; // Assume sound effects are on by default
let isMusicOn = true; // Assuming this is the 'on' icon
let sounds = {}; // Object to hold all audio objects

// Global variable to hold the currently playing sound effect
let currentSoundEffect = null;

// Preload the sound effects when the page loads
function preloadSounds() {
  sounds.select = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/select.mp3"
  );
  sounds.close = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/close.mp3"
  );
  sounds.confirm = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/confirm.mp3"
  );
  sounds.redeemsuccess = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/redeem-success.mp3"
  );
  sounds.exit = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/exit.mp3"
  );
  sounds.readygo = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/ready-go.mp3"
  );
  sounds.arrowselect = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/arrow-select.mp3"
  );

  // In Game
  sounds.levelfail = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/level-fail.mp3"
  );
  sounds.levelcomplete = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/level-complete.mp3"
  );

  // Jigsaw Game
  sounds.jigsawmatch = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/jigsaw-match.mp3"
  );

  // Flip Game
  sounds.cardflip = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/card-flip.mp3"
  );
  sounds.cardshuffle = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/card-shuffle.mp3"
  );
  sounds.flipcorrect = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/flip-correct.mp3"
  );
  sounds.flipwrong = new Audio(
    "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/flip-wrong.mp3"
  );

  // Add more sounds as needed
}

function toggleMusicIcon() {
  // Check if music is currently playing

  if (isMusicOn) {
    // Stop the music and change the icon to 'off'
    isMusicOn = false;
    audio.pause(); // Stop the music
    musicImg.src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/music-off.png"; // Change to the 'off' icon
  } else {
    // Start the music and change the icon to 'on'
    isMusicOn = true;
    playMusic();
    musicImg.src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/music-on.png"; // Change to the 'on' icon
  }
}

// Function to toggle sound effects
function toggleSoundIcon() {
  // Check if sound effects are currently playing
  if (areSoundEffectsOn) {
    // Stop all sound effects and change the icon to 'off'
    soundeffectImg.src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/sound-effect-off.png"; // Change to the 'off' icon
    areSoundEffectsOn = false; // Update the state
  } else {
    // Start all sound effects and change the icon to 'on'
    soundeffectImg.src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/sound-effect-on.png"; // Change to the 'on' icon
    areSoundEffectsOn = true; // Update the state
  }
}

// Function to play a sound effect
function playSoundEffect(soundKey) {
  const sound = sounds[soundKey];

  if (sound && areSoundEffectsOn) {
    // Stop the currently playing sound effect if there is one
    if (currentSoundEffect) {
      currentSoundEffect.pause(); // Pause the currently playing sound
      currentSoundEffect.currentTime = 0; // Reset to the start
    }

    // Set the new sound as the current sound effect
    currentSoundEffect = sound;

    // Play the new sound effect
    sound.currentTime = 0; // Reset to the start
    sound.play().catch((error) => {
      console.error(`Error playing sound: ${soundKey}`, error);
    });
  }
}

// Function to play music
function playMusic() {
  if (isMusicOn) {
    audio.loop = true; // Optional: Loop the music
    audio.play();
  }
}

// Game Selection Script
function showGameSelectionPreview(div) {
  playSoundEffect("select");
  var game1com = getGameCompleted(1);
  var game2com = getGameCompleted(2);

  removePopClass();
  div.classList.add("active");
  div.classList.remove("closed");
  overlay.style.display = "block";

  if (game1com == 1) {
    game1selectbutton.classList.add("disabled");
    game1selectbutton.querySelector("img").src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/completed-button.png";
  } else {
    game1selectbutton.classList.remove("disabled");
    game1selectbutton.querySelector("img").src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/select-button.png";
  }

  if (game2com == 1) {
    game2selectbutton.classList.add("disabled");
    game2selectbutton.querySelector("img").src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/completed-button.png";
  } else {
    game2selectbutton.classList.remove("disabled");
    game2selectbutton.querySelector("img").src =
      "https://cdn.jsdelivr.net/gh/Joctory/Game-O-Matic-Game@latest/assets/menu/select-button.png";
  }
}

function game1Logic() {
  // Game 1 code here
  gameoverlayLoader.style.display = "flex";
  setTimeout(() => {
    gameoverlayLoader.style.display = "none";
    resetJigsawGame();
    playMusic();
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
    playMusic();
    showPreviewInGame(howtoplayDivg2);
  }, 3000);

  console.log("Game 2 started in full screen");
}

// Pop Up Container
function showPreview(div) {
  playSoundEffect("select");
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
  playSoundEffect("select");
  updateGameEntry();
  removePopClass();
  div.classList.add("closed");
  div.classList.remove("active");
  inGame1overlay.style.display = "none";
  inGame2overlay.style.display = "none";
}

function hidePreview(div) {
  playSoundEffect("close");
  updateGameEntry();
  removePopClass();
  div.classList.remove("active");
  div.classList.add("closed");
  overlay.style.display = "none";
}

function hideGamePreview(div) {
  playSoundEffect("close");
  updateGameEntry();
  removePopClass();
  div.classList.remove("active");
  div.classList.add("closed");
  overlay.style.display = "none";
}

function showRedeemMenu(div) {
  playSoundEffect("select");
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
    confirmRedeemText.innerHTML =
      "Are you ready to redeem the rewards? Show this screen to our staff!";
    confirmRedeemButton.style.display = "block";
    confirmRedeemSText.style.display = "block";
  }
}

function confirmRedeem() {
  playSoundEffect("confirm");
  removePopClass();
  redeemMenu.classList.remove("active");
  redeemMenu.classList.add("closed");
  overlayLoader.style.display = "flex";
  setTimeout(() => {
    deleteGameEntry();
    updateGameEntry();
    overlayLoader.style.display = "none";
    overlay.style.display = "block";
    playSoundEffect("redeemsuccess");
    confirmRedeemMenu.classList.add("active");
    confirmRedeemMenu.classList.remove("closed");
    confetti({
      particleCount: 400,
      spread: 250,
      origin: { y: 0.5 },
    });
  }, 3000);
}

function confirmExit() {
  playSoundEffect("exit");
  gameExit.classList.remove("closed");
  gameExit.classList.add("active");
  gameExitoverlay.style.display = "block";
}

function exitGame() {
  playSoundEffect("confirm");
  logoMain.classList.remove("bounce-in");
  selectionMain.classList.remove("slide-in-bottom");
  document.querySelectorAll(".mini-game-container").forEach((container) => {
    gameExit.classList.remove("active");
    overlay.style.display = "none";
    gameExitoverlay.style.display = "none";
    container.classList.remove("active");
    container.classList.add("closed");
    resetFlipGame();
    resetJigsawGame();
  });
  setTimeout(() => {
    logoMain.classList.add("bounce-in");
    selectionMain.classList.add("slide-in-bottom");
  }, 200);
}

function noExitGame() {
  playSoundEffect("close");
  gameExit.classList.remove("active");
  gameExit.classList.add("closed");
  gameExitoverlay.style.display = "none";
}

function menustartGame(gameId) {
  hidePreview(gamePreview);
  playSoundEffect("confirm");
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

function readyAndGoScreen(game) {
  document.getElementById("readyGoScreen").style.display = "block";
  playSoundEffect("readygo");
  document.getElementById("readyText").innerHTML = "Ready!";
  setTimeout(function () {
    document.getElementById("readyText").innerHTML = "Go!";
    setTimeout(function () {
      document.getElementById("readyGoScreen").style.display = "none";
    }, 1000); // 1 second delay
  }, 1050); // 3 seconds delay
}

// Entry Update
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

// game-btn to handle the click and touch events
document.querySelectorAll(".game-btn").forEach((button) => {
  const toggleActiveClass = () => {
    button.classList.toggle("active"); // Toggle the active class
  };

  button.addEventListener("click", toggleActiveClass); // Handle click event
  button.addEventListener("touchstart", toggleActiveClass); // Handle touch event
});

// game-btn-mg to handle the click and touch events
document.querySelectorAll(".game-btn-mg").forEach((button) => {
  const toggleActiveClass = () => {
    button.classList.toggle("active"); // Toggle the active class
  };

  button.addEventListener("click", toggleActiveClass); // Handle click event
  button.addEventListener("touchstart", toggleActiveClass); // Handle touch event
});

// Page Ready and Loaded
document.addEventListener("DOMContentLoaded", function () {
  preloadSounds();
  glide.on("run", function () {
    playSoundEffect("arrowselect");
    const index = glide.index;
    if (index == 0) {
      prevButton.style.display = "none";
      nextButton.style.display = "flex";
    } else if (index == 1) {
      prevButton.style.display = "flex";
      nextButton.style.display = "none";
    } else {
      prevButton.style.display = "none";
      nextButton.style.display = "flex";
    }
  });
  updateGameEntry();
  glide.mount();

  document.body.classList.add("disable-right-click");
  var meta = document.querySelector("meta[name='viewport']");
  if (meta) {
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    );
  } else {
    meta.name = "viewport";
    meta.charset = "UTF-8";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }
});

window.addEventListener("load", function () {
  glide.update();
  // playMusic();
  setTimeout(() => {
    initLoader.classList.add("loaded"); // Add the class to make it 100%
    setTimeout(() => {
      gameInitLoader.classList.add("remove");
      logoMain.classList.add("bounce-in");
      selectionMain.classList.add("slide-in-bottom");
    }, 1700);
  }, 2000);
});
