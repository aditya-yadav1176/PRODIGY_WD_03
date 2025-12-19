const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "pvp";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playMove(index) {
  if(board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if(checkWinner()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if(gameMode === "ai" && currentPlayer === "O"){
    setTimeout(aiMove, 400);
  }
}

function checkWinner(){
  for(let pattern of winPatterns){
    const [a, b, c] = pattern;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      statusText.textContent = `Player ${board[a]} wins!`;
      gameActive = false;
      return true;
    }
  }

  if(!board.includes("")){
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function aiMove(){
  let emptyCells = board
    .map((v, i) => (v === "" ? i : null))
    .filter((v) => v !== null);

  if(emptyCells.length === 0) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  playMove(randomIndex);
}

function resetGame(){
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach((cell) => (cell.textContent = ""));
}

function setMode(mode){
  gameMode = mode;
  resetGame();
  statusText.textContent = mode === "ai" ? "Player X vs AI" : "Player X's turn";
}
