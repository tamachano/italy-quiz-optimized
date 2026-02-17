import Link from "next/link";

export default function HomePage() {
  return (
    <div className="center-screen">
      <div className="home-content">
      <h1>イタリア名所クイズ</h1>
      <p>
        全てイタリア国内です。次の場所はどこでしょう！？
      </p>
      <Link href="/quiz">
  <span>ここをクリック！</span>
</Link>

     </div>
    </div>
  );
}
