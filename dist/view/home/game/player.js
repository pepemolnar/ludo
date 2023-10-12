(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./figure"], factory);
    }
})(function (require, exports) {
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
        constructor(player) {
            this.color = player.color;
            this.active = false;
            this.figures = [];
            this.rolledNumber = 0;
            this.status = PlayerStatus.INGAME;
            this.startPosition = player.startPosition;
            this.playerHouseDOM = document.getElementById(`${this.color.toLowerCase()}_house`);
            this.createFigures();
        }
        isActive() {
            return this.active;
        }
        setActivity(active) {
            var _a;
            this.active = active;
            (_a = this.playerHouseDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', String(active));
        }
        createFigures() {
            for (let i = 0; i < 4; i++) {
                const figure = {
                    id: i,
                    position: 0,
                    color: this.color,
                    stepOutPosition: this.startPosition
                };
                this.figures.push(new figure_1.Figure(figure));
            }
        }
        setFiguresSelectability() {
            let selectableFigureCount = 0;
            for (const figure of this.figures) {
                if (this.active && figure.isFigureSelectable(this.rolledNumber)) {
                    figure.setSelectability(true);
                    selectableFigureCount += 1;
                }
            }
            return selectableFigureCount;
        }
        rollTheDice() {
            const rolledNumber = Math.round(Math.random() * 5 + 1);
            this.rolledNumber = rolledNumber;
            this.setRolledNumberDOM(rolledNumber);
            return this.setFiguresSelectability();
        }
        stepWithFigure(figureId) {
            const figure = this.figures.find((figure) => figure.id === figureId);
            if (!figure) {
                console.log('Figure selected does not exists!');
                return;
            }
            figure.step(this.rolledNumber);
            this.removeSelectabilityFromFigures();
        }
        setRolledNumberDOM(rolledNumber) {
            const rolledNumberDOM = document.getElementById('rolled_number');
            if (!rolledNumberDOM) {
                console.log('Cannot set rolled number!');
                return;
            }
            rolledNumberDOM.innerHTML = String(rolledNumber);
        }
        removeSelectabilityFromFigures() {
            for (const figure of this.figures) {
                figure.setSelectability(false);
            }
        }
    }
    exports.Player = Player;
});
