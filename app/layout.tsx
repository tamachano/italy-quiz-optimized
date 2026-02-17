import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "イタリア名所クイズ",
  description: "イタリア国内の地名当てクイズです",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${shippori.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}