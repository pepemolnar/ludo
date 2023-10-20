(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Player"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ludo = void 0;
    const Player_1 = require("./Player");
    class Ludo {
        constructor(hash, data) {
            this.rollButtonDOM = document.getElementById('roll_button');
            this.rolledNumberDOM = document.getElementById('rolled_number');
            this.figuresDOM = document.querySelectorAll('.figure');
            this.hash = hash;
            this.createPlayers(data.players);
            this.createListeners();
        }
        makeFiguresSelectable(activePlayerId, selectableFigureIds) {
            const activePlayer = this.players.find((player) => player.id === activePlayerId);
            if (!activePlayer) {
                console.error('Player not found!');
                return;
            }
            activePlayer.makeFiguresSelectable(selectableFigureIds);
        }
        activatePlayer(playerId) {
            for (const player of this.players) {
                if (player.id === playerId) {
                    player.setActivity(true);
                    continue;
                }
                player.setActivity(false);
            }
        }
        createPlayers(playerStatuses) {
            this.players = [];
            for (const playerStatus of playerStatuses) {
                const newPlayer = new Player_1.Player(playerStatus);
                this.players.push(newPlayer);
            }
        }
        createListeners() {
            this.rollButtonDOM.addEventListener('click', () => {
                this.rollTheDice();
            });
            this.figuresDOM.forEach((item) => {
                item.addEventListener('click', (event) => {
                    const figureId = Number(item.getAttribute('data-number'));
                    this.selectFigureToMove(figureId);
                });
            });
        }
        rollTheDice() {
            var _a;
            (_a = this.rollButtonDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', 'false');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/game/${this.hash}/roll`, true);
            xhr.send();
            xhr.onload = () => {
                var _a;
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    if (response.success) {
                        const data = response.data;
                        this.rolledNumberDOM.innerText = String(data.rolledNumber);
                        if (data.isRoundOver) {
                            this.activatePlayer(data.activePlayerId);
                            (_a = this.rollButtonDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', 'true');
                        }
                        else {
                            this.makeFiguresSelectable(data.activePlayerId, data.selectableFigureIds);
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
        selectFigureToMove(figureId) {
            const playerId = 1;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/game/${this.hash}/step`, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify({ playerId, figureId }));
            xhr.onload = () => {
                var _a;
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    if (response.success) {
                        this.handleStepResponse(response.data);
                        (_a = this.rollButtonDOM) === null || _a === void 0 ? void 0 : _a.setAttribute('active', 'true');
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
        handleStepResponse(data) {
            const activePlayer = this.getPlayer(data.activePlayerId);
            activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.moveFigure(data.figureIdToMove, data.newPosition, data.positionType);
            if (data.playerWon) {
                this.gameOver(data.activePlayerId);
                return;
            }
            this.activatePlayer(data.nextPlayerId);
            this.stepBackFiguresHitByPlayer(data.opponentFigureIdsHitByPlayer);
        }
        stepBackFiguresHitByPlayer(stepBackFigureIds) {
            for (const player of this.players) {
                for (const figure of player.figures) {
                    if (stepBackFigureIds.includes(figure.id)) {
                        figure.move(0, 'IN_HOUSE', player.color);
                    }
                }
            }
        }
        getPlayer(playerId) {
            const activePlayer = this.players.find((player) => player.id === playerId);
            if (!activePlayer) {
                console.error('Active player not found!');
            }
            return activePlayer;
        }
        gameOver(winnerId) {
            console.log('WON');
        }
    }
    exports.Ludo = Ludo;
});
//# sourceMappingURL=Ludo.js.map