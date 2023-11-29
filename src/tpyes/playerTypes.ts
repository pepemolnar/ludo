export type TSelectableColors = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple';

export interface IPlayerStatus {
  id: number;
  active: boolean;
  color: TSelectableColors;
}

export interface IPlayerColor {
  name: TSelectableColors;
  hex: string;
}
