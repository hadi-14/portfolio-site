"use client";
import { useEffect, useState } from "react";
import AcsiiArt from "./components/AcsiiArt";

export default function Home() {
  const [art, setArt] = useState<string>('');

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await fetch('/ascii-art.txt');
        const text = await response.text();
        setArt(text);
      } catch (error) {
        console.error('Error fetching ASCII art:', error);
      }
    };

    fetchArt();
  }, []);

  const repeatComponent = (times: number, render: (index: number) => JSX.Element) => {
    return Array.from({ length: times }).map((_, index) =>
      render(index)
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#10101a]">

      {repeatComponent(4, (index) => <br key={index} />)}
      <AcsiiArt art={art} />
      {repeatComponent(100, (index) => <br key={index} />)}
    </main>
  );
}
