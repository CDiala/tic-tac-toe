let playerStart = "X";
let currentPlayer = playerStart;
let player = document.querySelector(".player");
let winnerLabel = document.querySelector(".winner");
let errorDisplay = document.querySelector(".error");
let gameTiles = document.querySelectorAll(".play-box");
let dynamicWinArray; // dynamically construct the winning array
let tileCount;
let xCount = 0;
let oCount = 0;
let xIndices = "";
let oIndices = "";

function setPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  setDisplayText(player, `${currentPlayer}`);
}

function countPlay() {
  if (currentPlayer === "X") {
    xCount++;
  } else {
    oCount++;
  }
}

function markTile(tile) {
  // Set tile text
  if (tile.innerHTML === "") {
    tile.innerHTML = currentPlayer;
  }
}

function setPlayIndex(num) {
  let strNum = num.toString();
  // Save player's tiles
  currentPlayer === "X"
    ? (xIndices += ` ${strNum}`)
    : (oIndices += ` ${strNum}`);
}

function getWinner(playCount, player, strIndices) {
  // Sort the strIndices to mimic winArrayList items
  let strIndicesArray = String(strIndices).trim().split(" ");
  let sortedIndicesArray = strIndicesArray.sort((a, b) => a - b);
  if (playCount < tileCount) {
    return "";
  } else if (playCount === tileCount) {
    // Loop thru the resuts and check which one matches the player's tiles
    for (let i = 0; i < dynamicWinArray.length; i++) {
      if (dynamicWinArray[i].join("") === sortedIndicesArray.join("")) {
        return `Player ${player}`;
      }
    }
  } else {
    /*
    loop through the dynamicWinArray
      loop through the items and see if the player's tiles contains them.
        update count accordingly.
      if count === nTiles, return the corresponding response.
    */
    for (let i = 0; i < dynamicWinArray.length; i++) {
      let count = 0;
      for (let j = 0; j < nTiles; j++) {
        if (!sortedIndicesArray.includes(dynamicWinArray[i][j])) {
        } else {
          count++;
        }
      }
      if (count === +nTiles) {
        return `Player ${player}`;
      }
    }
  }
  return "";
}

// Reset game
let resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  clearTiles();
  currentPlayer = playerStart;
  setDisplayText(player, `${currentPlayer}`);
  setDisplayText(winnerLabel, "");
});

// Function to clear tiles
function clearTiles() {
  tilesContainer.childNodes.forEach((tile) => {
    tile.innerHTML = "";
  });
  errorDisplay.innerHTML = "";
  xCount = 0;
  oCount = 0;
  xIndices = "";
  oIndices = "";
}

// Function to reset texts
function setDisplayText(control, value) {
  control["innerHTML"] = value;
}

// ---------------------------------------------- //
// -------------DYNAMIC GAME STARTS-------------- //
// ---------------------------------------------- //
// dynamic tic-tac-toe
function getWinningTiles(count) {
  let finalArray = [];
  let arrHorizontal = getHorizontal(count);
  let arrVertical = getVertical([...arrHorizontal]);
  let strLeftDiag = getLeftDiag([...arrHorizontal]);
  let strRightDiag = getRightDiag([...arrHorizontal]);
  finalArray.push(...arrHorizontal, ...arrVertical, strLeftDiag, strRightDiag);
  return finalArray;
}

function getHorizontal(n) {
  let arrHorizontal = [];
  let loopEnd = Math.pow(n, 2);

  let strWin = "";
  for (let i = 1; i <= loopEnd; i++) {
    strWin += i + " ";
    if (i % n !== 0) {
    } else {
      arrHorizontal.push(strWin.trim());
      strWin = "";
    }
  }
  return arrHorizontal;
}

function getVertical(n) {
  let arrVertical = [];
  for (let index in n) {
    let newArr = n[index].split(" ");
    for (let innerIndex in newArr) {
      // If array item doesn't exist, enter new record
      // else, append new record
      arrVertical[innerIndex] = arrVertical[innerIndex]
        ? `${arrVertical[innerIndex]} ${newArr[innerIndex]}`
        : newArr[innerIndex];
    }
  }
  return arrVertical;
}

function getLeftDiag(arr) {
  let strLeftDiag = "";
  for (let index in arr) {
    // Remove the spaces in the array item
    let arrayItem = arr[index].split(" ");

    // Append the nth item to the variable string
    strLeftDiag += `${arrayItem[index]} `;
  }
  return strLeftDiag.trim();
}

