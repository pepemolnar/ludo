(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./player"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    const player_1 = require("./player");
    class Game {
        constructor(game) {
            this.rollButtonDOM = document.getElementById('roll_button');
            this.numberOfFields = game.numberOfFields;
            this.createPlayers(game.players);
            this.start();
        }
        start() {
            this.players[this.activePlayerIndex].setActivity(true);
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
        activateNextPlayer() {
            this.players[this.activePlayerIndex].setActivity(false);
            if (this.activePlayerIndex === this.players.length - 1) {
                this.activePlayerIndex = -1;
            }
            this.activePlayerIndex += 1;
            this.players[this.activePlayerIndex].setActivity(true);
            this.setDiceActivity(true);
        }
        setDiceActivity(active) {
            var _a;
            (_a = this.rollButtonDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', String(active));
        }
        rollTheDice() {
            const selectableFigureCount = this.players[this.activePlayerIndex].rollTheDice();
            this.setDiceActivity(false);
            if (!selectableFigureCount) {
                this.activateNextPlayer();
            }
        }
        selectFigureToMove(figureId) {
            this.players[this.activePlayerIndex].stepWithFigure(figureId, this.numberOfFields);
            this.activateNextPlayer();
        }
    }
    exports.Game = Game;
});
