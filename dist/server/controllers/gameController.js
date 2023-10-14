(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "uuid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rollTheDice = exports.stepWithFigure = exports.getGameStatus = exports.createGame = void 0;
    const uuid_1 = require("uuid");
    const createGame = () => {
        const gameID = (0, uuid_1.v4)();
        // const game = new Game(GAME_CONFIG);
        return gameID;
    };
    exports.createGame = createGame;
    const getGameStatus = (gameID) => {
        return {};
    };
    exports.getGameStatus = getGameStatus;
    const stepWithFigure = () => { };
    exports.stepWithFigure = stepWithFigure;
    const rollTheDice = () => {
        const rolledNumber = Math.round(Math.random() * 5 + 1);
        const isRoundOver = true;
        const selectableFigures = [];
        return {
            success: true,
            message: 'Success',
            data: {
                rolledNumber,
                isRoundOver,
                selectableFigures
            }
        };
    };
    exports.rollTheDice = rollTheDice;
});
