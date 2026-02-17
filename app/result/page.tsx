"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Result from "../components/Result/Result";
import Loading from "../components/Loading/Loading";

export default function ResultPage() {
const [maxQuizLen, setMaxQuizLen] = useState(0);
const [correctNumLen, setCorrectNumLen] = useState(0);

  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0.4);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  setMaxQuizLen(Number(params.get("max")) || 0);
  setCorrectNumLen(Number(params.get("correct")) || 0);
}, []);


  // Loadingを一定時間後に消す
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 夜明け演出(Loading中に明るくなる)
  useEffect(() => {
    let start = Date.now();
    const duration = 3000;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      setProgress(0.4 + t * 0.3); // 0.4 → 0.7
      if (t < 1) requestAnimationFrame(tick);
    };

    tick();
  }, []);

  const getResultMessage = () => {
    if (maxQuizLen === 0) {
      return (
        <>
          旅の途中で、少し道に迷ったようです。
          <br />
          もう一度、最初から歩いてみましょう。
        </>
      );
    }

    const rate = correctNumLen / maxQuizLen;
    if (rate === 1) {
      return (
        <>
          全問正解とは素晴らしい…。<br />
          あなたにもう地図は必要なさそうです。<br />
          街の気配に身を委ねて、歩いてみてください。
        </>
      );
    }
    if (rate >= 0.8) {
      return (
        <>
          とても詳しいですね。<br />
          名所の名前を聞くだけで、景色が浮かびます。
        </>
      );
    }
    if (rate >= 0.5) {
      return (
        <>
          イタリアの風景にだんだん溶け込んできましたね。
        </>
      );
    }
    if (rate >= 0.3) {
      return (
        <>
          街の空気に、もうちゃんと触れています。
          <br />
          夜明け前の空気が、一番澄んでいる時間かもしれません。
        </>
      );
    }
    return (
      <>
        イタリアを知らなくても心配はいりません。
        <br />
        初めての旅人を迎えるように、<br />街はどんなあなたでもやさしく包み込んでくれます。
      </>
    );
  };

  return (
    <div className="result-page" style={{ "--progress": progress } as React.CSSProperties}>
      {/* 夜明け前の空気レイヤー */}
      <div className="result-dawn" />

      {/* コンテンツ本体 */}
      <div className="result-content">
        <Loading active={active} />

        <Result
          maxQuizLen={maxQuizLen}
          correctNumLen={correctNumLen}
        />

        <p className="result-message">
          {getResultMessage()}
        </p>

        <Link
  href="/quiz"
  className="replay"
  style={{ display: 'inline-block', fontFamily: 'Shippori_Mincho' }}  // transformが効くようにする
  onClick={() => {
    sessionStorage.setItem("resetQuiz", "1");
  }}
>
  もう一度、あのイタリアの景色に思いを馳せる
</Link>

        <div className="result-next">
          <p>
            <a
              href="https://d17sydrv5aw49e.cloudfront.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="gondola-link">
              <span className="gondola-text">
              イタリアの景色を
              <span className="aurora-accent">Aurora</span>
              で観る☛
            </span>
              </a>
          </p>
        </div>
      </div>
    </div>
  );
}