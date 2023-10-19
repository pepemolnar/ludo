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
    exports.CustomError = void 0;
    class CustomError extends Error {
        constructor(message, statusCode, logging) {
            super(message);
            this.message = message;
            this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
            this.logging = logging !== null && logging !== void 0 ? logging : false;
        }
    }
    exports.CustomError = CustomError;
});
//# sourceMappingURL=CustomError.js.map