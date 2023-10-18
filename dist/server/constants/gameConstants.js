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
        hash: '52029830-b125-4f3f-8e54-d61e26fdf068',
        type: 'ludo',
        playerConfigs: playerConstants_1.PLAYERS,
        config: {
            numberOfFields: 16
        }
    };
});
//# sourceMappingURL=gameConstants.js.map