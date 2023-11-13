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
        define(["require", "exports", "../business/game/GameBusiness", "../middlewares/CustomError", "../games/ludo/Ludo", "../games/monopoly/Monopoly"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameController = void 0;
    const GameBusiness_1 = require("../business/game/GameBusiness");
    const CustomError_1 = require("../middlewares/CustomError");
    const Ludo_1 = require("../games/ludo/Ludo");
    const Monopoly_1 = require("../games/monopoly/Monopoly");
    class GameController {
        constructor() {
            this.getGameStatus = (hash) => __awaiter(this, void 0, void 0, function* () {
                const game = yield this.buildGame(hash);
                const data = game.getStatus();
                return {
                    success: true,
                    message: '',
                    data
                };
            });
            this.moveWithPlayer = (hash, config) => __awaiter(this, void 0, void 0, function* () {
                const game = yield this.buildGame(hash);
                const data = yield game.move(config);
                return {
                    success: true,
                    message: 'Success',
                    data
                };
            });
            this.rollTheDice = (hash) => __awaiter(this, void 0, void 0, function* () {
                const game = yield this.buildGame(hash);
                const data = yield game.rollDice();
                return {
                    success: true,
                    message: 'Success',
                    data
                };
            });
            this.response = {
                success: true,
                message: '',
                data: {}
            };
            this.gameBusiness = new GameBusiness_1.GameBusiness();
        }
        createGame(config) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.gameBusiness.createGame(config);
            });
        }
        buildGame(hash) {
            return __awaiter(this, void 0, void 0, function* () {
                const gameRecord = yield this.gameBusiness.getGameByHash(hash);
                if (!gameRecord) {
                    console.error(gameRecord);
                    throw new CustomError_1.CustomError('A választot játék nem létezik!', 404, true);
                }
                let game;
                switch (gameRecord.type) {
                    case 'ludo':
                        game = new Ludo_1.Ludo(this.gameBusiness);
                        break;
                    case 'monopoly':
                        game = new Monopoly_1.Monopoly(this.gameBusiness);
                        break;
                    default:
                        throw new CustomError_1.CustomError('Game creation failed!', 401, true);
                }
                if (!gameRecord.config) {
                    throw new CustomError_1.CustomError('Game could not be loaded!', 500, true);
                }
                yield game.build(gameRecord.id, gameRecord.config);
                return game;
            });
        }
    }
    exports.GameController = GameController;
});
//# sourceMappingURL=gameController.js.map