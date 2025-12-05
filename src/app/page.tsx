"use client";

import React from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useBoardStore } from "@/hooks/useBoardStore";
import Column from "@components/CardList/Column";
import LibraryFact from "@components/LibraryFact/LibraryFact";
import FactCard from "@components/Card/FactCard";
import { Fact } from "@/types";
import styles from "./page.module.scss";
import Loader from "@components/Loader/Loader";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export default function Home() {
  const { board, setBoard, addFact, deleteFact, updateScore } = useBoardStore();
  const [activeFact, setActiveFact] = React.useState<Fact | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!board) return <Loader />;

  const findContainer = (id: string) => {
    if (id in board.columns) {
      return id;
    }
    return Object.keys(board.columns).find((key) =>
      board.columns[key as "pro" | "con"].facts.find((f) => f.id === id)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;
    const container = findContainer(id);
    if (container) {
      const fact = board.columns[container as "pro" | "con"].facts.find(
        (f) => f.id === id
      );
      if (fact) setActiveFact(fact);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoard((prev) => {
      if (!prev) return null;
      const activeItems = prev.columns[activeContainer as "pro" | "con"].facts;
      const overItems = prev.columns[overContainer as "pro" | "con"].facts;
      const activeIndex = activeItems.findIndex((f) => f.id === active.id);
      const overIndex = overItems.findIndex((f) => f.id === overId);

      let newIndex;
      if (overId in prev.columns) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [activeContainer]: {
            ...prev.columns[activeContainer as "pro" | "con"],
            facts: [
              ...prev.columns[activeContainer as "pro" | "con"].facts.filter(
                (item) => item.id !== active.id
              ),
            ],
          },
          [overContainer]: {
            ...prev.columns[overContainer as "pro" | "con"],
            facts: [
              ...prev.columns[overContainer as "pro" | "con"].facts.slice(
                0,
                newIndex
              ),
              activeItems[activeIndex],
              ...prev.columns[overContainer as "pro" | "con"].facts.slice(
                newIndex,
                prev.columns[overContainer as "pro" | "con"].facts.length
              ),
            ],
          },
        },
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;
    const overId = over?.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const activeIndex = board.columns[
        activeContainer as "pro" | "con"
      ].facts.findIndex((f) => f.id === activeId);
      const overIndex = board.columns[
        overContainer as "pro" | "con"
      ].facts.findIndex((f) => f.id === overId);

      if (activeIndex !== overIndex) {
        setBoard((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            columns: {
              ...prev.columns,
              [activeContainer]: {
                ...prev.columns[activeContainer as "pro" | "con"],
                facts: arrayMove(
                  prev.columns[activeContainer as "pro" | "con"].facts,
                  activeIndex,
                  overIndex
                ),
              },
            },
          };
        });
      }
    }

    setActiveFact(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.interfaceWrapper}>
        <div className={styles.library}>
          <LibraryFact onAdd={addFact} />
        </div>

        <div className={styles.trands}>
          <LibraryFact onAdd={addFact} />
        </div>

        <div className={styles.pro}>
          <Column
            column={board.columns.pro}
            onDeleteFact={deleteFact}
            onVoteFact={updateScore}
          />
        </div>

        <div className={styles.con}>
          <Column
            column={board.columns.con}
            onDeleteFact={deleteFact}
            onVoteFact={updateScore}
          />
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeFact ? <FactCard fact={activeFact} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
