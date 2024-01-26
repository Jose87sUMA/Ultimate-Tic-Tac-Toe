import Game from "./Game";
const UCT_CONSTANT = 1.41
class Node {
    constructor(state, parent = null, depth = 0) {
        this.state = state;
        this.parent = parent;
        this.children = [];
        this.visits = 0;
        this.wins = 0;
        this.depth = depth;
    }

    isFullyExpanded() {
        return this.children.length === this.state.getLegalMoves().length;
    }

    selectChild() {
        return this.children.reduce((selected, child) => (
            child.wins / child.visits +
            UCT_CONSTANT * Math.sqrt(Math.log(this.visits) / child.visits) > selected.score ?
            { score: child.wins / child.visits + UCT_CONSTANT * Math.sqrt(Math.log(this.visits) / child.visits), child } :
            selected
        ), { score: -Infinity, child: null }).child;
    }

    addChild(childState) {
        const childNode = new Node(childState, this);
        this.children.push(childNode);
        return childNode;
    }
}


function monteCarloTreeSearch(rootState, iterations) {
    const rootNode = new Node(rootState);

    for (let i = 0; i < iterations; i++) {
        let node = rootNode;

        // Selection phase
        while (!node.state.isTerminal() && node.isFullyExpanded()) {
            node = node.selectChild();
        }

        // Expansion phase
        if (!node.state.isTerminal()) {
            const legalMoves = node.state.getLegalMoves();
            const untriedMoves = legalMoves.filter(move => !node.children.some(child => child.state === move));
            const randomMove = untriedMoves[Math.floor(Math.random() * untriedMoves.length)];
            const newStateWithRandomMove = node.state.clone();
            newStateWithRandomMove.makeMove(randomMove.smallBoard, randomMove.pos);
            node = node.addChild(newStateWithRandomMove);
        }

        // Simulation phase
        const simulationResult = simulate(node.state);

        // Backpropagation phase
        backpropagate(node, simulationResult);
    }
    console.log(rootNode.children.map(child => console.log(child.wins + '/' + child.visits + ' ' + child.state.boardOfNextMove)));
    const bestChild = rootNode.children.reduce((best, child) => (child.visits > best.visits ? child : best), { visits: -Infinity });
    return bestChild.state;
}

function simulate(state) {
    const game = Game.fromState(state);
    const clonedState = game.clone();

    while (!clonedState.isTerminal()) {
        const legalMoves = clonedState.getLegalMoves();
        const evaluatedMoves = legalMoves.map(move => ({ move, evaluation: evaluateMove(move, clonedState) }));
        const sortedMoves = evaluatedMoves.sort((a, b) => b.evaluation - a.evaluation);
        const selectedMove = sortedMoves[0].move;

        clonedState.makeMove(selectedMove.smallBoard, selectedMove.pos);
    }

    const winner = clonedState.getWinner();
    return winner === game.AISymbol ? 1 : winner === null ? 0 : -1;
}

function evaluateMove(move, state) {
    const clonedState = state.clone();
    clonedState.makeMove(move.smallBoard, move.pos);

    const currentPlayer = clonedState.currentPlayer;
    const opponent = clonedState.previousPlayer;

    // Count potential winning lines for the current player and opponent
    const currentPlayerLines = countPotentialWinningLines(clonedState, currentPlayer);
    const opponentLines = countPotentialWinningLines(clonedState, opponent);

    // Check if the move is in the center of the small board
    const isMoveInCenterB = isMoveInCenter(move);

    // Return a score based on winning lines and center control
    return (currentPlayerLines - opponentLines) + (isMoveInCenterB ? 1 : 0);
}

function countPotentialWinningLines(state, player) {
    // Count potential winning lines for a player in the current state
    const potentialWinningLines = state.bigBoard.reduce((count, smallBoard) => {
        const linesInSmallBoard = countPotentialLinesInBoard(smallBoard, player);
        return count + linesInSmallBoard;
    }, 0);

    return potentialWinningLines;
}

function countPotentialLinesInBoard(board, player) {
    // Count potential winning lines in a small board for a player
    const lines = [
        [board[0], board[1], board[2]],
        [board[3], board[4], board[5]],
        [board[6], board[7], board[8]],
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[2], board[5], board[8]],
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]],
    ];

    return lines.filter(line => line.every(cell => cell === player)).length;
}

function isMoveInCenter(move) {
    // Check if the move is in the center of the small board
    const centerPositions = [1, 3, 5, 7];
    return centerPositions.includes(move.pos);
}


function backpropagate(node, result) {
    while (node !== null) {
        node.visits++;
        node.wins += result * weightBasedOnDepth(node); // Adjust the weight based on the depth of the node
        node = node.parent;
    }
}

function weightBasedOnDepth(node) {
    // Example: Assign a weight based on the depth of the node
    // You may need to adjust this based on the characteristics of your game
    const maxDepth = findMaxDepth(node);

    // Linearly decrease the weight as the depth increases
    const weight = 1 - (node.depth / maxDepth);
    
    // Ensure the weight is never less than a certain threshold
    const minWeight = 0.1;
    return Math.max(weight, minWeight);
}

function findMaxDepth(node) {
    // Recursively find the maximum depth in the tree
    if (!node) return 0;
    const childrenDepths = node.children.map(child => findMaxDepth(child));
    return 1 + Math.max(...childrenDepths);
}


export default monteCarloTreeSearch;
