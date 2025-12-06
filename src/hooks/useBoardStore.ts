import { useState, useEffect } from "react";
import { TBoardState, TFact, TFactType } from "@/types";
import { INITIAL_DATA } from "@/lib/data";

const STORAGE_KEY = "theorydeck-state";

export function useBoardStore() {
  const [board, setBoard] = useState<TBoardState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBoard(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse board state", e);
        setBoard(INITIAL_DATA);
      }
    } else setBoard(INITIAL_DATA);
  }, []);

  useEffect(() => {
    if (board) localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const addFact = (content: string) => {
    if (!board) return;

    const newFact: TFact = {
      id: crypto.randomUUID(),
      content,
      score: 0,
      type: "pro",
    };

    setBoard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        columns: {
          ...prev.columns,
          pro: {
            ...prev.columns.pro,
            facts: [newFact, ...prev.columns.pro.facts],
          },
        },
      };
    });
  };

  const deleteFact = (factId: string) => {
    setBoard((prev) => {
      if (!prev) return null;
      const newColumns = { ...prev.columns };

      for (const colId in newColumns) {
        const colKey = colId as TFactType;
        newColumns[colKey] = {
          ...newColumns[colKey],
          facts: newColumns[colKey].facts.filter((f) => f.id !== factId),
        };
      }

      return { ...prev, columns: newColumns };
    });
  };

  const updateScore = (factId: string, delta: number) => {
    setBoard((prev) => {
      if (!prev) return null;
      const newColumns = { ...prev.columns };

      for (const colId in newColumns) {
        const colKey = colId as TFactType;
        newColumns[colKey] = {
          ...newColumns[colKey],
          facts: newColumns[colKey].facts.map((f) =>
            f.id === factId ? { ...f, score: f.score + delta } : f
          ),
        };
      }

      return { ...prev, columns: newColumns };
    });
  };

  return { board, setBoard, addFact, deleteFact, updateScore };
}
