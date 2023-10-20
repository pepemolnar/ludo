import {
  ILudoStatusResponseData,
  ILudoMoveResponseData,
  ILudoPlayerStatus,
  ILudoMoveResponse,
  ILudoRollDiceResponse
} from '../../../../../tpyes/ludoTypes';
import { Player } from './Player';

export class Ludo {
  hash: string;
  players!: Player[];
  rollButtonDOM: HTMLElement;
  rolledNumberDOM: HTMLElement;
  figuresDOM: NodeListOf<Element>;

  constructor(hash: string, data: ILudoStatusResponseData) {
    this.rollButtonDOM = document.getElementById('roll_button') as HTMLElement;
    this.rolledNumberDOM = document.getElementById('rolled_number') as HTMLElement;
    this.figuresDOM = document.querySelectorAll('.figure');
    this.hash = hash;

    this.createPlayers(data.players);
    this.createListeners();
  }

  private makeFiguresSelectable(activePlayerId: number, selectableFigureIds: number[]): void {
    const activePlayer = this.players.find((player) => player.id === activePlayerId);

    if (!activePlayer) {
      console.error('Player not found!');
      return;
    }

    activePlayer.makeFiguresSelectable(selectableFigureIds);
  }

  private activatePlayer(playerId: number): void {
    for (const player of this.players) {
      if (player.id === playerId) {
        player.setActivity(true);
        continue;
      }
      player.setActivity(false);
    }
  }

  private createPlayers(playerStatuses: ILudoPlayerStatus[]): void {
    this.players = [];

    for (const playerStatus of playerStatuses) {
      const newPlayer = new Player(playerStatus);
      this.players.push(newPlayer);
    }
  }

  private createListeners() {
    this.rollButtonDOM.addEventListener('click', () => {
      this.rollTheDice();
    });

    this.figuresDOM.forEach((item) => {
      item.addEventListener('click', (event) => {
        const figureId = Number(item.getAttribute('data-number'));

        this.selectFigureToMove(figureId);
      });
    });
  }

  private rollTheDice(): void {
    this.rollButtonDOM?.setAttribute('active', 'false');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/game/${this.hash}/roll`, true);
    xhr.send();

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response: ILudoRollDiceResponse = JSON.parse(xhr.response);

        if (response.success) {
          const data = response.data;

          this.rolledNumberDOM.innerText = String(data.rolledNumber);

          if (data.isRoundOver) {
            this.activatePlayer(data.activePlayerId);
            this.rollButtonDOM?.setAttribute('active', 'true');
          } else {
            this.makeFiguresSelectable(data.activePlayerId, data.selectableFigureIds);
          }
        } else {
          console.log(response.message);
        }
      } else {
        console.log('Nem sikerült új játékot csinálni!');
      }
    };
  }

  private selectFigureToMove(figureId: number): void {
    const playerId = 1;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/game/${this.hash}/step`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ playerId, figureId }));

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response: ILudoMoveResponse = JSON.parse(xhr.response);

        if (response.success) {
          this.handleStepResponse(response.data);
          this.rollButtonDOM?.setAttribute('active', 'true');
        } else {
          console.log(response.message);
        }
      } else {
        console.log('Nem sikerült új játékot csinálni!');
      }
    };
  }

  private handleStepResponse(data: ILudoMoveResponseData) {
    const activePlayer = this.getPlayer(data.activePlayerId);

    activePlayer?.moveFigure(data.figureIdToMove, data.newPosition, data.positionType);

    if (data.playerWon) {
      this.gameOver(data.activePlayerId);
      return;
    }

    this.activatePlayer(data.nextPlayerId);
    this.stepBackFiguresHitByPlayer(data.opponentFigureIdsHitByPlayer);
  }

  private stepBackFiguresHitByPlayer(stepBackFigureIds: number[]) {
    for (const player of this.players) {
      for (const figure of player.figures) {
        if (stepBackFigureIds.includes(figure.id)) {
          figure.move(0, 'IN_HOUSE', player.color);
        }
      }
    }
  }

  private getPlayer(playerId: number) {
    const activePlayer = this.players.find((player) => player.id === playerId);

    if (!activePlayer) {
      console.error('Active player not found!');
    }

    return activePlayer;
  }

  private gameOver(winnerId: number) {
    console.log('WON');
  }
}
