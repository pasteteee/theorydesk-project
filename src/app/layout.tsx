import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "@components/Header/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "TheoryDeck",
  description: "Program for building and discussing One Piece fan theories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <Header />
        {children}
        <Image
          className="bg-illustration"
          src="/background-illustration.png"
          alt="Background illustration"
          width={100}
          height={100}
        />
      </body>
    </html>
  );
}
