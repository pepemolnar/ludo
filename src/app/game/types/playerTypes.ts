import { TSelectableColors } from '../../sharedTpyes/playerTypes';

export interface IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}
