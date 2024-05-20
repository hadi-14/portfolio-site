// components/AsciiArt.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

type AsciiArtProps = {
  art: string;
};

const AsciiArt: React.FC = () => {
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

  return (
    <div className="text-gray-100 font-mono p-4 whitespace-pre-wrap text-[2px] md:text-[3px] tracking-[0.3px] md:tracking-[0.4px] text-right">
      {art}
    </div>
  );
};

export default AsciiArt;
