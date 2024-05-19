import React, { useEffect, useState } from 'react';

const titles = ["Hacker", "Data Scientist", "Software Engineer", "Web Developer", "AI Specialist"];
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
        <div className="flex flex-col p-4 md:pl-16">
            <div className="flex flex-col md:flex-row items-center">
                <h2 className="text-lg md:text-2xl font-thin">Hi, My name is</h2>
                <h1 className="font-bold bg-gradient-to-r from-gradient2 to-gradient1 bg-clip-text text-transparent text-2xl md:text-4xl md:pl-3">Abdul Hadi Millwala</h1>
            </div>
            <div className="flex items-center md:flex-col md:items-start md:flex">
                <h2 className="text-lg md:text-2xl font-thin">I am a</h2>
                <h1 className="text-2xl md:text-5xl text-foreground font-mono md:pl-4 pl-2">
                    {displayText}
                </h1>
            </div>
        </div>
    );
};

export default AnimatedHeading;
