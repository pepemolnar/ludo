import { ILudoStatusResponse, ILudoStatusResponseData } from '../../../../tpyes/ludoTypes';
import { TSelectableColors } from '../../../../tpyes/playerTypes';
import { EMessageType, IMessage, IReadyCheckResultData } from '../../../../tpyes/generalTypes';
import { Ludo } from './logic/Ludo';

window.onload = (event) => {
  const gameDOM = document.getElementById('game') as HTMLElement;
  const hash = gameDOM?.getAttribute('data-id') as string;

  function buildGame(data: ILudoStatusResponseData) {
    buildHouses(data);
    buildBoard(data);
    buildGoals(data);
    buildFigures(data);

    const game = new Ludo(hash, data);
  }

  function buildHouses(data: ILudoStatusResponseData) {
    const housesBlockDOM = document.getElementById('houses');

    for (const player of data.players) {
      const houseDOM = document.createElement('div');
      houseDOM.setAttribute('id', `${player.color}_house`);
      houseDOM.setAttribute('class', `house ${player.color}-house`);

      housesBlockDOM?.appendChild(houseDOM);
    }
  }

  function buildBoard(data: ILudoStatusResponseData) {
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
      } else {
        numberOfFieldsInBlock -= 1;
      }

      for (let j = 1; j <= numberOfFieldsInBlock; j++) {
        const fieldDOM = document.createElement('div');
        const stepOutFieldColor = Object.keys(data.stepOutFields).find(
          (key) => data.stepOutFields[key as TSelectableColors] === fieldIndex
        );

        fieldDOM.setAttribute('id', `field_${fieldIndex}`);
        fieldDOM.setAttribute('class', 'field');
        fieldDOM.setAttribute('data-position', String(fieldIndex));

        if (stepOutFieldColor) {
          fieldDOM.setAttribute('class', `field ${stepOutFieldColor}-field`);
        }

        fieldBlockDOM.appendChild(fieldDOM);
        fieldIndex += 1;
      }
      boardBlockDOM?.appendChild(fieldBlockDOM);
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

    boardBlockDOM?.appendChild(diceBlockDOM);
  }

  function buildGoals(data: ILudoStatusResponseData) {
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

      goalsBlockDOM?.appendChild(goalBlockDOM);
    }
  }

  function buildFigures(data: ILudoStatusResponseData) {
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

        parentDOM?.appendChild(figureDOM);
      }
    }
  }

  function getGameStatus() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/game/${hash}/status`, true);
    xhr.send();

    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response: ILudoStatusResponse = JSON.parse(xhr.response);

        if (response.success) {
          buildGame(response.data);
          connectToWebSocket();
        } else {
          console.log(response.message);
        }
      } else {
        console.log('Nem sikerült új játékot csinálni!');
      }
    };
  }

  function connectToWebSocket() {
    const ws = new WebSocket('ws://localhost:4001');

    ws.addEventListener('open', () => {
      console.log('Connected to server');
      const readyRequest: IMessage = {
        type: EMessageType.READY_CHECK,
        data: 'Is all player connected?'
      };

      ws.send(JSON.stringify(readyRequest));
    });

    ws.addEventListener('message', (event) => {
      handleMessage(event.data as IMessage);
    });

    ws.addEventListener('close', () => {
      console.log('Disconnected from server');
    });
  }

  function handleMessage(message: IMessage) {
    switch (message.type) {
      case EMessageType.READY_CHECK_RESULT:
        handleReadyCheckResultMessage(message);
        break;
      case EMessageType.CONNECTION:
        console.log('asd');
        break;
      default:
        console.error(`Message type unknown:${message.type}`);
    }
  }

  function handleReadyCheckResultMessage(message: IMessage) {
    const data = message.data as IReadyCheckResultData;

    if (data && data.ready) {
      return;
    }

    createWaitingForPlayersModal();
    showPlayersConnected(data.playersConnected);
  }

  function createWaitingForPlayersModal() {
    const modalContainerDOM = document.getElementById('waiting-players-modal-container') as HTMLElement;

    modalContainerDOM.style.display = 'block';
  }

  function showPlayersConnected(playersConnected: string[]) {
    const modalDOM = document.getElementById('waiting-players-modal') as HTMLElement;
    const playerContainerDOM = document.createElement('div');

    modalDOM.append(playerContainerDOM);

    playerContainerDOM.setAttribute('class', 'connected-player-container');

    for (const playerName of playersConnected) {
      const playerNameDOM = document.createElement('div');

      playerNameDOM.setAttribute('class', 'player-name');
      playerNameDOM.innerHTML = playerName;
      playerContainerDOM.append(playerNameDOM);
    }
  }

  getGameStatus();
};
