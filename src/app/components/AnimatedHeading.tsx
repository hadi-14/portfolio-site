import React, { useEffect, useState } from 'react';

const titles = ["Data Scientist", "Hacker", "Software Engineer", "Web Developer", "AI Specialist", "Mobile Dev"];
const displayDuration = 4000;
const morphDuration = 800;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const getRandomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
};

const AnimatedHeading: React.FC = () => {
    const [currentTitle, setCurrentTitle] = useState(0);
    const [displayText, setDisplayText] = useState(titles[0]);
    const [isMorphing, setIsMorphing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentTitle + 1) % titles.length;
            const nextTitle = titles[nextIndex];

            setIsMorphing(true);

            // Morph animation
            const steps = 30;
            const stepDuration = morphDuration / steps;
            let currentStep = 0;

            const morphInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                let morphedText = '';
                const maxLen = Math.max(displayText.length, nextTitle.length);

                for (let i = 0; i < maxLen; i++) {
                    if (i < nextTitle.length) {
                        // Characters that should reveal
                        if (progress >= (i / maxLen)) {
                            morphedText += nextTitle[i];
                        } else {
                            // Morph characters before they're revealed
                            morphedText += getRandomChar();
                        }
                    }
                }

                setDisplayText(morphedText);

                if (currentStep >= steps) {
                    clearInterval(morphInterval);
                    setDisplayText(nextTitle);
                    setCurrentTitle(nextIndex);
                    setIsMorphing(false);
                }
            }, stepDuration);

            return () => clearInterval(morphInterval);
        }, displayDuration);

        return () => clearInterval(interval);
    }, [currentTitle, displayText]);

    return (
        <div className="flex flex-col">
            <style>{`
                @keyframes shimmer {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }

                .morphing-text {
                    animation: shimmer 0.6s ease-in-out;
                }
            `}</style>

            <div className="flex flex-col md:flex-row items-center">
                <h2 className="text-lg md:text-2xl font-thin text-white/80">
                    Hi, I am
                </h2>
                <h1 className="font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent text-2xl md:text-4xl md:pl-3">
                    Abdul Hadi Millwala,
                </h1>
            </div>

            <div className="flex items-center flex-row md:items-start">
                <h2 className="text-lg md:text-2xl font-thin text-white/80 md:pt-3">
                    A
                </h2>
                <h1
                    className={`text-2xl md:text-5xl text-green-400 font-mono md:pl-4 pl-2 transition-all ${isMorphing ? 'morphing-text' : ''
                        }`}
                    style={{
                        textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
                        letterSpacing: '0.05em',
                    }}
                >
                    {displayText}
                </h1>
            </div>
        </div>
    );
};

export default AnimatedHeading;
