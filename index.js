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
  if (tile.innerHTML === "") {
    tile.innerHTML = playerStart;
  }
}

function setPlayIndex(num) {
  strNum = num.toString();
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
  if (playCount < 3) {
  } else if (sortedIndices.length === 3) {
    for (let item of winningArray) {
      if (item.includes(sortedIndices) || sortedIndices.includes(item)) {
        return "Player '" + player + "' wins";
      }
    }
  } else {
    // item: 357 ; sortedIndices: 35678
    // code doesn't catch the above. fix it and that's all.
    for (let i = 0; i < winningArray.length; i++) {
      let winItem = winningArray[i];
      for (let j = 0; j < winItem.length; j++) {
        console.log("item:", winItem[j], ";", "sortedIndices:", sortedIndices);
        if (!sortedIndices.includes(winItem[j])) {
          break;
        }
      }
    }
    return "Player '" + player + "' wins";
  }
  return "";
}
