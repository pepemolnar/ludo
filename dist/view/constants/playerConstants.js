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
    exports.PLAYERS_24 = exports.PLAYERS_20 = exports.PLAYERS_16 = void 0;
    exports.PLAYERS_16 = [
        {
            color: 'red',
            startPosition: 1
        },
        {
            color: 'blue',
            startPosition: 5
        },
        {
            color: 'green',
            startPosition: 11
        },
        {
            color: 'yellow',
            startPosition: 13
        }
    ];
    exports.PLAYERS_20 = [
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
    exports.PLAYERS_24 = [
        {
            color: 'red',
            startPosition: 1
        },
        {
            color: 'blue',
            startPosition: 7
        },
        {
            color: 'green',
            startPosition: 12
        },
        {
            color: 'yellow',
            startPosition: 18
        }
    ];
});
