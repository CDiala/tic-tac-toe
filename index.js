let playerStart = "X";
let player = document.querySelector(".player");
let winnerLabel = document.querySelector(".winner");
let gameTiles = document.querySelectorAll(".play-box");
let winningArray = ["123", "456", "789", "147", "258", "369", "159", "357"];
let tileCount = winningArray[0].length;
let xCount = 0;
let oCount = 0;
let xIndices = "";
let oIndices = "";

gameTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    markTile(tile);
    countPlay();
    setPlayIndex(tile.dataset.id);
    if (!winnerLabel.innerHTML.includes(" ")) {
      winnerLabel.innerHTML += getWinner(
        playerStart === "X" ? xCount : oCount,
        playerStart,
        playerStart === "X" ? xIndices : oIndices
      );
    } else {
    }
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
  // Set tile text
  if (tile.innerHTML === "") {
    tile.innerHTML = playerStart;
  }
}

function setPlayIndex(num) {
  strNum = num.toString();
  // Save player's tiles
  if (playerStart === "X") {
    if (!xIndices.includes(strNum)) {
      xIndices += strNum;
    }
  } else {
    if (!oIndices.includes(strNum)) {
      oIndices += strNum;
    }
  }
}

function getWinner(playCount, player, strIndices) {
  let sortedIndices = String(strIndices).split("");
  sortedIndices = sortedIndices.sort((a, b) => a - b).join("");
  if (playCount < tileCount) {
  } else if (sortedIndices.length === tileCount) {
    for (let item of winningArray) {
      if (item.includes(sortedIndices) || sortedIndices.includes(item)) {
        return "Player '" + player + "' wins";
      }
    }
  } else {
    // Check if player wins the round
    for (let i = 0; i < winningArray.length; i++) {
      let winItem = winningArray[i];
      let count = 0;
      for (let j = 0; j < winItem.length; j++) {
        if (sortedIndices.includes(winItem[j])) {
          count++;
        }
        if (count === winItem.length) {
          return "Player '" + player + "' wins";
        }
      }
    }
  }
  return "";
}

function getWinningTiles(count) {
  // assume count = 4
  // declare an array variable
  // loop thru count and populate accordingly:
  /*
    1. horizontal tiles: difference = 1 i.e. ['1.2.3.4', '5.6.7.8', '9.10.11.12', '13.14.15.16']
    2. vertical tiles: difference = 4 i.e. ['1.5.9.13', '...']
    3. diag left tiles: difference = 5 i.e. ['1.6.11.16']
    3. diag right tiles: difference = 5 i.e. ['4.7.10.13']

  */
}
