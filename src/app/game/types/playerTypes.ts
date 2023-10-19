import { TSelectableColors } from '../../../tpyes/playerTypes';

export interface IPlayer {
  color: TSelectableColors;
}

export interface IPlayerColor {
  name: TSelectableColors;
  hex: string;
}
