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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "../controllers/gameController", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gameRoutes = void 0;
    const express_1 = __importDefault(require("express"));
    const gameController_1 = require("../controllers/gameController");
    const fs = __importStar(require("fs"));
    exports.gameRoutes = express_1.default.Router();
    exports.gameRoutes.get('/', (req, res) => {
        console.log('asfd');
        const content = fs.readFileSync('src/app/game/game.html', 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(content);
    });
    exports.gameRoutes.get('/new', (req, res) => {
        const gameId = (0, gameController_1.createGame)();
        res.status(200).json({ gameId });
        // const gameStatus = getGameStatus(gameID);
    });
    exports.gameRoutes.get('/:gameId', (req, res) => {
        const gameId = req.params.gameId;
        let content = fs.readFileSync('dist/app/game/games/ludo/ludo.html', 'utf-8');
        content = content.replace('{{gameId}}', gameId);
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(content);
    });
    exports.gameRoutes.get('/:gameId/roll', (req, res) => {
        const response = (0, gameController_1.rollTheDice)();
        res.setHeader('Content-Type', 'text/html');
        res.status(200).json(response);
    });
    exports.gameRoutes.post('/:gameId/step', (req, res) => {
        const winner = String(req.query.gameID);
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`<h1>Winner is ${winner}</h1>`);
    });
});
