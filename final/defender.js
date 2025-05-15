let gameSpace = document.getElementById("game-space");
let piece = document.getElementById("piece");
let enemyPiece = document.getElementById("enemy-piece");
let spaceCoords = gameSpace.getBoundingClientRect();
let startGame = document.getElementById("start-game");
let score = document.getElementById("score");
let scoreNumber = 0;
let scoreList = document.getElementById("score-list");
let previousScore;
let timeOn = false;

//Fuctionality For player interaction with playable area via mouse
gameSpace.onmousedown = function (event) {
  console.log("spacetest");
  if (timeOn == false) return;
  else {
    moveEnemy();
  }

  let pieceCoords = {
    top:
      event.clientY -
      spaceCoords.top -
      gameSpace.clientTop -
      piece.clientHeight / 2,
    left:
      event.clientX -
      spaceCoords.left -
      gameSpace.clientLeft -
      piece.clientWidth / 2,
  };

  if (pieceCoords.top < 0) pieceCoords.top = 0;

  if (pieceCoords.left < 0) pieceCoords.left = 0;

  if (pieceCoords.left + piece.clientWidth > gameSpace.clientWidth) {
    pieceCoords.left = gameSpace.clientWidth - piece.clientWidth;
  }

  if (pieceCoords.top + piece.clientHeight > gameSpace.clientHeight) {
    pieceCoords.top = gameSpace.clientHeight - piece.clientHeight;
  }

  piece.style.left = pieceCoords.left + "px";
  piece.style.top = pieceCoords.top + "px";
};

//Functionality for enemy reaction and scorekeeping
enemyPiece.onmousedown = function (event) {
  console.log("clicked");
  enemyPiece.style.backgroundImage = "url('explosion.png')";
  setTimeout(() => (this.style.backgroundImage = "url('asteroid.png')"), 500);
  moveEnemy();

  if (timeOn == true) {
    scoreNumber++;
  }

  score.innerHTML = scoreNumber;
};

//Code for starting game through button press
startGame.onclick = function (event) {
  if (timeOn == true) return;
  else {
    if (scoreNumber != 0) {
      addScore(scoreNumber);
    }
    scoreNumber = 0;
    score.innerHTML = scoreNumber;
    enemyPiece.style.backgroundImage = "url('asteroid.png')";
    piece.style.backgroundImage = "url('reticule.png')";
    startGame.style.backgroundColor = "darkred";
    startGame.style.color = "white";
    timer(30);
    moveEnemy();
  }
};

//Code for when timer begins and ends
function timer(time) {
  timeOn = true;
  let sec = time;
  let timer = setInterval(function () {
    document.getElementById("timer-display").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      timeOn = false;
      startGame.style.backgroundColor = "red";
      return alert(`FINISH! Score: ${scoreNumber}`);
    }
  }, 1000);
}

//Moves enemy piece to different areas of the board
function moveEnemy() {
  enemyPiece.style.left = Math.floor(Math.random() * 1707) + "px";
  enemyPiece.style.top = Math.floor(Math.random() * 730) + "px";
}

//Places scores into the scoreboard
function addScore(oldScore) {
  let newScore = scoreList.insertAdjacentHTML(
    "beforeend",
    `<li>${oldScore}</li>`
  );
  console.log(oldScore);
}