function getRightDiag(arr) {
  let strRightDiag = "";
  let itemLength = arr.length - 1;
  for (let index in arr) {
    let arrayItem = arr[index].split(" ");
    // Get the nth item in reverse order (RTL) and append to string variable
    strRightDiag += `${arrayItem[itemLength - index]} `;
  }
  return strRightDiag.trim();
}

// Get tile count from input field
let btnStart = document.querySelector("#btnStart");
let nTiles;
btnStart.addEventListener("click", (e) => {
  // Save tile number
  let inputText = document.querySelector(".tile-count").value;

  // Get winning array list if input is valid
  if (!(+inputText >= 3 && +inputText <= 9)) {
    tilesContainer.innerHTML = "";
    errorDisplay.innerHTML = `Incorrect entry: '${inputText}'.
    Please enter a number between 3 and 9.`;
  } else {
    errorDisplay.innerHTML = "";
    nTiles = inputText;
    dynamicWinArray = [
      ...getWinningTiles(nTiles).map((list) => [...list.split(" ")]),
    ];
    tileCount = dynamicWinArray[0].length;

    // Call function to create tiles
    createTiles(nTiles);
  }
});

// ---------------------------------------------- //
// -------------Creating the tiles-------------- //
// ---------------------------------------------- //
let tilesContainer = document.querySelector("#tiles-container");

// Create divs based on the number of game tiles
// and style tile container and game tiles based
// on the screen width.
function createTiles(tileCount) {
  // Get screen width and padding
  let style = getComputedStyle(document.querySelector("main"));
  let screenPadding = +style.paddingLeft.replace("px", "") * 2;
  let screenWidth = +style.width.replace("px", "");

  // Set screen width
  let tilesContainerWidth = screenWidth - screenPadding;
  let tileWidth = tilesContainerWidth / tileCount;

  // Clear existing children
  tilesContainer.innerHTML = "";

  // Set new container width
  tilesContainer.style.width = `${tilesContainerWidth}px`;

  // Populate new set of child elements
  for (let i = 0; i < Math.pow(tileCount, 2); i++) {
    // Define new tile, add style + class + dataset attributes
    let btn = document.createElement("button");
    btn.textContent = "";
    btn.style.height = `${tileWidth}px`;
    btn.style.width = `${tileWidth}px`;
    btn.classList.add("play-box");
    btn.dataset.id = i + 1;

    // Add new tile to container
    tilesContainer.appendChild(btn);
  }

  addClickEvent();
}

// --------------------------------------------------- //
// -------------Add Click Event to tiles-------------- //
// --------------------------------------------------- //

function addClickEvent() {
  tilesContainer.childNodes.forEach((tile) => {
    tile.addEventListener("click", () => {
      // Do nothing if tile is not blank
      // else if a winner hasn't emerged, execute code
      if (tile.innerHTML !== "") {
      } else if (!winnerLabel.innerHTML.includes("Player")) {
        markTile(tile);
        countPlay();
        setPlayIndex(tile.dataset.id);
        winnerLabel.innerHTML += getWinner(
          currentPlayer === "X" ? xCount : oCount,
          currentPlayer,
          currentPlayer === "X" ? xIndices : oIndices
        );
        setPlayer();
      }
    });
  });
}

// ---------------------------------------------------- //
// ------------Change game and tiles width------------- //
// ------------based on screen size change------------- //
// ---------------------------------------------------- //
window.addEventListener("resize", () => {
  if (tilesContainer.hasChildNodes) {
    // Recalculate tiles container width
    resizeGame();
  }
});

function resizeGame() {
  // Get screen width and padding
  let style = getComputedStyle(document.querySelector("main"));
  let screenPadding = +style.paddingLeft.replace("px", "") * 2;
  let screenWidth = +style.width.replace("px", "");

  if (screenWidth <= 768) {
    // Resize game container
    let tilesContainerWidth = screenWidth - screenPadding;
    tilesContainer.style.width = `${tilesContainerWidth}px`;

    // Get new tile width
    let tileWidth = tilesContainerWidth / tileCount;

    // Resize width and height of game tiles
    let childCount = tilesContainer.childElementCount;

    for (let i = 0; i < childCount; i++) {
      tilesContainer.children.item(i).style.height = `${tileWidth}px`;
      tilesContainer.children.item(i).style.width = `${tileWidth}px`;
    }
  }
}
