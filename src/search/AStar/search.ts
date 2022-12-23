import { Board } from "../board";
interface Node {
  parent: Node | null;
  row: number;
  col: number;
  g: number;
  h: number;
  f: number;
}
export default class Astar {
  board: Board;
  openlist: Node[];
  closelist: Node[];
  start: Node;
  end: Node;
  path: { row: number; col: number }[];
  searchpath: { row: number; col: number }[];

  constructor(board: Board) {
    this.board = board;
    this.openlist = [];
    this.closelist = [];
    this.start = {
      parent: null,
      row: board.start[0],
      col: board.start[1],
      g: 0,
      h: 0,
      f: 0,
    };
    this.end = {
      parent: null,
      row: board.end[0],
      col: board.end[1],
      g: 0,
      h: 0,
      f: 0,
    };
    this.searchpath = [];
    this.path = [];
  }

  search(): boolean {
    return this.aStar(this.start);
  }

  private aStar(node: Node): boolean {
    this.openlist.push(node);
    while (this.openlist.length > 0) {
      let currentNode = this.openlist[0];
      let currentIndex = 0;
      this.openlist.forEach((openNode, index) => {
        if (openNode.f < currentNode.f) {
          currentNode = openNode;
          currentIndex = index;
        }
      });
      this.openlist.splice(currentIndex, 1);
      this.closelist.push(currentNode);
      this.searchpath.push({ row: currentNode.row, col: currentNode.col });
      if (currentNode) {
        if (this.isAtEnd(currentNode)) {
          let current: Node | null = currentNode;
          while (current) {
            this.path.push({ row: current.row, col: current.col });
            current = current.parent;
          }
          this.path = this.path.reverse();
          return true;
        }
      }
      this.getAdjacentNodes(currentNode);
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
      if (this.isValid(row, col)) {
        const adjacentNode: Node = {
          parent: node,
          row: row,
          col: col,
          g: 0,
          h: 0,
          f: 0,
        };
        adjacentNodes.push(adjacentNode);
      }
    });
    adjacentNodes.forEach((adjNode) => {
      let valid = true;
      this.closelist.forEach((clsNode) => {
        if (adjNode.row === clsNode.row && adjNode.col === clsNode.col) {
          valid = false;
        }
      });
      if (valid) {
        adjNode.g = node.g + 1;
        adjNode.h =
          (adjNode.row - this.end.row) ** 2 + (adjNode.col - this.end.col) ** 2;
        adjNode.f = adjNode.g + adjNode.h;
        valid = true;
        this.openlist.forEach((openNode) => {
          if (
            adjNode.row === openNode.row &&
            adjNode.col === openNode.col &&
            adjNode.g > openNode.g
          ) {
            valid = false;
          }
        });
      }
      if (valid) {
        this.openlist.push(adjNode);
      }
    });
  }
  private isValid(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.board.board.length &&
      col >= 0 &&
      col < this.board.board[0].length &&
      this.board.board[row][col] !== this.board.wall
    );
  }
  private isAtEnd(node: Node): boolean {
    return node.row === this.end.row && node.col === this.end.col;
  }
}
