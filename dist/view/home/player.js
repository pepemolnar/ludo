"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const figure_1 = require("./figure");
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["INGAME"] = 0] = "INGAME";
    PlayerStatus[PlayerStatus["DONE"] = 1] = "DONE";
})(PlayerStatus || (PlayerStatus = {}));
class Player {
    constructor(color) {
        this.color = color;
        this.active = false;
        this.status = PlayerStatus.INGAME;
        this.playerHouseDOM = document.getElementById(`${this.color.toLowerCase()}-house`);
        this.createFigures();
    }
    isActive() {
        return this.active;
    }
    setActivity(status) {
        var _a;
        this.active = status;
        (_a = this.playerHouseDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', String(status));
    }
    createFigures() {
        for (let i = 0; i < 4; i++) {
            this.figures.push(new figure_1.Figure(this.color, i));
        }
    }
}
exports.Player = Player;
