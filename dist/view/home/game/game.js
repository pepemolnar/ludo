(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../types/gameTypes", "./player"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    const gameTypes_1 = require("../../types/gameTypes");
    const player_1 = require("./player");
    class Game {
        constructor(game) {
            this.rollButtonDOM = document.getElementById('roll_button');
            this.rolledNumberDOM = document.getElementById('rolled_number');
            this.numberOfFields = game.numberOfFields;
            this.createPlayers(game.players);
            this.start();
        }
        start() {
            this.players[this.activePlayerIndex].activate();
            this.setDiceActivity(true);
        }
        createPlayers(players) {
            const newPlayers = [];
            for (let i = 0; i < players.length; i++) {
                const newPlayer = new player_1.Player(players[i]);
                newPlayers.push(newPlayer);
            }
            this.players = newPlayers;
            this.activePlayerIndex = 0;
        }
        setDiceActivity(active) {
            this.rollButtonDOM.setAttribute('active', String(active));
        }
        setRolledNumber(rolledNumber) {
            this.rolledNumber = rolledNumber;
            this.rolledNumberDOM.textContent = String(rolledNumber);
        }
        activateNextPlayer() {
            this.players[this.activePlayerIndex].deactivate();
            if (this.activePlayerIndex === this.players.length - 1) {
                this.activePlayerIndex = -1;
            }
            this.activePlayerIndex += 1;
            this.players[this.activePlayerIndex].activate();
            this.setDiceActivity(true);
        }
        getRollResult() {
            return Math.round(Math.random() * 5 + 1);
        }
        rollTheDice() {
            const rolledNumber = this.getRollResult();
            const activePlayer = this.players[this.activePlayerIndex];
            const indexOfSelectableFiguresToMove = activePlayer.getIndexOfSelectableFiguresToMove(rolledNumber, this.numberOfFields);
            this.setDiceActivity(false);
            this.setRolledNumber(rolledNumber);
            if (!indexOfSelectableFiguresToMove.length) {
                this.activateNextPlayer();
                return;
            }
            activePlayer.activateFiguresByIndex(indexOfSelectableFiguresToMove);
        }
        selectFigureToMove(figureId) {
            const player = this.players[this.activePlayerIndex];
            const figure = player.figures.find((figure) => figure.id === figureId);
            if (!figure) {
                console.log('Figure selected does not exists!');
                return;
            }
            const newPosition = figure.step(this.rolledNumber, this.numberOfFields);
            if (newPosition.positionType === gameTypes_1.PositionType.IN_GAME) {
                this.hitOpponentFiguresFromPosition(newPosition);
            }
            player.removeSelectabilityFromFigures();
            this.checkIfPlayerWon();
            this.activateNextPlayer();
        }
        hitOpponentFiguresFromPosition(position) {
            const activePlayer = this.players[this.activePlayerIndex];
            for (const player of this.players) {
                if (player === activePlayer) {
                    continue;
                }
                for (const figure of player.figures) {
                    if (figure.positionType === gameTypes_1.PositionType.IN_GAME &&
                        figure.position === position.position) {
                        figure.stepBackToHouse();
                    }
                }
            }
        }
        checkIfPlayerWon() {
            const activePlayer = this.players[this.activePlayerIndex];
            for (const figure of activePlayer.figures) {
                if (figure.positionType !== gameTypes_1.PositionType.IN_GOAL) {
                    return;
                }
            }
            this.gameOver();
        }
        gameOver() {
            window.location.href = `/game-over?winner=${this.players[this.activePlayerIndex].color}`;
        }
    }
    exports.Game = Game;
});
