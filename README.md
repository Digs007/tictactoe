# Tic-Tac-Toe AI

A tic-tac-toe AI program that never loses. This program uses the minimax algorithm to predict the winning move.

https://en.wikipedia.org/wiki/Minimax#Minimax_algorithm_with_alternate_moves

## Usage

Requires HTML, CSS, javascript

## Algorithm Details

A **minimax** algorithm is a recursive algorithm for choosing the next move in an n-player game, usually a two-player, back and forth game. A value is associated with each position or state of the game. This value is computed by means of a position evaluation function and it indicates how good it would be for a player to reach that position. The player then makes the move that maximizes the minimum value of the position resulting from the opponent's possible following moves. If it is A's turn to move, A gives a value to each of his legal moves.

A simple version of the minimax algorithm, stated below, deals with games such as tic-tac-toe, where each player can win, lose, or draw. If player A can win in one move, his best move is that winning move. If player B knows that one move will lead to the situation where player A can win in one move, while another move will lead to the situation where player A can, at best, draw, then player B's best move is the one leading to a draw. Late in the game, it's easy to see what the "best" move is. The Minimax algorithm helps find the best move, by working backwards from the end of the game. At each step it assumes that player A is trying to maximize the chances of A winning, while on the next turn player B is trying to minimize the chances of A winning (i.e., to maximize B's own chances of winning).

## Pseudocode

findBestMove(board) returns the best move the maximizer can make.

```
function findBestMove(board):
    bestMove = NULL
    for each move in board :
        if current move is better than bestMove
            bestMove = current move
    return bestMove
```

To check whether or not the current move is better than the best move we take the help of minimax() function which will consider all the possible ways the game can go and returns the best value for that move, assuming the opponent also plays optimally

```
function minimax(board, depth, isMaximizingPlayer):
    if current board state is a terminal state :
        return value of the board

    if isMaximizingPlayer :
        bestVal = -INFINITY
        for each move in board :
            value = minimax(board, depth+1, false)
            bestVal = max( bestVal, value)
        return bestVal

    else :
        bestVal = +INFINITY
        for each move in board :
            value = minimax(board, depth+1, true)
            bestVal = min( bestVal, value)
        return bestVal
```

To check whether the game is over and to make sure there are no moves left we use isMovesLeft() function.

```
function isMovesLeft(board):
    for each cell in board:
        if current cell is empty:
            return true
    return false
```

Making our AI smarter :

```
if maximizer has won:
    return WIN_SCORE – depth

else if minimizer has won:
    return LOOSE_SCORE + depth
```

// Calling the function for the first time.
findBestMove(char board[3][3])

```

## Minimax Algorithm Visualisation

![alt text](https://github.com/GeorgeSeif/Tic-Tac-Toe-AI/blob/master/minimax_vis.png)

```
