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
    exports.GAME_CONFIG = void 0;
    const playerConstants_1 = require("./playerConstants");
    exports.GAME_CONFIG = {
        players: playerConstants_1.PLAYERS,
        numberOfFields: 16
    };
});
