const board = [];
function createEmptyBoard() {
  // creating two dimensional array
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) board[i] = [];
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) board[i][j] = "";
  }
}
window.addEventListener("load", (event) => {
  createEmptyBoard();
});

/// min max started
class Move {
  constructor() {
    let row, col;
  }
}
let player = "x",
  opponent = "o";
// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] == "") return true;
  return false;
}
// This is the evaluation function as discussed
// in the previous article ( http://goo.gl/sJgv68 )
function evaluate(board) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
      if (board[row][0] == player) return +10;
      else if (board[row][0] == opponent) return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
      if (board[0][col] == player) return +10;
      else if (board[0][col] == opponent) return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    if (board[0][0] == player) return +10;
    else if (board[0][0] == opponent) return -10;
  }

  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
    if (board[0][2] == player) return +10;
    else if (board[0][2] == opponent) return -10;
  }

  // Else if none of them have won then return 0
  return 0;
}

// This is the minimax function. It considers all the possible ways the game can go and returns the
// value of the board
function minimax(board, depth, isMax) {
  let score = evaluate(board);

  // If Maximizer has won the game return his/her evaluated score
  if (score == 10) return score;

  // If Minimizer has won the game return his/her evaluated score
  if (score == -10) return score;

  // If there are no more moves and no winner then it is a tie
  if (isMovesLeft(board) == false) return 0;

  // If this maximizer's move
  if (isMax) {
    let best = -1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] == "") {
          // Make the move
          board[i][j] = player;
          // Call minimax recursively and choose the maximum value
          best = Math.max(best, minimax(board, depth + 1, !isMax));
          // Undo the move
          board[i][j] = "";
        }
      }
    }
    return best;
  }
  // If this minimizer's move
  else {
    let best = 1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] == "") {
          // Make the move
          board[i][j] = opponent;

          // Call minimax recursively and
          // choose the minimum value
          best = Math.min(best, minimax(board, depth + 1, !isMax));

          // Undo the move
          board[i][j] = "";
        }
      }
    }
    return best;
  }
}

// This will return the best possible move for the player
function findBestMove(board) {
  let bestVal = -1000;
  var bestMove = new Move();
  bestMove.row = -1;
  bestMove.col = -1;
  // Traverse all cells, evaluate minimax function for all empty cells. And return the cell
  // with optimal value.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (board[i][j] == "") {
        // Make the move
        board[i][j] = player;
        // compute evaluation function for this move.
        let moveVal = minimax(board, 0, false);
        // Undo the move
        board[i][j] = "";
        // If the value of the current move is more than the best value, then update best
        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  console.log("The value of the best Move " + "is : ", bestVal + "<br><br>");
  return bestMove;
}

/// ***********************  min max end ************************* ////
const twoPlayer = localStorage.getItem("twoPlayer");
//stores player turns
let currentPlayer = "x";

//stores the status of the game, whether its over or still in play
let gameStatus = "Game On";

//Gets all Boxes elements
const boxes = document.getElementsByClassName("box");

var count = 0;
//loops through all the elements
var flag = true;
for (let i = 0; i < boxes.length; i++) {
  //adds event listener to each box;
  boxes[i].addEventListener("click", function () {
    //checks if the box has an x or an o in it and also checks if the game is still on
    if (boxes[i].innerHTML.trim() == "" && gameStatus == "Game On") {
      count++;
      //adds x or o for the current play in their choosen box
      boxes[i].innerHTML = currentPlayer;
      // define value in board
      let x = Math.floor(i / 3);
      let y = i % 3;
      // console.log(x + " " + y);
      board[x][y] = currentPlayer;
      //changes player turns
      currentPlayer = currentPlayer == "x" ? "o" : "x";

      //changes player's turn label on top of the game
      document.getElementById("player").innerHTML = currentPlayer.toUpperCase();

      //checks 3 matching x's or o's
      if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 1, 2);
      } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
      ) {
        showWinner(3, 4, 5);
      } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
      ) {
        showWinner(6, 7, 8);
      } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 3, 6);
      } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
      ) {
        showWinner(1, 4, 7);
      } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        showWinner(2, 5, 8);
      } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 4, 8);
      } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        showWinner(2, 4, 6);
      }
      if (count == 9 && gameStatus == "Game On") {
        showDraw();
      }
      if (gameStatus == "Game On" && twoPlayer == "AI" && count % 2 !== 0) {
        bestMove = findBestMove(board);
        let counter = 3 * bestMove.row + bestMove.col;
        boxes[counter].click();
      }
    }
  });
}

//resets the game
document.getElementById("reset").addEventListener("click", function () {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "#dee9ec";
    boxes[i].style.color = "black";
  }
  count = 0;
  currentPlayer = "x";
  document.getElementById("message").style.display = "none";
  document.getElementById("draw").style.display = "none";
  document.getElementById("player").innerHTML = "X";
  gameStatus = "Game On";
  createEmptyBoard();
});

//displays the Draw message
function showDraw() {
  document.getElementById("draw").style.display = "block";
  gameStatus = "Game Over";
}
//displays the winner
function showWinner(x, y, z) {
  boxes[x].style.background = "#0d8b70";
  boxes[x].style.color = "white";
  boxes[y].style.background = "#0d8b70";
  boxes[y].style.color = "white";
  boxes[z].style.background = "#0d8b70";
  boxes[z].style.color = "white";
  document.getElementById("winner").innerHTML =
    currentPlayer == "x" ? "O" : "X";
  document.getElementById("message").style.display = "block";
  gameStatus = "Game Over";
}
