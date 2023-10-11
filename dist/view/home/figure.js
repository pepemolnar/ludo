"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = void 0;
class Figure {
    constructor(color, id) {
        this.position = 0;
        this.selectableForMove = true;
        this.figureDOM = document.getElementById(`${color}-figure-${id}`);
    }
}
exports.Figure = Figure;
