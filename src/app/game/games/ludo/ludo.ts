import { PLAYERS } from '../../constants/playerConstants';
import { IRollDiceResponse } from '../../types/ludoTypes';
import { Ludo } from './logic/Ludo';

window.onload = (event) => {
  const rollButtonDOM = document.getElementById('roll_button') as HTMLElement;
  const rolledNumberDOM = document.getElementById(
    'rolled_number'
  ) as HTMLElement;
  const figuresDOM = document.querySelectorAll('.figure');
  const gameDOM = document.getElementById('game');
  const gameId = gameDOM?.getAttribute('data-id');
  const game = new Ludo(PLAYERS);

  rollButtonDOM.addEventListener('click', () => {
    rollTheDice();
  });

  figuresDOM.forEach((item) => {
    item.addEventListener('click', (event) => {
      const figureId = Number(item.getAttribute('data-number'));

      selectFigureToMove(figureId);
    });
  });

  function rollTheDice(): void {
    rollButtonDOM?.setAttribute('active', 'false');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/game/${gameId}/roll`, true);
    xhr.send();

    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response: IRollDiceResponse = JSON.parse(xhr.response);

        if (response.success) {
          const data = response.data;

          rolledNumberDOM.innerText = String(data.rolledNumber);

          if (data.isRoundOver) {
            game.activateNextPlayer();
            rollButtonDOM?.setAttribute('active', 'true');
          } else {
            game.makeFiguresSelectable(data.selectableFigures);
          }
        } else {
          console.log(response.message);
        }
      } else {
        console.log('Nem sikerült új játékot csinálni!');
      }
    };
  }

  function selectFigureToMove(figureId: number): void {
    rollButtonDOM?.setAttribute('active', 'false');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/game/step', true);
    xhr.send(JSON.stringify({ gameId, figureId }));

    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);
        window.location.href = `/game/${response.gameId}`;
      } else {
        console.log('Nem sikerült új játékot csinálni!');
      }
    };
  }
};
