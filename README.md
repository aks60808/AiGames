# Tic Tac Toe and Connect Four with MinMax Alpha Beta Pruning Algorithm

Welcome to Tic Tac Toe and Connect Four with MinMax Alpha Beta Pruning Algorithm! We offer a fun and challenging game of Tic Tac Toe and Connect Four against a basic algorithm.

## How to Play

To play Tic Tac Toe and Connect Four with MinMax Alpha Beta Pruning Algorithm, you can either play against another player or against the AI. To play against the AI, simply choose your starting move. The AI will use the MinMax Alpha Beta Pruning Algorithm to calculate the best possible move to make every turn.

## What is MinMax Alpha Beta Pruning Algorithm?

MinMax Alpha Beta Pruning Algorithm is an AI algorithm that is used to find the optimal move in a two-player game. This algorithm works by evaluating all possible moves for both players and choosing the best move based on the evaluation. The algorithm uses alpha-beta pruning to minimize the number of possible moves that need to be evaluated. Alpha-beta pruning works by pruning (eliminating) branches of the game tree that cannot possibly lead to a better result. This makes the algorithm more efficient and allows it to play at a higher level than other algorithms.

## Why use Alpha Beta Pruning over a basic MinMax algorithm?

Alpha-beta pruning is an optimization of the minimax algorithm that can reduce the number of nodes that the algorithm needs to search, thus allowing it to search deeper and more quickly. This optimization can be especially valuable in games such as Connect Four, where the number of possible moves is significantly greater than that of Tic Tac Toe. Without alpha-beta pruning, the minimax algorithm would require a lot more time to search all of the possible moves and outcomes, making it impossible to find the optimal move in a timely manner. Alpha-beta pruning helps Connect Four players to quickly access the best move for any given board state.

## How it can be further improved with bitboards

Bitboards can be used to further improve alpha beta pruning minmax algorithms for Connect Four. Bitboards are a data structure that represent the board state of a game using bits. This allows for faster evaluation of the board state and faster calculation of the next best move. Additionally, bitboards can be used to quickly determine the number of pieces on the board, the empty squares, and the current state of each column. This information can be used to further optimize the alpha beta pruning minmax algorithms, as it allows the algorithm to quickly identify which moves should be explored and which should be discarded. Additionally, bitboards can be used to more quickly detect when a game has been won or lost, allowing for faster convergence on the optimal solution.
