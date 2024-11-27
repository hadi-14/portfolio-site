"use client";
import { useEffect, useState } from "react";
import AsciiArt from "./components/AsciiArt";
import AnimatedHeading from "./components/AnimatedHeading";
import LoadingAnimation from "./components/LoadingAnimation";
import NavBar from "./components/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the loading duration as needed

    return () => clearTimeout(timer);
  }, []);

  const repeatComponent = (
    times: number,
    render: (index: number) => JSX.Element
  ) => {
    return Array.from({ length: times }).map((_, index) => render(index));
  };

  // if (isLoading) {
  //   return <LoadingAnimation />;
  // }

  return (
    <main className="min-h-screen flex flex-col bg-background-900">
      {repeatComponent(6, (index) => (
        <br key={index} />
      ))}
      <NavBar />

      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 md:px-12">
        <div className="flex-grow md:flex-grow-0 md:pl-8 md:max-w-screen-sm">
          <AnimatedHeading />
          <br />
          <p className="text-text-500 text-pretty">           
            I am Abdul Hadi, a dedicated software engineer passionate about creating solutions that improve lives. My expertise spans website development, mobile app development, game development, AI, and data extraction. Skilled in Python, Flutter, Next.js, and Unity, I deliver reliable, punctual, and high-quality services tailored to your needs. Let’s work together to bring your ideas to life and achieve your goals!          </p>
        </div>
        <div className="flex-grow md:flex-grow-0 md:pr-8 md:min-w-fit">
          <AsciiArt />
        </div>
      </div>

      {repeatComponent(100, (index) => (
        <br key={index} />
      ))}
    </main>
  );
}
