import { TFact } from "@/types";
import styles from "./FilterControl.module.scss";

interface TFilterControl {
  sortFacts: (compareFn: (a: TFact, b: TFact) => number) => void;
}

export default function FilterControl({ sortFacts }: TFilterControl) {
  return (
    <div className={styles.filterControl}>
      <h2>Filters</h2>
      <hr />
      <div className={styles.wrapperButtons}>
        <button onClick={() => sortFacts((a, b) => +b.id - +a.id)}>
          By order
        </button>
        <button onClick={() => sortFacts((a, b) => b.score - a.score)}>
          Best Fact
        </button>
        <button onClick={() => sortFacts((a, b) => a.score - b.score)}>
          Worst Fact
        </button>
      </div>
    </div>
  );
}
