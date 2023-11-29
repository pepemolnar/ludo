<<<<<<< HEAD
import { DUMMY_CREATE_LUDO_CONFIG } from './constants/gameConstants';

const config = DUMMY_CREATE_LUDO_CONFIG;
const xhr = new XMLHttpRequest();
xhr.open('POST', '/game/new', true);
xhr.send(JSON.stringify({ config }));
xhr.send();
=======
window.onload = (event) => {
  const selectedGame = 'ludo16';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/game/new', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ selectedGame }));
>>>>>>> 6f1ea22e9eb9448fd36d5e928c5fa99f3a45ade6

xhr.onload = function (data) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.response);
    window.location.href = `/game/${response.gameId}`;
  } else {
    console.log('Nem sikerült új játékot csinálni!');
  }
};
