// components/AsciiArt.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

type AsciiArtProps = {
  art: string;
};

const AsciiArt: React.FC<AsciiArtProps> = ({ art }) => {
  return (
    <div className="text-gray-300 font-mono p-4 whitespace-pre-wrap text-[1px] md:text-[3px] tracking-[0.5px]">
      {art}
    </div>
  );
};

export default AsciiArt;
