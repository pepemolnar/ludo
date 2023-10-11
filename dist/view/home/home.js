"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
window.onload = (event) => {
    const game = new game_1.Game(['RED', 'BLUE', 'GREEN', 'YELLOW']);
    const rollButtonDOM = document.getElementById('roll_button');
    rollButtonDOM === null || rollButtonDOM === void 0 ? void 0 : rollButtonDOM.addEventListener('click', () => {
        game.rollTheDice();
    });
};
