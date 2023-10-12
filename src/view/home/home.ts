import { PLAYERS } from '../constants/playerConstants';
import { Game } from './game/game';

window.onload = (event) => {
  const game = new Game({ players: PLAYERS, numberOfFields: 16 });
  const rollButtonDOM = document.getElementById('roll_button');
  const figuresDOM = document.querySelectorAll('.figure');

  rollButtonDOM?.addEventListener('click', () => {
    game.rollTheDice();
  });

  figuresDOM.forEach((item) => {
    item.addEventListener('click', (event) => {
      const figureId = Number(item.getAttribute('data-number'));
      const playerColor = String(item.getAttribute('data-color'));

      game.selectFigureToMove(playerColor, figureId);
    });
  });
};
