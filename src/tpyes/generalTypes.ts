export interface IResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface IMessage {
  type: EMessageType;
  data: TMessageData;
}

export enum EMessageType {
  READY_CHECK,
  READY_CHECK_RESULT,
  CONNECTION,
  MOVE
}

export interface IReadyCheckResultData {
  ready: boolean;
  playersConnected: string[];
}

export type TMessageData = string | boolean | IReadyCheckResultData;

export default IResponse;
