let playerStart = "X";
let player = document.querySelector(".player");
let winnerLabel = document.querySelector(".winner");
let gameTiles = document.querySelectorAll(".play-box");
let winningArray = ["123", "456", "789", "147", "258", "369", "159", "357"];

gameTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    markTile(tile);
    getWinner();
    setPlayer();
  });
});

function setPlayer() {
  playerStart = playerStart === "X" ? "O" : "X";
}

function markTile(tile) {
  if (tile.innerHTML === "") {
    tile.innerHTML = playerStart;
  }
}

function getWinner() {
  let objWin = {};
}
