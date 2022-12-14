# React Tic-Tac-Toe, Connect Four MinMax solver and Maze Search algorithm demonstrator

This is a simple React project that demonstrates the implementation of a minimax alpha-beta algorithm for the games of Tic-Tac-Toe and Connect Four. The project also includes an example of using breadth-first search (BFS) and depth-first search (DFS) to solve a maze.

[Live demo](https://gravender.github.io/AiGames/)

## Getting Started

To get started, clone the repository and install the dependencies:
```
git clone https://github.com/Gravender/AiGames
cd AiGames
npm install
```
Once the dependencies are installed, you can run the project in development mode with:
```
npm run start
```
This will start the development server and open the project in your default browser.
### How to Play

To play Tic Tac Toe and Connect Four with MinMax Alpha Beta Pruning Algorithm, you can either play against another player or against the AI. To play against the AI, simply choose your starting move. The AI will use the MinMax Alpha Beta Pruning Algorithm to calculate the best possible move to make every turn.

### What is MinMax Alpha Beta Pruning Algorithm?

MinMax Alpha Beta Pruning Algorithm is an AI algorithm that is used to find the optimal move in a two-player game. This algorithm works by evaluating all possible moves for both players and choosing the best move based on the evaluation. The algorithm uses alpha-beta pruning to minimize the number of possible moves that need to be evaluated. Alpha-beta pruning works by pruning (eliminating) branches of the game tree that cannot possibly lead to a better result. This makes the algorithm more efficient and allows it to play at a higher level than other algorithms.

### Why use Alpha Beta Pruning over a basic MinMax algorithm?

Alpha-beta pruning is an optimization of the minimax algorithm that can reduce the number of nodes that the algorithm needs to search, thus allowing it to search deeper and more quickly. This optimization can be especially valuable in games such as Connect Four, where the number of possible moves is significantly greater than that of Tic Tac Toe. Without alpha-beta pruning, the minimax algorithm would require a lot more time to search all of the possible moves and outcomes, making it impossible to find the optimal move in a timely manner. Alpha-beta pruning helps Connect Four players to quickly access the best move for any given board state.

### BFS (Breadth-First Search) 

BFS (Breadth-First Search) is an algorithm that is used to traverse a graph or a tree data structure. It starts at the root node and explores the neighbor nodes first, before moving to the next level neighbors.

The algorithm works in the following steps:

    1. Start at the root node and add it to the queue
    2. Take the first node in the queue and remove it from the queue
    3. Check if the node has any unvisited neighbors. If yes, add them to the queue
    4. Repeat steps 2 and 3 until all the nodes in the graph have been visited

The advantage of BFS is that it guarantees that the shortest path from the root node to any other node will be found. It is commonly used in graph traversal problems, such as finding the shortest path in a maze or finding all connected components in a graph.

### DFS (Depth-First Search) 

DFS, or Depth-First Search, is an algorithm used to traverse a tree or graph data structure. It involves starting at the root node and exploring as far as possible along each branch before backtracking and exploring the next branch.

To implement DFS, we need to keep track of two things: the visited nodes and the unvisited nodes. The visited nodes will be stored in a set or list, and the unvisited nodes will be stored in a stack.

The algorithm works as follows:

    1. Push the root node onto the stack of unvisited nodes
    2. While the stack is not empty, pop the top node from the stack and add it to the set of visited nodes
    3. For each unvisited child of the current node, push it onto the stack
    4. Repeat steps 2 and 3 until all nodes have been visited

DFS has a time complexity of O(V+E), where V is the number of vertices and E is the number of edges. It is useful for exploring a graph and finding paths, but may not be the most efficient for finding the shortest path.
