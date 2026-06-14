import { Code2, GraduationCap, Award, Briefcase } from 'lucide-react';
import { skills, experience, education, certifications } from '@/lib/resumeData';

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-12 py-20">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-4">~/about</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">The Developer Manual</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Like all good code, I decided I needed documentation. A comprehensive guide to my skills, experience, and how I work.
          </p>
        </div>

        {/* Who Am I */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Who Am I?</h2>
          </div>
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 mb-6">
            <p className="text-white/70 leading-relaxed mb-4">
              I'm <span className="text-green-400 font-semibold">Abdul Hadi Millwala</span>, a dedicated software engineer passionate about creating solutions that improve lives. My expertise spans website development, mobile app development, data engineering, AI, and automation.
            </p>
            <p className="text-white/70 leading-relaxed">
              I'm skilled in Python, Flutter, Next.js, and Unity — delivering reliable, punctual, and high-quality services across diverse technology stacks.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Technical Arsenal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([label, items]) => (
              <div key={label} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-mono text-green-400/70 uppercase tracking-widest mb-4">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="text-xs font-mono px-3 py-1.5 rounded bg-green-400/10 text-green-400 border border-green-400/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Professional Experience</h2>
          </div>
          <div className="space-y-6">
            {experience.map((experienceItem) => (
              <div key={experienceItem.role} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 hover:border-green-400/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{experienceItem.role}</h3>
                    <p className="text-green-400 font-mono text-sm">{experienceItem.company}</p>
                  </div>
                  <span className="text-white/30 font-mono text-xs">{experienceItem.period}</span>
                </div>
                <ul className="space-y-3">
                  {experienceItem.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/60">
                      <span className="text-green-400/50 mt-1 shrink-0">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Education</h2>
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.school} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6 hover:border-green-400/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-green-400 mt-2.5 shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{edu.school}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-green-400/70 text-sm font-mono">{edu.level}</p>
                      <p className="text-white/40 text-sm">{edu.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Certifications</h2>
          </div>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex gap-3 p-4 bg-[#0f0f0f] border border-white/10 rounded-lg hover:border-green-400/20 transition-all">
                <span className="text-green-400/60 shrink-0">✓</span>
                <p className="text-white/60 text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
