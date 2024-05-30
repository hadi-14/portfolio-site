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
            I am Abdul Hadi, a Python expert with 3+ years of experience in web
            scraping, data mining, and automation. I guarantee high-quality
            results, tailored to your needs. I am skilled in Django, Flask, and
            Unity development, and I offer punctual, responsible service to help
            you achieve your goals. Let&apos;s transform your ideas into reality
            together!
          </p>
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
