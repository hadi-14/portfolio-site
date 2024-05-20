"use client";
import AsciiArt from "./components/AsciiArt";
import AnimatedHeading from "./components/AnimatedHeading";

export default function Home() {
  const repeatComponent = (times: number, render: (index: number) => JSX.Element) => {
    return Array.from({ length: times }).map((_, index) => render(index));
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-textPrimary">
      {repeatComponent(4, (index) => <br key={index} />)}

      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 md:px-12">
        <div className="flex-grow md:flex-grow-0">
          <AnimatedHeading />
        </div>
        <div className="flex-grow md:flex-grow-0">
          <AsciiArt />
        </div>
      </div>

      {repeatComponent(100, (index) => <br key={index} />)}
    </main>
  );
}
