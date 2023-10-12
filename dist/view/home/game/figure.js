(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Figure = void 0;
    class Figure {
        constructor(figure) {
            this.id = figure.id;
            this.color = figure.color;
            this.position = 0;
            this.inGoal = false;
            this.selectableForMove = false;
            this.stepOutPosition = figure.stepOutPosition;
            this.figureDOM = document.getElementById(`${figure.color}_figure_${figure.id}`);
        }
        moveFigureDOM() {
            let field = document.getElementById(`field_${this.position}`);
            if (this.inGoal) {
                field = document.getElementById(`${this.color}_goal_${this.position}`);
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
            if (this.position === 0) {
                this.position = this.stepOutPosition;
            }
            else {
                for (let i = 0; i < numberOfSteps; i++) {
                    this.position += 1;
                    if (this.position > numberOfFields) {
                        this.position = 1;
                    }
                    if (this.position === this.stepOutPosition) {
                        this.position = 1;
                        this.inGoal = true;
                    }
                }
            }
            this.moveFigureDOM();
        }
        isFigureSelectable(rolledNumber) {
            if (this.position > 0 || rolledNumber === 6) {
                if (this.isFigureStepsOverTheGoals(rolledNumber)) {
                    return false;
                }
                return true;
            }
            return false;
        }
        isFigureStepsOverTheGoals(rolledNumber) {
            if (this.inGoal) {
                return this.position + rolledNumber > 4;
            }
            if (this.position < this.stepOutPosition) {
                return this.position + rolledNumber > this.stepOutPosition + 4;
            }
            return false;
        }
    }
    exports.Figure = Figure;
});
