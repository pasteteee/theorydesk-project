import styles from "./UserStats.module.scss";
import VisualLine from "./VisualLine";
import { TFact, TStatistics } from "@/types";

interface TUserStats {
  statistics: TStatistics;
}

export default function UserStats({ statistics }: TUserStats) {
  return (
    <div className={styles.stats}>
      <h3>UserStats</h3>
      <hr />

      <div className="pro">
        <p>Evidence Against</p>
        <VisualLine value={statistics.pro} color="var(--danger)" />
      </div>

      <div className="con">
        <p>Evidence For</p>
        <VisualLine value={statistics.con} color="var(--success)" />
      </div>
    </div>
  );
}
