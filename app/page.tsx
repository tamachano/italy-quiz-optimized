import Link from "next/link";

export default function HomePage() {
  return (
    <div className="center-screen">
      <div className="home-content">
      <h1>イタリア名所クイズ</h1>
      <p>
        イタリアの風景を感じる5問のクイズです。次の場所はどこでしょう？
      </p>
      <Link href="/quiz">
  <span>ここをクリック！</span>
</Link>

     </div>
    </div>
  );
}
