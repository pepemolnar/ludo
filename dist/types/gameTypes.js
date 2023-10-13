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
    exports.PositionType = void 0;
    var PositionType;
    (function (PositionType) {
        PositionType[PositionType["IN_HOUSE"] = 0] = "IN_HOUSE";
        PositionType[PositionType["IN_GAME"] = 1] = "IN_GAME";
        PositionType[PositionType["IN_GOAL"] = 2] = "IN_GOAL";
    })(PositionType || (exports.PositionType = PositionType = {}));
});
