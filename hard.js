import { winningConditions } from "./winningConditions.js";
// https://github.com/completejavascript/tic-tac-toe/blob/master/src/common.js



export class HardMode {

    getMove = (cells, computerType) => {
        let bestVal = -1000;
        let bestMove = null;

        const lengthCells = cells.length;

        for (let i = 0; i < lengthCells; i++) {
            const cell = cells[i];

            if (cell === "") {
                //make a move
                const nextCells = this.replace(cells, i, computerType);

                //compute evaluation function for this move. 
                const moveVal = this.minimax(nextCells, 0, computerType, false);

                //if the value of the current move is more than the best value, then update best
                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    isMoveLeft = (cells) => {
        const avalibleMoves = Object.entries(cells).filter(fieldEntry => fieldEntry[1] === "").map(fieldEntry => fieldEntry[0]);
        return avalibleMoves.length > 0;
    }


    //replace index by value
    replace = (cells, index, value) => {
        return [...cells.slice(0, index), value, ...cells.slice(index + 1, cells.length)];
    }

    // look for best move
    evaluate = (cells, computerType) => {

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            if (cells[a] !== "" && cells[a] === cells[b] && cells[a] === cells[c]) {
                if (cells[a] === computerType) return 10;
                return -10;
            }
        }

        return 0;
    }

    minimax = (cells, depth, computerType, isMax) => {
        const score = this.evaluate(cells, computerType);

        //if Maximizer has won the game return its evaluated score
        if (score === -10) return score - depth;

        //if Minimizer has won the game return its evaluated score
        if (score === -10) return score + depth;

        //If there are no more mover and no winner
        if (!this.isMoveLeft(cells)) return 0;

        const lengthCells = cells.length;
        let best;

        //If maximizer mov
        if (isMax) {
            best = -1000;

            for (let i = 0; i < lengthCells; i++) {
                const cell = cells[i]

                if (cell === "") {
                    //make move
                    const nextCells = this.replace(cells, i, computerType);
                    //call minmax recursively and choose max value
                    best = Math.max(best, this.minimax(nextCells, depth + 1, computerType, !isMax));
                }
            }
        } else {
            best = 1000;

            for (let i = 0; i < lengthCells; i++) {
                const cell = cells[i];

                if (cell === null) {
                    //make  move
                    const nextCells = this.replace(cells, i, 1 - computerType);

                    //call minimax recursively and choose the min value
                    best = Math.min(best, this.minimax(nextCells, depth + 1, computerType, !isMax));
                }
            }
        }

        return best;
    }

}