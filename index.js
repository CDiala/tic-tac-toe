let playerStart = "X";
let player = document.querySelector(".player");
let winnerLabel = document.querySelector(".winner");
let gameTiles = document.querySelectorAll(".play-box");
let winningArray = ["123", "456", "789", "147", "258", "369", "159", "357"];
let xCount = 0;
let oCount = 0;
let xIndices = "";
let oIndices = "";

gameTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    markTile(tile);
    countPlay();
    setPlayIndex(tile.dataset.id);
    getWinner(playerStart === "X" ? xCount : oCount);
    setPlayer();
  });
});

function setPlayer() {
  if (playerStart === "X") {
    playerStart = "O";
  } else {
    playerStart = "X";
  }
}

function countPlay() {
  if (playerStart === "X") {
    xCount++;
  } else {
    oCount++;
  }
}

function markTile(tile) {
  if (tile.innerHTML === "") {
    tile.innerHTML = playerStart;
  }
}

function setPlayIndex(num) {
  if (playerStart === "X") {
    xIndices += num.toString();
    console.log(xIndices);
  } else {
    oIndices += num;
    console.log(oIndices);
  }
}

function getWinner(playCount) {
  console.log(playerStart, playCount);
  if (playCount < 3) {
  } else {
    console.log(playCount + " is up to 3");
  }
}
