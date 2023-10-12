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
            this.selectableForMove = false;
            this.stepOutPosition = figure.stepOutPosition;
            this.figureDOM = document.getElementById(`${figure.color}_figure_${figure.id}`);
        }
        moveFigureDOM() {
            const field = document.getElementById(`field_${this.position}`);
            if (field && this.figureDOM) {
                field === null || field === void 0 ? void 0 : field.appendChild(this.figureDOM);
            }
        }
        setSelectability(selectable) {
            var _a;
            this.selectableForMove = selectable;
            (_a = this.figureDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('selectable', String(selectable));
        }
        step(numberOfSteps) {
            if (this.position === 0) {
                this.position = this.stepOutPosition;
            }
            else {
                this.position += numberOfSteps;
            }
            this.moveFigureDOM();
        }
        isFigureSelectable(rolledNumber) {
            if (this.position > 0 || rolledNumber === 6) {
                return true;
            }
            return false;
        }
    }
    exports.Figure = Figure;
});
