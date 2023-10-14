export interface IPlayer {
  color: TPlayerColor;
  startPosition: number;
}

export type TPlayerColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'purple';
