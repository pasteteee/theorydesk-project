import { TBoardState, TFact } from "@/types";

export function getBestFact(board: TBoardState): TFact | null {
  const proArray: TFact[] = board.columns.pro.facts;
  const conArray: TFact[] = board.columns.con.facts;

  if (!proArray || !conArray) return null;

  let result: TFact | null = null;
  proArray.forEach((el) => {
    result = !result || result.score < el.score ? el : result;
  });
  conArray.forEach((el) => {
    result = !result || result.score < el.score ? el : result;
  });

  return result;
}
