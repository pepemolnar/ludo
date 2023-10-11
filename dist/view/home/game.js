"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const player_1 = require("./player");
class Game {
    constructor(colors) {
        this.rollButtonDOM = document.getElementById('roll_button');
        this.createPlayers(colors);
        this.start();
    }
    createPlayers(colors) {
        const players = [];
        for (let i = 0; i < colors.length; i++) {
            const player = new player_1.Player(colors[i]);
            players.push(player);
        }
        this.players = players;
    }
    start() {
        this.activateNextPlayer();
        this.activateDice();
    }
    activateNextPlayer() {
        const activePlayerIndex = this.getActivePlayerIndex();
        this.players[activePlayerIndex].setActivity(false);
        if (activePlayerIndex === this.players.length - 1) {
            this.players[0].setActivity(true);
            return;
        }
        this.players[activePlayerIndex + 1].active = true;
    }
    getActivePlayerIndex() {
        this.players.findIndex((player) => {
            return player.active;
        });
        return this.players.length - 1;
    }
    activateDice() {
        var _a;
        (_a = this.rollButtonDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', 'true');
    }
    rollTheDice() {
        const rolledNumberDOM = document.getElementById('rolled_number');
        if (!rolledNumberDOM) {
            console.log('Cannot set rolled number!');
            return;
        }
        const rolledNumber = Math.round(Math.random() * 5 + 1);
        rolledNumberDOM.innerHTML = String(rolledNumber);
        this.activateNextPlayer();
    }
}
exports.Game = Game;
