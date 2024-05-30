import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdul Hadi Portfolio",
  description: "Made using next.js, tailwind.css and typescript",
  authors: [
    {
      url: 'https://ali-asif.vercel.app',
      name: 'Ali Asif',
    },
    {
      url: 'https://abdul-hadi-millwala.vercel.app',
      name: 'Abdul Hadi Millwala',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
