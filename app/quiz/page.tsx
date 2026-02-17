"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

import Button from "../components/Button/Button";
import Display from "../components/Display/Display";
import quizData from "../data/quiz";

export default function QuizPage() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);

  const router = useRouter();
  const MAX_QUIZ_LEN = quizData.length;

  const progress =
    MAX_QUIZ_LEN > 1 ? quizIndex / (MAX_QUIZ_LEN - 1) : 1;

  /** リセット処理 */
  useEffect(() => {
    if (sessionStorage.getItem("resetQuiz") === "1") {
      setQuizIndex(0);
      setAnswerLogs([]);
      sessionStorage.removeItem("resetQuiz");
    }
  }, []);

  /** ヒントリセット */
  useEffect(() => {
    setShowHint(false);
  }, [quizIndex]);

  /** 次の画像を先読み（超重要） */
  useEffect(() => {
    const next = quizData[quizIndex + 1];
    if (!next) return;


    const img = new Image();
  img.src = next.image;
  }, [quizIndex]);

  const handleClick = (clickedIndex: number) => {
  const currentQuiz = quizData[quizIndex];

  const correct = clickedIndex === currentQuiz.answerIndex;

const correctAnswer =
  currentQuiz.options[currentQuiz.answerIndex];

const message = correct
  ? "正解です◎"
  : `残念！正解は「${correctAnswer}」です`;


  setFeedback({ correct, message });
  setAnswerLogs((prev) => [...prev, correct]);

  const isLast = quizIndex + 1 === MAX_QUIZ_LEN;

  if (!isLast) {
    setTimeout(() => {
      setFeedback(null);
      setQuizIndex((prev) => prev + 1);
    }, 1500);
  } else {
    setTimeout(() => {
      const correctNum =
        [...answerLogs, correct].filter(Boolean).length;

      router.push(
        `/result?max=${MAX_QUIZ_LEN}&correct=${correctNum}`
      );
    }, 3000);
  }
};


  const quiz = quizData[quizIndex];

  return (
    <div className="quiz-page" style={{ "--progress": progress } as any}>
      {quiz && (
        <>
        <div className="quiz-dots">
  {quizData.map((_, index) => (
    <span
      key={index}
      className={
        index === quizIndex
          ? "quiz-dot active"
          : "quiz-dot"
      }
    />
  ))}
</div>


         <div className="image-wrap">
          <NextImage
  src={quiz.image}
  alt={`Quiz ${quizIndex + 1}`}
  width={600}
  height={400}
  priority={quizIndex === 0}
  placeholder={quizIndex === 0 ? "blur" : "empty"}
  blurDataURL="/placeholder.webp"
  className="quiz-image"
/>

          </div>

          <Display>
            {`Q${quizIndex + 1}. ${quiz.question}`}
          </Display>

          <div className="hint-wrapper">
            <button onClick={() => setShowHint(true)}>
              💡 こちらからヒントが見れます
            </button>

            {showHint && (
              <p className="hint">ヒント: {quiz.hint}</p>
            )}
          </div>

          {feedback && (
            <div className={feedback.correct ? "correct" : "wrong"}>
              {feedback.message}
            </div>
          )}
<div className="options-grid">
  {quiz.options.map((option, index) => (
    <Button key={index} onClick={() => handleClick(index)}>
      {option}
    </Button>
  ))}
</div>

        </>
      )}
    </div>
  );
}
