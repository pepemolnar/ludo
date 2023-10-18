(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Figure"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    const Figure_1 = require("./Figure");
    class Player {
        constructor(player) {
            this.id = player.id;
            this.color = player.color;
            this.active = player.active;
            this.playerDOM = document.getElementById(`${player.color}_house`);
            this.figures = [];
            this.setActivity(player.active);
            this.createFigures(player.figures);
        }
        setActivity(isActive) {
            this.active = isActive;
            this.playerDOM.setAttribute('active', String(isActive));
            if (!isActive) {
                this.setFiguresSelectability(false);
            }
        }
        makeFiguresSelectable(selectableFigureIds) {
            for (const figure of this.figures) {
                if (selectableFigureIds.includes(figure.id)) {
                    figure.setSelectability(true);
                }
            }
        }
        createFigures(figureStatuses) {
            for (const figureStatuse of figureStatuses) {
                const newFigure = new Figure_1.Figure(this.color, figureStatuse);
                this.figures.push(newFigure);
            }
        }
        moveFigure(figureId, position, positionType) {
            const figure = this.getFigure(figureId);
            figure === null || figure === void 0 ? void 0 : figure.move(position, positionType, this.color);
        }
        getFigure(figureId) {
            const figure = this.figures.find((figure) => figure.id === figureId);
            if (!figure) {
                console.error('Figure not found!');
            }
            return figure;
        }
        setFiguresSelectability(isSelectable) {
            for (const figure of this.figures) {
                figure.setSelectability(false);
            }
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map