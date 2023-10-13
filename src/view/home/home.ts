import { GAME_CONFIG } from '../constants/gameConstants';
import { Game } from './game/game';

window.onload = (event) => {
  const game = new Game(GAME_CONFIG);
  const rollButtonDOM = document.getElementById('roll_button');
  const figuresDOM = document.querySelectorAll('.figure');

  rollButtonDOM?.addEventListener('click', () => {
    game.rollTheDice();
  });

  figuresDOM.forEach((item) => {
    item.addEventListener('click', (event) => {
      const figureId = Number(item.getAttribute('data-number'));

      game.selectFigureToMove(figureId);
    });
  });
};