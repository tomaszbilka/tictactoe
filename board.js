class Board {
    fieldsElements = document.querySelectorAll(".board__item");
    panel = document.querySelector(".panel");
    button = document.querySelector(".reset-button");
    modeSelect = document.querySelector("#mode-select");
    currentPlayer = document.querySelector("#current-player");

    constructor(onItemClick, onButtonClick, onModeChange) {
        this.onButtonClick = onButtonClick;
        this.button.addEventListener("click", this.handleButtonClick);
        this.fieldsElements.forEach(el => el.addEventListener("click", onItemClick));
        this.modeSelect.addEventListener("change", onModeChange );
        this.setCurrentPlayer("X");
    }

    setCurrentPlayer = (player) => {
        this.currentPlayer.innerHTML = player;
    }

    handleButtonClick = () => {
        this.resetBoard();
        this.onButtonClick();
    }

    resetBoard = () => {
        this.resetBoardClasses();
        this.clearMessage();
        this.setCurrentPlayer("X");
    }

    resetBoardClasses = () => {
        this.fieldsElements.forEach(el => {
            el.classList.remove("board__item--filled-X", "board__item--filled-O");
        });
    }

    getFieldForPosition = position => {
        return this.fieldsElements[position];
    }

    displayWinMessage = (activePlayer) => {
        this.panel.innerHTML = `Gratulacje! ${activePlayer} wygrał!`
    }

    displayDrawMessage = () => {
        this.panel.innerHTML = "Remis!";
    }

    clearMessage = () => {
        this.panel.innerHTML = "";
    }
}

export default Board;
