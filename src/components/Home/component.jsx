import Logo from "../../icons/logo/logo";
import MainSearch from "../MainSearch/component";
import styles from "./style.module.scss";

export default function HomeContainer() {
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Logo container="mainContainer" />
      </div>
      <div className={styles.title}>Lyrics Finder</div>
      <MainSearch />
    </section>
  );
}
