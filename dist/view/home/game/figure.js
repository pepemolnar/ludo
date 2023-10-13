(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../types/gameTypes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Figure = void 0;
    const gameTypes_1 = require("../../types/gameTypes");
    class Figure {
        constructor(figure) {
            this.id = figure.id;
            this.color = figure.color;
            this.position = 0;
            this.positionType = gameTypes_1.PositionType.IN_HOUSE;
            this.selectableForMove = false;
            this.stepOutPosition = figure.stepOutPosition;
            this.figureDOM = document.getElementById(`${figure.color}_figure_${figure.id}`);
        }
        moveFigureDOM() {
            let field = document.getElementById(`field_${this.position}`);
            if (this.positionType === gameTypes_1.PositionType.IN_GOAL) {
                field = document.getElementById(`${this.color}_goal_${this.position}`);
            }
            else if (this.positionType === gameTypes_1.PositionType.IN_HOUSE) {
                field = document.getElementById(`${this.color}_house`);
            }
            if (field && this.figureDOM) {
                field === null || field === void 0 ? void 0 : field.appendChild(this.figureDOM);
            }
        }
        setSelectability(selectable) {
            var _a;
            this.selectableForMove = selectable;
            (_a = this.figureDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('selectable', String(selectable));
        }
        step(numberOfSteps, numberOfFields) {
            const newPosition = this.getNewPosition(numberOfSteps, numberOfFields);
            this.position = newPosition.position;
            this.positionType = newPosition.positionType;
            this.moveFigureDOM();
            return newPosition;
        }
        getNewPosition(numberOfSteps, numberOfFields) {
            let newPosition = this.position;
            let positionType = this.positionType;
            if (positionType === gameTypes_1.PositionType.IN_HOUSE) {
                newPosition = this.stepOutPosition;
                positionType = gameTypes_1.PositionType.IN_GAME;
            }
            else {
                for (let i = 0; i < numberOfSteps; i++) {
                    newPosition += 1;
                    if (newPosition > numberOfFields) {
                        newPosition = 1;
                    }
                    if (newPosition === this.stepOutPosition) {
                        newPosition = 1;
                        positionType = gameTypes_1.PositionType.IN_GOAL;
                    }
                }
            }
            return { position: newPosition, positionType };
        }
        canFigureMoveToNewPosition(rolledNumber) {
            if (this.positionType === gameTypes_1.PositionType.IN_HOUSE && rolledNumber !== 6) {
                return false;
            }
            if (this.isFigureStepsOverTheGoals(rolledNumber)) {
                return false;
            }
            return true;
        }
        isFigureStepsOverTheGoals(rolledNumber) {
            if (this.positionType === gameTypes_1.PositionType.IN_GOAL) {
                return this.position + rolledNumber > 4;
            }
            if (this.positionType === gameTypes_1.PositionType.IN_GAME &&
                this.position < this.stepOutPosition) {
                return this.position + rolledNumber > this.stepOutPosition + 4;
            }
            return false;
        }
        stepBackToHouse() {
            this.position = 0;
            this.positionType = gameTypes_1.PositionType.IN_HOUSE;
            this.moveFigureDOM();
        }
    }
    exports.Figure = Figure;
});
