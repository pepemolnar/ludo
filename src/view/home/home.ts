import { Game } from './game';

window.onload = (event) => {
  const game = new Game(['RED', 'BLUE', 'GREEN', 'YELLOW']);
  const rollButtonDOM = document.getElementById('roll_button');

  rollButtonDOM?.addEventListener('click', () => {
    game.rollTheDice();
  });
};
