// src/components/Button/Button.jsx
import styles from "./Button.module.css";

export default function Button({ children, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles.shineHover}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
