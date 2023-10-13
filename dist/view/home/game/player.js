(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../types/gameTypes", "./figure"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    const gameTypes_1 = require("../../types/gameTypes");
    const figure_1 = require("./figure");
    class Player {
        constructor(player) {
            this.color = player.color;
            this.active = false;
            this.figures = [];
            this.startPosition = player.startPosition;
            this.playerHouseDOM = document.getElementById(`${this.color.toLowerCase()}_house`);
            this.createFigures();
        }
        isActive() {
            return this.active;
        }
        activate() {
            this.setActivity(true);
        }
        deactivate() {
            this.removeSelectabilityFromFigures();
            this.setActivity(false);
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
        getIndexOfSelectableFiguresToMove(rolledNumber, numberOfFields) {
            const indexOfSelectableFiguresToMove = [];
            for (const figure of this.figures) {
                const figureCanMove = figure.canFigureMoveToNewPosition(rolledNumber);
                const newPosition = figure.getNewPosition(rolledNumber, numberOfFields);
                const figuresNewPositionInGoalIsAlreadyTaken = newPosition.positionType === gameTypes_1.PositionType.IN_GOAL &&
                    this.isGoalPositionTaken(newPosition.position);
                if (figureCanMove && !figuresNewPositionInGoalIsAlreadyTaken) {
                    figure.setSelectability(true);
                    indexOfSelectableFiguresToMove.push(figure.id);
                }
            }
            return indexOfSelectableFiguresToMove;
        }
        activateFiguresByIndex(indexOfSelectableFiguresToMove) {
            for (const figureIndex of indexOfSelectableFiguresToMove) {
                this.figures[figureIndex].setSelectability(true);
            }
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
        isGoalPositionTaken(position) {
            for (const figure of this.figures) {
                if (figure.positionType === gameTypes_1.PositionType.IN_GOAL &&
                    figure.position === position) {
                    return true;
                }
            }
            return false;
        }
        getFigurePositions() {
            return this.figures.map((figure) => {
                return { position: figure.position, positionType: figure.positionType };
            });
        }
    }
    exports.Player = Player;
});
