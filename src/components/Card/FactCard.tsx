import React, { useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUp, ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { TFact } from "@/types";
import clsx from "clsx";
import styles from "./FactCard.module.scss";

interface TFactCardProps {
  fact: TFact;
  onDelete?: (id: string) => void;
  onVote?: (id: string, delta: number) => void;
  isNotDraggable?: boolean;
  isHighlighted?: boolean;
}

export default function FactCard({
  fact,
  onDelete,
  onVote,
  isNotDraggable,
  isHighlighted,
}: TFactCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fact.id, data: { ...fact } });

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isHighlighted]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      style={style}
      className={clsx(styles.card, isHighlighted && styles.highlighted)}
    >
      {!isNotDraggable && (
        <div className={styles.dragHandle} {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
      )}
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
