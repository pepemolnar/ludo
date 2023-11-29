import { TSelectableColors } from '../../../tpyes/playerTypes';

export interface IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}
