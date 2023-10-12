(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../constants/playerConstants", "./game/game"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const playerConstants_1 = require("../constants/playerConstants");
    const game_1 = require("./game/game");
    window.onload = (event) => {
        const game = new game_1.Game(playerConstants_1.PLAYERS);
        const rollButtonDOM = document.getElementById('roll_button');
        const figuresDOM = document.querySelectorAll('.figure');
        rollButtonDOM === null || rollButtonDOM === void 0 ? void 0 : rollButtonDOM.addEventListener('click', () => {
            game.rollTheDice();
        });
        figuresDOM.forEach((item) => {
            item.addEventListener('click', (event) => {
                const figureId = Number(item.getAttribute('data-number'));
                const playerColor = String(item.getAttribute('data-color'));
                game.selectFigureToMove(playerColor, figureId);
            });
        });
    };
});
