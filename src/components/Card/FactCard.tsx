"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUp, ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { Fact } from "@/types";
import styles from "./FactCard.module.scss";

interface FactCardProps {
  fact: Fact;
  onDelete?: (id: string) => void;
  onVote?: (id: string, delta: number) => void;
}

export default function FactCard({ fact, onDelete, onVote }: FactCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fact.id, data: { ...fact } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.card}>
      <div className={styles.dragHandle} {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className={styles.content}>
        <p>{fact.content}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.voteBtn} onClick={() => onVote?.(fact.id, 1)}>
          <ChevronUp size={18} />
        </button>
        <span className={styles.score}>{fact.score}</span>
        <button
          className={styles.voteBtn}
          onClick={() => onVote?.(fact.id, -1)}
        >
          <ChevronDown size={18} />
        </button>
      </div>
      {onDelete && (
        <button className={styles.deleteBtn} onClick={() => onDelete(fact.id)}>
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
