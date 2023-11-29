"use strict";
const selectedGame = 'ludo16';
const xhr = new XMLHttpRequest();
xhr.open('POST', '/game/new', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ selectedGame }));
xhr.onload = function (data) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);
        window.location.href = `/game/${response.gameId}`;
    }
    else {
        console.log('Nem sikerült új játékot csinálni!');
    }
};
//# sourceMappingURL=game.js.map