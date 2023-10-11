"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes/routes");
const GlobalErrorHandler_1 = require("./middlewares/GlobalErrorHandler");
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const ip = (_b = process.env.IP) !== null && _b !== void 0 ? _b : '127.0.0.1';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(routes_1.routes);
app.use(GlobalErrorHandler_1.globalErrorHandler);
app.listen(Number(port), ip, () => {
    console.log(`Server is running on port ${port}`);
});
