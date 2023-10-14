(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Player"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ludo = void 0;
    const Player_1 = require("./Player");
    class Ludo {
        constructor(players) {
            this.createPlayers(players);
            this.activatePlayer(0);
        }
        activateNextPlayer() {
            let nextPlayerIndex = this.activePlayerIndex + 1;
            this.players[this.activePlayerIndex].setActivity(false);
            if (nextPlayerIndex >= this.players.length) {
                nextPlayerIndex = 0;
            }
            this.activatePlayer(nextPlayerIndex);
            this.activePlayerIndex = nextPlayerIndex;
        }
        makeFiguresSelectable(figures) {
            console.log(figures);
        }
        activatePlayer(playerIndex) {
            this.players[playerIndex].setActivity(true);
            this.activePlayerIndex = playerIndex;
        }
        createPlayers(players) {
            this.players = [];
            for (const player of players) {
                const newPlayer = new Player_1.Player(player);
                this.players.push(newPlayer);
            }
        }
    }
    exports.Ludo = Ludo;
});
