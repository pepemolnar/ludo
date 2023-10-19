var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "uuid", "../business/game/Ludo", "../constants/playerConstants", "../business/game/GameBusiness"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rollTheDice = exports.stepWithFigure = exports.getGameStatus = exports.createGame = void 0;
    const uuid_1 = require("uuid");
    const Ludo_1 = require("../business/game/Ludo");
    const playerConstants_1 = require("../constants/playerConstants");
    const GameBusiness_1 = require("../business/game/GameBusiness");
    const createGame = () => __awaiter(void 0, void 0, void 0, function* () {
        const hash = (0, uuid_1.v4)();
        const gameBusiness = new GameBusiness_1.GameBusiness();
        yield gameBusiness.createGame({
            hash,
            type: 'ludo',
            playerConfigs: playerConstants_1.PLAYERS,
            config: {
                numberOfFields: 16,
                stepOutFields: {
                    red: 1,
                    blue: 5,
                    green: 9,
                    yellow: 13
                }
            }
        });
        return hash;
    });
    exports.createGame = createGame;
    const getGameStatus = (hash) => __awaiter(void 0, void 0, void 0, function* () {
        const ludo = new Ludo_1.Ludo(new GameBusiness_1.GameBusiness());
        yield ludo.build(hash);
        const data = ludo.getStatus();
        return {
            success: true,
            message: '',
            data
        };
    });
    exports.getGameStatus = getGameStatus;
    const stepWithFigure = (hash, figureId) => __awaiter(void 0, void 0, void 0, function* () {
        const ludo = new Ludo_1.Ludo(new GameBusiness_1.GameBusiness());
        yield ludo.build(hash);
        const data = yield ludo.selectFigureToMove(figureId);
        return {
            success: true,
            message: 'Success',
            data
        };
    });
    exports.stepWithFigure = stepWithFigure;
    const rollTheDice = (hash) => __awaiter(void 0, void 0, void 0, function* () {
        const ludo = new Ludo_1.Ludo(new GameBusiness_1.GameBusiness());
        yield ludo.build(hash);
        const data = yield ludo.rollTheDice();
        return {
            success: true,
            message: 'Success',
            data
        };
    });
    exports.rollTheDice = rollTheDice;
});
//# sourceMappingURL=gameController.js.map