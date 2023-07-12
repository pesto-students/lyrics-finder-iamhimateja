import MoonIcon from "../../icons/moon";
import SunIcon from "../../icons/sun";
import styles from "./style.module.scss";

export default function ThemeSwitch() {
  function toggleTheme() {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add(window.lightThemeClass);
    } else {
      document.body.classList.remove(window.lightThemeClass);
      document.body.classList.add("dark-theme");
    }
  }

  return (
    <>
      <div id={styles.themeSwitch} onClick={toggleTheme}>
        <span className={`${styles.icon} ${styles.lightThemeIcon}`}>
          <SunIcon fillColor="#fff" />
        </span>
        <span className={`${styles.icon} ${styles.darkThemeIcon}`}>
          <MoonIcon fillColor="#fff" />
        </span>
      </div>
    </>
  );
}
