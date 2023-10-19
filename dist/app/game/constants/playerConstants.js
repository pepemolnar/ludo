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
    exports.PLAYER_COLORS = void 0;
    exports.PLAYER_COLORS = [
        {
            name: 'red',
            hex: '#d80000'
        },
        {
            name: 'blue',
            hex: '#201cff'
        },
        {
            name: 'green',
            hex: '#19d400'
        },
        {
            name: 'yellow',
            hex: '#fff831'
        }
    ];
});
//# sourceMappingURL=playerConstants.js.map