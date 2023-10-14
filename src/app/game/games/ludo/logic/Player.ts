import { IPlayer, IPlayerColor } from '../../../types/playerTypes';

export class Player implements IPlayer {
  color: IPlayerColor;
  active: boolean;
  playerDOM: HTMLElement;

  constructor(player: IPlayer) {
    this.color = player.color;
    this.active = false;
    this.playerDOM = document.getElementById(
      `${player.color.name}_house`
    ) as HTMLElement;
  }

  setActivity(isActive: boolean): void {
    this.active = isActive;
    this.playerDOM.setAttribute('active', String(isActive));
  }
}
