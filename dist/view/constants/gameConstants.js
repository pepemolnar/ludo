(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./playerConstants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GAME_CONFIG_24 = exports.GAME_CONFIG_20 = exports.GAME_CONFIG_16 = void 0;
    const playerConstants_1 = require("./playerConstants");
    exports.GAME_CONFIG_16 = {
        players: playerConstants_1.PLAYERS_16,
        numberOfFields: 16
    };
    exports.GAME_CONFIG_20 = {
        players: playerConstants_1.PLAYERS_20,
        numberOfFields: 20
    };
    exports.GAME_CONFIG_24 = {
        players: playerConstants_1.PLAYERS_24,
        numberOfFields: 24
    };
});
