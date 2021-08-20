import Board from "./board.js";
import { EasyMode } from "./easy.js";
import { MediumMode } from "./medium.js";
import { HardMode } from "./hard.js";
import { winningConditions } from "./winningConditions.js";

class Game {
    fields;
    activePlayer;
    gameActive;

    currentMode = null //nul = pvp
    doesAIsMoveFirst = false;

    constructor() {
        this.board = new Board(
            this.handleItemClick, 
            this.handleReset,
            this.handleModeChange );
        this.setDefaults();
    }

    setDefaults = (isAIsMove) => {
        this.fields = ["", "", "", "", "", "", "", "", ""];
        this.activePlayer = "X";
        this.gameActive = true;
        this.doesAIsMoveFirst = isAIsMove !== undefined ? isAIsMove : false;
    }

    validateGame = () => {
        let gameWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [posA, posB, posC] = winningConditions[i];
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];

            if (value1 !== "" && value1 === value2 && value1 === value3) {
                gameWon = true;
                break;
            }
        }
        if (gameWon) {
            this.gameActive = false;
            this.board.displayWinMessage(this.activePlayer);
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.board.displayDrawMessage();
        }
    }

    isBoardFull = () => {
        return this.fields.find(el => el === "") === undefined;
    }

    getModeClassForName = name => {
        if(name === "easy") return new EasyMode();
        if(name === "medium") return new MediumMode();
        if(name === "hard") return new HardMode();
        return null
    }

    handleModeChange = e => {
        this.currentMode = this.getModeClassForName(e.target.value);
        this.setDefaults(false);
        this.board.resetBoard();
    }

    handleReset = () => {
        this.setDefaults(!this.doesAIsMoveFirst);
        this.AIsFirstMove();
    }

    AIsFirstMove = () => {
        if(this.doesAIsMoveFirst && this.currentMode !== null){
            this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
        }
    }

    handleItemClick = e => {
        const { pos } = e.target.dataset;
        if (this.gameActive && this.fields[pos] === "") {
            this.makeMove(pos);

            if(this.gameActive && this.currentMode !== null) {
                this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
            }
        }
    }

    makeMove = position => {
        this.fields[position] = this.activePlayer;
            this.board.getFieldForPosition(position).classList.add(`board__item--filled-${this.activePlayer}`);
            this.validateGame();
            this.activePlayer = this.activePlayer === "X" ? "O" : "X";
            this.board.setCurrentPlayer(this.activePlayer);
    }
}





const game = new Game();