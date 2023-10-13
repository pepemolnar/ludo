var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@prisma/client", "../middlewares/CustomError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addUser = exports.getUserById = void 0;
    const client_1 = require("@prisma/client");
    const CustomError_1 = require("../middlewares/CustomError");
    const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const id = Number(req.params.id);
        const user = yield prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new CustomError_1.CustomError('Ez az ID nem létezik!', 404, true);
        }
        res.status(200).json(user);
    });
    exports.getUserById = getUserById;
    const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { name, age } = req.body;
        const user = yield prisma.user.create({
            data: { name, age: Number(age) }
        });
        res.status(200).json(user);
    });
    exports.addUser = addUser;
});
