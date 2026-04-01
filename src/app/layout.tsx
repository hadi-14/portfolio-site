import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
  icons: "logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} fixed inset-0 pointer-events-none`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} >
        <Sidebar />
        <main className="md:ml-[280px]">
          {children}
        </main>
      </body>
    </html>
  );
}
 