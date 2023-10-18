"use strict";
window.onload = (event) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/game/new', true);
    xhr.send();
    xhr.onload = function (data) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            window.location.href = `/game/${response.gameId}`;
        }
        else {
            console.log('Nem sikerült új játékot csinálni!');
        }
    };
};
//# sourceMappingURL=game.js.map