import { Board } from "../board";
interface Node {
  row: number;
  col: number;
  visited: boolean;
}
export default class DFS {
  board: Board;
  visitedNodes: Map<Node, Node>;
  start: Node;
  end: Node;
  path: Node[];
  searchpath: Node[];

  constructor(board: Board) {
    this.board = board;
    this.visitedNodes = new Map();
    this.start = {
      row: board.start[0],
      col: board.start[1],
      visited: false,
    };
    this.end = {
      row: board.end[0],
      col: board.end[1],
      visited: false,
    };
    this.searchpath = [];
    this.path = [];
  }

  search(): boolean {
    return this.dfs(this.start);
  }

  private dfs(node: Node): boolean {
    if (this.isAtEnd(node)) {
      let currentNode = node;
      while (
        currentNode !== undefined &&
        (currentNode.row !== this.start.row ||
          currentNode.col !== this.start.col)
      ) {
        this.path.push(currentNode);
        currentNode = this.visitedNodes.get(currentNode) as Node;
      }
      this.path.reverse();
      return true;
    }

    if (this.searchpath.indexOf(node) === -1) {
      this.searchpath.push(node);
    }
    const adjacentNodes = this.getAdjacentNodes(node);
    for (const adjacentNode of adjacentNodes) {
      this.visitedNodes.set(adjacentNode, node);
      if (this.dfs(adjacentNode)) {
        return true;
      }
    }
    return false;
  }

  private getAdjacentNodes(node: Node) {
    const adjacentNodes: Node[] = [];
    const row = node.row;
    const col = node.col;
    const adjacentCoords = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    adjacentCoords.forEach(([row, col]) => {
      if (this.isValid(row, col) && !this.isVisited(row, col)) {
        const adjacentNode: Node = {
          row,
          col,
          visited: false,
        };
        adjacentNodes.push(adjacentNode);
      }
    });
    return adjacentNodes;
  }

  private isValid(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.board.board.length &&
      col >= 0 &&
      col < this.board.board[0].length &&
      this.board.board[row][col] !== 5
    );
  }

  private isVisited(row: number, col: number): boolean {
    return Array.from(this.visitedNodes.keys()).some(
      (node) => node.row === row && node.col === col
    );
  }

  private isAtEnd(node: Node): boolean {
    return node.row === this.end.row && node.col === this.end.col;
  }
}
