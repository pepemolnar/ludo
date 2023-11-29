(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../sharedTpyes/generalTypes", "./logic/Ludo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const generalTypes_1 = require("../../../sharedTpyes/generalTypes");
    const Ludo_1 = require("./logic/Ludo");
    const gameDOM = document.getElementById('game');
    const hash = gameDOM === null || gameDOM === void 0 ? void 0 : gameDOM.getAttribute('data-id');
    function buildGame(data) {
        buildHouses(data);
        buildBoard(data);
        buildGoals(data);
        buildFigures(data);
        const game = new Ludo_1.Ludo(hash, data);
    }
    function buildHouses(data) {
        const housesBlockDOM = document.getElementById('houses');
        for (const player of data.players) {
            const houseDOM = document.createElement('div');
            houseDOM.setAttribute('id', `${player.color}_house`);
            houseDOM.setAttribute('class', `house ${player.color}-house`);
            housesBlockDOM === null || housesBlockDOM === void 0 ? void 0 : housesBlockDOM.appendChild(houseDOM);
        }
    }
    function buildBoard(data) {
        const boardBlockDOM = document.getElementById('board');
        const numberOfPlayers = data.players.length;
        const { numberOfFields } = data;
        let fieldIndex = 1;
        for (let i = 1; i <= numberOfPlayers; i++) {
            const isRowBlock = i % 2 === 1;
            const fieldBlockDOM = document.createElement('div');
            fieldBlockDOM.setAttribute('class', 'field-block');
            let numberOfFieldsInBlock = numberOfFields / numberOfPlayers;
            if (isRowBlock) {
                numberOfFieldsInBlock += 1;
            }
            else {
                numberOfFieldsInBlock -= 1;
            }
            for (let j = 1; j <= numberOfFieldsInBlock; j++) {
                const fieldDOM = document.createElement('div');
                const stepOutFieldColor = Object.keys(data.stepOutFields).find((key) => data.stepOutFields[key] === fieldIndex);
                fieldDOM.setAttribute('id', `field_${fieldIndex}`);
                fieldDOM.setAttribute('class', 'field');
                fieldDOM.setAttribute('data-position', String(fieldIndex));
                if (stepOutFieldColor) {
                    fieldDOM.setAttribute('class', `field ${stepOutFieldColor}-field`);
                }
                fieldBlockDOM.appendChild(fieldDOM);
                fieldIndex += 1;
            }
            boardBlockDOM === null || boardBlockDOM === void 0 ? void 0 : boardBlockDOM.appendChild(fieldBlockDOM);
        }
        const diceBlockDOM = document.createElement('div');
        const rolledNumberDOM = document.createElement('div');
        const rollButtonContainerDOM = document.createElement('div');
        const rollButtonDOM = document.createElement('a');
        diceBlockDOM.setAttribute('class', 'dice-block');
        rolledNumberDOM.setAttribute('id', 'rolled_number');
        rolledNumberDOM.setAttribute('class', 'rolled-number');
        rolledNumberDOM.innerText = '0';
        rollButtonContainerDOM.setAttribute('class', 'roll-button-container');
        rollButtonDOM.setAttribute('id', 'roll_button');
        rollButtonDOM.setAttribute('class', 'roll-button');
        rollButtonDOM.setAttribute('active', 'true');
        rollButtonDOM.innerText = 'Dobás';
        rollButtonContainerDOM.appendChild(rollButtonDOM);
        diceBlockDOM.appendChild(rolledNumberDOM);
        diceBlockDOM.appendChild(rollButtonContainerDOM);
        boardBlockDOM === null || boardBlockDOM === void 0 ? void 0 : boardBlockDOM.appendChild(diceBlockDOM);
    }
    function buildGoals(data) {
        const goalsBlockDOM = document.getElementById('goals');
        for (const player of data.players) {
            const goalBlockDOM = document.createElement('div');
            goalBlockDOM.setAttribute('id', `${player.color}_goal_block`);
            goalBlockDOM.setAttribute('class', 'goal-block');
            for (let i = 1; i <= player.figures.length; i++) {
                const goalDOM = document.createElement('div');
                goalDOM.setAttribute('id', `${player.color}_goal_${i}`);
                goalDOM.setAttribute('class', `goal ${player.color}-goal`);
                goalBlockDOM.appendChild(goalDOM);
            }
            goalsBlockDOM === null || goalsBlockDOM === void 0 ? void 0 : goalsBlockDOM.appendChild(goalBlockDOM);
        }
    }
    function buildFigures(data) {
        for (const player of data.players) {
            for (const figure of player.figures) {
                const figureDOM = document.createElement('a');
                figureDOM.setAttribute('id', `${player.color}_figure_${figure.id}`);
                figureDOM.setAttribute('class', `figure ${player.color}-figure`);
                figureDOM.setAttribute('data-color', player.color);
                figureDOM.setAttribute('data-number', String(figure.id));
                let parentDOM = document.getElementById(`${player.color}_house`);
                switch (figure.positionType) {
                    case 'IN_HOUSE':
                        break;
                    case 'IN_GAME':
                        parentDOM = document.getElementById(`field_${figure.position}`);
                        break;
                    case 'IN_GOAL':
                        parentDOM = document.getElementById(`${player.color}_goal_${figure.position}`);
                        break;
                    default:
                        console.error(`Could not find position of ${player.color} player's figure with ID ${figure.id}!`);
                }
                parentDOM === null || parentDOM === void 0 ? void 0 : parentDOM.appendChild(figureDOM);
            }
        }
    }
    function getGameStatus() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/game/${hash}/status`, true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.response);
                if (response.success) {
                    buildGame(response.data);
                    // connectToWebSocket();
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
    function connectToWebSocket() {
        const ws = new WebSocket('ws://localhost:4001');
        ws.addEventListener('open', () => {
            console.log('Connected to server');
        });
        ws.addEventListener('message', (event) => {
            handleMessage(event.data);
        });
        ws.addEventListener('close', () => {
            console.log('Disconnected from server');
        });
    }
    function handleMessage(message) {
        const messageObject = JSON.parse(message);
        switch (messageObject.type) {
            case generalTypes_1.EMessageType.CONNECTION:
                console.log('asd');
                break;
            case generalTypes_1.EMessageType.READY_CHECK_RESULT:
                handleReadyCheckResultMessage(messageObject);
                break;
            default:
                console.error(`Message type unknown:${messageObject.type}`);
        }
    }
    function handleReadyCheckResultMessage(message) {
        const data = message.data;
        if (data && data.ready) {
            hideModal();
            return;
        }
        createWaitingForPlayersModal();
        showPlayersConnected(data.playersConnected);
    }
    function createWaitingForPlayersModal() {
        const modalContainerDOM = document.getElementById('waiting-players-modal-container');
        modalContainerDOM.style.display = 'block';
    }
    function showPlayersConnected(playersConnected) {
        const modalDOM = document.getElementById('waiting-players-modal');
        modalDOM.innerHTML = '';
        for (const playerName of playersConnected) {
            const playerContainerDOM = document.createElement('div');
            const playerNameDOM = document.createElement('div');
            playerNameDOM.setAttribute('class', 'player-name');
            playerNameDOM.innerHTML = playerName;
            playerContainerDOM.setAttribute('class', 'connected-player-container');
            playerContainerDOM.append(playerNameDOM);
            modalDOM.append(playerContainerDOM);
        }
    }
    function hideModal() {
        const modalContainerDOM = document.getElementById('waiting-players-modal-container');
        modalContainerDOM.style.display = 'none';
    }
    getGameStatus();
});
//# sourceMappingURL=ludo.js.map