// about.tsx
"use client"
import { useEffect, useState } from "react";
import AsciiArt from "../components/AsciiArt";
import AnimatedHeading from "../components/AnimatedHeading";
import LoadingAnimation from "../components/LoadingAnimation";
import NavBar from "../components/Navbar";

export default function About() {
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
          <div className="text-text-500 text-pretty">
            <h2 className="text-2xl font-bold text-white mb-4">Abdul Hadi</h2>
            <p className="mb-2">
              <strong>Professional Summary:</strong> Python expert with 3+ years of experience in web scraping, data mining, and automation. Proficient in Django, Flask, and Unity development. Committed to delivering high-quality results and providing punctual, responsible service.
            </p>
            <p className="mb-2">
              <strong>Experience:</strong>
              <br />
              - Web Scraping Engineer at XYZ Corp (2019 - Present)
              <br />
              - Python Developer at ABC Company (2017 - 2019)
            </p>
            <p className="mb-2">
              <strong>Education:</strong>
              <br />
              - Bachelor of Computer Science, University of XYZ (2013 - 2017)
            </p>
            <p>
              <strong>Skills:</strong> Python, Django, Flask, Unity, Web Scraping, Data Mining
            </p>
          </div>
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
