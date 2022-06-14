import { IBet } from "./IBet";

export interface IGame {
  explosionValue: number;
  user?: {
    bet: IBet,
    result: {
      isWinner: boolean;
      prize: number;
    };
    newBalance: number;
  };
}
