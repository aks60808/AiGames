import { Board } from "../board";
interface Node {
    row: number;
    col: number;
    visited: boolean;
}

export default class BFS {
    board: Board;
    start: Node;
    end: Node;
    visitedNodes: Map<Node, Node>;
    num: number;
    
    constructor(board: Board) {
        this.board = board;
        this.visitedNodes = new Map();
        this.start = {
            row: board.start[0],
            col: board.start[1],
            visited: false
        };
        this.end = {
            row: board.end[0],
            col: board.end[1],
            visited: false
        };
        this.num =6;
    }
    
    search(): boolean {
        return this.bfs(this.start);
    }
    
    private bfs(node: Node): boolean {
        const queue = [node];
        while (queue.length > 0) {
            const currentNode = queue.shift() as Node;
            if (this.isAtEnd(currentNode)) {
                let current = currentNode;
                while (current !== undefined && (current.row !== this.start.row || current.col !== this.start.col)) {
                    current = this.visitedNodes.get(current) as Node;
                }
                return true;
            }
    
            this.board.setVisted(currentNode.row, currentNode.col, 1);
            const adjacentNodes = this.getAdjacentNodes(currentNode);
            for (const adjacentNode of adjacentNodes) {
                this.visitedNodes.set(adjacentNode, currentNode);
                queue.push(adjacentNode);
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
            [row, col + 1]
        ];
        adjacentCoords.forEach(([row, col]) => {
            if (this.isValid(row, col) && !this.isVisited(row, col)) {
                const adjacentNode: Node = {
                    row,
                    col,
                    visited: false
                };
                adjacentNodes.push(adjacentNode);
            }
        });
        return adjacentNodes;
    }
    
    private isValid(row: number, col: number): boolean {
        return row >= 0 && row < this.board.board.length 
        && col >= 0 && col < this.board.board[0].length 
        && this.board.board[row][col] !== 5;
    }
    
    private isVisited(row: number, col: number): boolean {
        return Array.from(this.visitedNodes.keys()).some(node => node.row === row && node.col === col);
    }
    
    private isAtEnd(node: Node): boolean {
        return node.row === this.end.row && node.col === this.end.col;
    }
}