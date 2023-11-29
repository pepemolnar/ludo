var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "fs", "../controllers/gameController"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gameRoutes = void 0;
    const express_1 = __importDefault(require("express"));
    const fs = __importStar(require("fs"));
    const gameController_1 = require("../controllers/gameController");
    exports.gameRoutes = express_1.default.Router();
    const gameController = new gameController_1.GameController();
    exports.gameRoutes.get('/', (_req, res) => {
        const content = fs.readFileSync('src/app/game/game.html', 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(content);
    });
    exports.gameRoutes.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const selectedGame = req.body.selectedGame;
        const gameId = yield gameController.createGame(selectedGame);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ gameId });
    }));
    exports.gameRoutes.get('/:hash/roll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = req.params.hash;
        const response = yield gameController.rollTheDice(hash);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    }));
    exports.gameRoutes.post('/:hash/step', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = req.params.hash;
        const respone = yield gameController.moveWithPlayer(hash, req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(respone);
    }));
    exports.gameRoutes.get('/:hash/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = req.params.hash;
        const status = yield gameController.getGameStatus(hash);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(status);
    }));
    exports.gameRoutes.get('/:hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = req.params.hash;
        yield gameController.getGameStatus(hash);
        let content = fs.readFileSync('dist/app/game/games/ludo/ludo.html', 'utf-8');
        content = content.replace('{{hash}}', hash);
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(content);
    }));
});
//# sourceMappingURL=gameRoutes.js.map