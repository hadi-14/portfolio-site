// components/LoadingAnimation.tsx
import { useEffect, useState } from 'react';

const LoadingAnimation = () => {
  const [text, setText] = useState('');
  const message = "Welcome!";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(prev => prev + message[currentIndex]);
      currentIndex++;
      if (currentIndex === message.length) {
        clearInterval(interval);
      }
    }, 150); // Adjust typing speed here
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-500 font-mono text-2xl p-4">
      <span>{text}</span>
    </div>
  );
};

export default LoadingAnimation;
