import { PlayerColor } from './playerTypes';

export interface FigureInterface {
  id: number;
  position: number;
  color: PlayerColor;
  stepOutPosition: number;
}
