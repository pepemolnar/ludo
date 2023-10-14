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
    exports.Player = void 0;
    class Player {
        constructor(player) {
            this.color = player.color;
            this.active = false;
            this.playerDOM = document.getElementById(`${player.color.name}_house`);
        }
        setActivity(isActive) {
            this.active = isActive;
            this.playerDOM.setAttribute('active', String(isActive));
        }
    }
    exports.Player = Player;
});
