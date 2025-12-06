export type TFactType = 'pro' | 'con';

export interface TFact {
  id: string;
  content: string;
  score: number;
  type: TFactType;
}

export interface TColumnData {
  id: TFactType;
  title: string;
  facts: TFact[];
}

export interface TBoardState {
  columns: {
    [key in TFactType]: TColumnData;
  };
}
