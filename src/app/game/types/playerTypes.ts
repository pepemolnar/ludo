import { TSelectableColors } from '../../../tpyes/playerTypes';

export interface IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}

export interface IPlayerColor {
  name: TSelectableColors;
  hex: string;
}
