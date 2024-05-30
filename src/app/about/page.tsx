// about.tsx
"use client";

import React from 'react';
import NavBar from "@/app/components/Navbar";

interface Education {
  title: string;
  institution: string;
  years: string;
  rating: string;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  years: string;
  rating: string;
  description: string;
}

const education: Education[] = [
  {
    title: 'Ph.D Degree',
    institution: 'University of DVI',
    years: '2026-2030',
    rating: '4.30/5',
    description:
      'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante.',
  },
  {
    title: 'Masters Degree In AI',
    institution: 'College of Studies',
    years: '2023-2026',
    rating: '4.50/5',
    description:
      'Maecenas finibus nec sem ut imperdiet. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante.',
  },
  {
    title: 'Bachelor of Computer Science and Technology',
    institution: 'University of Posts and Telecommunications',
    years: '2019-2023',
    rating: '3.50/4.00',
    description: '',
  },
];

const experience: Experience[] = [
  {
    title: 'Web Designer',
    company: 'net2life',
    years: '2020-2023',
    rating: '4.95/5',
    description:
      'Making websites. Installed and maintained the company\'s database systems and network. Performed upgrades and installed updates. Completed troubleshooting and repair when computers had problems. Conducted computer technology training with all new staff.',
  },
  {
    title: 'IT Support',
    company: 'net2life',
    years: '2018-2019',
    rating: '5.00/5',
    description:
      'Installed and maintained the company\'s computer systems and network. Performed upgrades and installed updates. Completed troubleshooting and repair when computers had problems. Conducted computer technology training with all new staff.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-900 text-text-100">
      <NavBar />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <br /><br /><br /><br /><br />
        <h1 className="text-3xl font-bold text-primary-500 mb-8">About Me</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/2 p-4">
            <h2 className="text-2xl font-bold text-secondary-500 mb-4">Education</h2>
            <ul className="border-l-4 border-primary-500 pl-4">
              {education.map((edu, index) => (
                <li key={index} className="mb-8">
                  <div className="pl-4 border-l-2 border-background-700">
                    <h3 className="text-lg font-bold text-accent-500">{edu.title}</h3>
                    <p className="text-text-300">{edu.institution} ({edu.years})</p>
                    <p className="text-text-300">Rating: {edu.rating}</p>
                    <p className="text-text-300">{edu.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/2 p-4">
            <h2 className="text-2xl font-bold text-secondary-500 mb-4">Experience</h2>
            <ul className="border-l-4 border-primary-500 pl-4">
              {experience.map((exp, index) => (
                <li key={index} className="mb-8">
                  <div className="pl-4 border-l-2 border-background-700">
                    <h3 className="text-lg font-bold text-accent-500">{exp.title}</h3>
                    <p className="text-text-300">{exp.company} ({exp.years})</p>
                    <p className="text-text-300">Rating: {exp.rating}</p>
                    <p className="text-text-300">{exp.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};

export default About;
