import React, { useEffect, useState } from 'react';

const titles = ["Data Scientist", "Hacker", "Software Engineer", "Web Developer", "AI Specialist"];
const corruptionDuration = 500;
const transitionInterval = 3000;

const getRandomChar = () => {
    const chars = '!@#$%^&*()_+{}:"<>?[];,./~`';
    return chars[Math.floor(Math.random() * chars.length)];
};

const corruptText = (text: string, corruptionLevel: number) => {
    const textArray = text.split('');
    for (let i = 0; i < corruptionLevel; i++) {
        const randomIndex = Math.floor(Math.random() * text.length);
        textArray[randomIndex] = getRandomChar();
    }
    return textArray.join('');
};

const AnimatedHeading: React.FC = () => {
    const [currentTitle, setCurrentTitle] = useState(0);
    const [displayText, setDisplayText] = useState(titles[0]);
    const [corruptionLevel, setCorruptionLevel] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCorruptionLevel(0);
            let corruptionTimeout: NodeJS.Timeout;

            for (let i = 1; i <= 10; i++) {
                corruptionTimeout = setTimeout(() => {
                    setDisplayText(corruptText(titles[currentTitle], i));
                }, i * (corruptionDuration / 10));
            }

            setTimeout(() => {
                setCurrentTitle((prevTitle) => (prevTitle + 1) % titles.length);
                setDisplayText(titles[(currentTitle + 1) % titles.length]);
            }, corruptionDuration);

            return () => clearTimeout(corruptionTimeout);
        }, transitionInterval);

        return () => clearInterval(interval);
    }, [currentTitle]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row items-center">
                <h2 className="text-lg md:text-2xl font-thin">Hi, I am</h2>
                <h1 className="font-bold bg-gradient-to-r from-secondary-500 to-secondary-400 bg-clip-text text-transparent text-2xl md:text-4xl md:pl-3">Abdul Hadi Millwala,</h1>
            </div>
            <div className="flex items-center flex-row md:items-start">
                <h2 className="text-lg md:text-2xl font-thin md:pt-3">A</h2>
                <h1 className="text-2xl md:text-5xl text-primary-500 font-mono md:pl-4 pl-2 bg-clip-text">
                    {displayText}
                </h1>
            </div>
        </div >
    );
};

export default AnimatedHeading;
