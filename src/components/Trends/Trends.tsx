import FactCard from "../Card/FactCard";
import styles from "./Trends.module.scss";
import { TFact } from "@/types";

interface TTrendsProps {
  currentTheory?: TFact | null;
  onDeleteFact?: (id: string) => void;
  onVoteFact?: (id: string, delta: number) => void;
}

export default function Trends({
  currentTheory,
  onDeleteFact,
  onVoteFact,
}: TTrendsProps) {
  return (
    <div className={styles.trends}>
      <h3>Trending theory</h3>
      <div className={styles.wrapperContent}>
        {currentTheory ? (
          <FactCard
            isNotDraggable
            fact={currentTheory}
            onDelete={onDeleteFact}
            onVote={onVoteFact}
          />
        ) : (
          <p>Is nothing here...</p>
        )}
      </div>
    </div>
  );
}
