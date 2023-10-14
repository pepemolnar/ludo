import { IFigure } from './figureTypes';

export interface IRollDiceResponse {
  success: boolean;
  message: string;
  data: IRollDiceResponseData;
}

interface IRollDiceResponseData {
  rolledNumber: number;
  isRoundOver: boolean;
  selectableFigures: IFigure[];
}
