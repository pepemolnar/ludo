window.onload = (event) => {
  const rollButtonDOM = document.getElementById('roll_button');
  const rolledNumberDOM = document.getElementById('rolled_number');
  const figuresDOM = document.querySelectorAll('.figure');
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('gameId');

  rollButtonDOM?.addEventListener('click', () => {
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
    xhr.open('POST', '/game/roll', true);
    xhr.send(JSON.stringify({ gameId }));

    xhr.onload = function (data) {
      console.log(data);
    };
  }

  function selectFigureToMove(figureId: number): void {
    rollButtonDOM?.setAttribute('active', 'false');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/game/step', true);
    xhr.send(JSON.stringify({ gameId, figureId }));

    xhr.onload = function (data) {
      console.log(data);
    };
  }
};
