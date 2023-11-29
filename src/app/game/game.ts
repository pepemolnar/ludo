import { DUMMY_CREATE_LUDO_CONFIG } from './constants/gameConstants';

const config = DUMMY_CREATE_LUDO_CONFIG;
const xhr = new XMLHttpRequest();
xhr.open('POST', '/game/new', true);
xhr.send(JSON.stringify({ config }));
xhr.send();

xhr.onload = function (data) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.response);
    window.location.href = `/game/${response.gameId}`;
  } else {
    console.log('Nem sikerült új játékot csinálni!');
  }
};
