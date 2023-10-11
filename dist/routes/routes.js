"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const home_1 = require("./home");
const user_1 = require("./user");
exports.routes = express_1.default.Router();
exports.routes.use(home_1.homeRoutes);
exports.routes.use('/user', user_1.userRoutes);
exports.routes.use(express_1.default.static('dist/view'));
