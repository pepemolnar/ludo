(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../constants/playerConstants", "./logic/Ludo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const playerConstants_1 = require("../../constants/playerConstants");
    const Ludo_1 = require("./logic/Ludo");
    window.onload = (event) => {
        const rollButtonDOM = document.getElementById('roll_button');
        const rolledNumberDOM = document.getElementById('rolled_number');
        const figuresDOM = document.querySelectorAll('.figure');
        const gameDOM = document.getElementById('game');
        const gameId = gameDOM === null || gameDOM === void 0 ? void 0 : gameDOM.getAttribute('data-id');
        const game = new Ludo_1.Ludo(playerConstants_1.PLAYERS);
        rollButtonDOM.addEventListener('click', () => {
            rollTheDice();
        });
        figuresDOM.forEach((item) => {
            item.addEventListener('click', (event) => {
                const figureId = Number(item.getAttribute('data-number'));
                selectFigureToMove(figureId);
            });
        });
        function rollTheDice() {
            rollButtonDOM === null || rollButtonDOM === void 0 ? void 0 : rollButtonDOM.setAttribute('active', 'false');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/game/${gameId}/roll`, true);
            xhr.send();
            xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    if (response.success) {
                        const data = response.data;
                        rolledNumberDOM.innerText = String(data.rolledNumber);
                        if (data.isRoundOver) {
                            game.activateNextPlayer();
                            rollButtonDOM === null || rollButtonDOM === void 0 ? void 0 : rollButtonDOM.setAttribute('active', 'true');
                        }
                        else {
                            game.makeFiguresSelectable(data.selectableFigures);
                        }
                    }
                    else {
                        console.log(response.message);
                    }
                }
                else {
                    console.log('Nem sikerült új játékot csinálni!');
                }
            };
        }
        function selectFigureToMove(figureId) {
            rollButtonDOM === null || rollButtonDOM === void 0 ? void 0 : rollButtonDOM.setAttribute('active', 'false');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/game/step', true);
            xhr.send(JSON.stringify({ gameId, figureId }));
            xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    window.location.href = `/game/${response.gameId}`;
                }
                else {
                    console.log('Nem sikerült új játékot csinálni!');
                }
            };
        }
    };
});
