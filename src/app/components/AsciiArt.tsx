"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AsciiArt: React.FC = () => {
  const [artLines, setArtLines] = useState<string[]>([]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await fetch('/ascii-art.txt');
        const text = await response.text();
        // Split into lines and filter out empty lines
        const lines = text.split('\n').filter(line => line.trim() !== '');
        setArtLines(lines);
      } catch (error) {
        console.error('Error fetching ASCII art:', error);
      }
    };

    fetchArt();
  }, []);

  return (
    <div className="text-text-100 font-mono text-[4px] md:text-[6px] tracking-[0.2px] text-right">
      {artLines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          initial={{ 
            opacity: 0, 
            x: lineIndex % 2 === 0 ? -50 : 50,
            scale: 0.5
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
              delay: lineIndex * 0.04,
              duration: 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
          className="whitespace-pre"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

export default AsciiArt;