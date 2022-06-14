import { IBestWinnning } from './IBestWinning';
import { ILastMatch } from './ILastMatch';
import { IMyBetStat } from './IMyBetStat';

export interface IStats {
  myBets: IMyBetStat[];
  lastMatches: ILastMatch[];
  bestWinnings: {
    user?: IBestWinnning;
    otherPlayers: IBestWinnning[];
  };
}
