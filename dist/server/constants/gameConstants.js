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
    exports.DUMMY_CREATE_LUDO_CONFIG = void 0;
    const playerConstants_1 = require("./playerConstants");
    exports.DUMMY_CREATE_LUDO_CONFIG = {
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
    };
});
//# sourceMappingURL=gameConstants.js.map