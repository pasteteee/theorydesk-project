import styles from "./UserStats.module.scss";

interface TVisualLine {
  value?: number;
  color: string;
}

export default function VisualLine({ value, color }: TVisualLine) {
  return (
    <div className={styles.line}>
      <div
        className={styles.fill}
        style={{ background: color, width: `${value || 0}%` }}
      ></div>
    </div>
  );
}
