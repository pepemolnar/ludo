export interface PlayerInterface {
  color: PlayerColor;
  startPosition: number;
}

export type PlayerColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'purple';
