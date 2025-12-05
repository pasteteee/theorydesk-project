export type FactType = 'pro' | 'con';

export interface Fact {
  id: string;
  content: string;
  score: number;
  type: FactType;
}

export interface ColumnData {
  id: FactType;
  title: string;
  facts: Fact[];
}

export interface BoardState {
  columns: {
    [key in FactType]: ColumnData;
  };
}
