var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./homeRoutes", "./gameRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.routes = void 0;
    const express_1 = __importDefault(require("express"));
    const homeRoutes_1 = require("./homeRoutes");
    const gameRoutes_1 = require("./gameRoutes");
    exports.routes = express_1.default.Router();
    exports.routes.use(express_1.default.static('dist/app'));
    exports.routes.use(homeRoutes_1.homeRoutes);
    exports.routes.use('/game', gameRoutes_1.gameRoutes);
});
//# sourceMappingURL=routes.js.map