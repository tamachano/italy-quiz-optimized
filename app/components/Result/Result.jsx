import styles from "./Result.module.css";

export default function Result({maxQuizLen,correctNumLen}) {
  return (
    <>
    <div>
        <span className={styles.resultHighlight}>
            {`全${maxQuizLen}問中…${correctNumLen}問正解！`}
        </span>
    </div>
    
    </>
  )
}