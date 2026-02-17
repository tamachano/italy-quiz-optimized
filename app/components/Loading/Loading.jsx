import styles from "./Loading.module.css"

export default function Loading({ active }) {
  return (
    <div className={`${styles.loading} ${active ? styles.isActive : "" }`}>
        <span>あなたの正解数は・・・</span>
    </div>
  );
}
