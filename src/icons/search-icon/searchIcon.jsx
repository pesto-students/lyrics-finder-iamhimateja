import styles from "./style.module.scss";

export default function SearchIcon({ container }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles[container]}>
      <circle className={styles.searchCircle} cx="11.7666" cy="11.7666" r="8.98856" strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" />
      <path className={styles.searchStrokePath} opacity="0.4" d="M18.0183 18.4852L21.5423 22.0001" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
