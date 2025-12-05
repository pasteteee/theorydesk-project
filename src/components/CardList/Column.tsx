"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnData } from "@/types";
import FactCard from "../Card/FactCard";
import styles from "./Column.module.scss";
import clsx from "clsx";

interface ColumnProps {
  column: ColumnData;
  className?: string;
  onDeleteFact?: (id: string) => void;
  onVoteFact?: (id: string, delta: number) => void;
}

export default function Column({
  column,
  className,
  onDeleteFact,
  onVoteFact,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className={clsx(styles.column, className)}>
      <h2 className={styles.title}>
        {column.title}
        <span className={styles.count}>{column.facts.length}</span>
      </h2>
      <div ref={setNodeRef} className={styles.list}>
        <SortableContext
          items={column.facts.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.facts.map((fact) => (
            <FactCard
              key={fact.id}
              fact={fact}
              onDelete={onDeleteFact}
              onVote={onVoteFact}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
