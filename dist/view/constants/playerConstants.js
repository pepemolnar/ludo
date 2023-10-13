(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PLAYERS = void 0;
    exports.PLAYERS = [
        {
            color: 'red',
            startPosition: 1
        },
        {
            color: 'blue',
            startPosition: 6
        },
        {
            color: 'green',
            startPosition: 11
        },
        {
            color: 'yellow',
            startPosition: 16
        }
    ];
});
