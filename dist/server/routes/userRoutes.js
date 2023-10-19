var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "../controllers/userController"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userRoutes = void 0;
    /* eslint-disable @typescript-eslint/no-misused-promises */
    const express_1 = __importDefault(require("express"));
    const userController_1 = require("../controllers/userController");
    exports.userRoutes = express_1.default.Router();
    exports.userRoutes.get('/:id', userController_1.getUserById);
    exports.userRoutes.post('/new', userController_1.addUser);
});
//# sourceMappingURL=userRoutes.js.map