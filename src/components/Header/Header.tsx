import Image from "next/image";
import styles from "./Header.module.scss";
import Search from "../Search/Search";
import Link from "next/link";

export default function Header() {
  return (
    <header id={styles.header}>
      <Link className={styles.logo} href="/">
        <Image
          className={styles.logoImage}
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
        />
        <h1>TheoryDeck</h1>
      </Link>

      <div className={styles.searchWrapper}>
        <Search />
      </div>
    </header>
  );
}
