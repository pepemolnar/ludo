(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants/gameConstants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const gameConstants_1 = require("./constants/gameConstants");
    const config = gameConstants_1.DUMMY_CREATE_LUDO_CONFIG;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/game/new', true);
    xhr.send(JSON.stringify({ config }));
    xhr.send();
    xhr.onload = function (data) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            window.location.href = `/game/${response.gameId}`;
        }
        else {
            console.log('Nem sikerült új játékot csinálni!');
        }
    };
});
//# sourceMappingURL=game.js.map