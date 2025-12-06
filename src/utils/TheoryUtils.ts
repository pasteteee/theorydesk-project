import { TBoardState, TFact, TStatistics } from "@/types";

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

export function getStatistics(board: TBoardState): TStatistics {
  const proArray: TFact[] = board.columns.pro.facts;
  const conArray: TFact[] = board.columns.con.facts;
  const proLength = proArray.length,
    conLength = conArray.length,
    absoluteLength = conLength + proLength;

  if (!proArray || !conArray) return { pro: 0, con: 0 };
  return {
    pro: (proLength / absoluteLength) * 100,
    con: (conLength / absoluteLength) * 100,
  };
}
