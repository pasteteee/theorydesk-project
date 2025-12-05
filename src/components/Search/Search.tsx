import styles from "./Search.module.scss";

export default function Search() {
  return (
    <input className={styles.searchInput} type="text" placeholder="Search" />
  );
}
