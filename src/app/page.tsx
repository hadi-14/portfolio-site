import AsciiArt from "./components/AsciiArt";
import AnimatedHeading from "./components/AnimatedHeading";
import ProjectCard from "./components/ProjectCard";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { skills, experience, education, certifications, contactCards, socialLinks } from "@/lib/resumeData";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProjects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative pt-20 pb-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="flex-1 max-w-xl">
            <p className="font-mono text-green-400/70 text-sm mb-4 tracking-widest uppercase">
              &gt; Abdul Hadi Millwala
            </p>
            <AnimatedHeading />
            <p className="text-white/40 mt-5 leading-relaxed text-sm md:text-base">
              I am a dedicated software engineer passionate about creating solutions that improve lives. My expertise spans website development, mobile app development, data engineering, AI, and automation. Skilled in Python, Flutter, Next.js, and Unity — I deliver reliable, punctual, and high-quality services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-mono hover:bg-green-400/20 transition-all duration-200"
              >
                View Projects <ArrowRight size={14} />
              </Link>
              <a
                href="mailto:hadimillwala@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm font-mono hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Mail size={14} /> Get in Touch
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <AsciiArt />
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-20 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/skills</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Skills Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 hover:border-green-400/30 transition-all duration-300"
              >
                <h3 className="text-xs font-mono text-green-400/70 uppercase tracking-wider mb-3">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section id="projects" className="py-20 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/projects</p>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Projects</h2>
            <Link href="/projects" className="text-sm font-mono text-white/30 hover:text-green-400 transition-colors flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          {featuredProjects.length === 0 ? (
            <div className="text-center py-16 text-white/20 text-sm font-mono">
              No featured projects yet. <Link href="/admin" className="text-green-400/50 hover:text-green-400">Add some →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  slug={p.slug}
                  description={p.description}
                  techStack={p.techStack}
                  githubUrl={p.githubUrl}
                  liveUrl={p.liveUrl}
                  featured={p.featured}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/experience</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.role} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6 hover:border-green-400/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{e.role}</h3>
                    <p className="text-green-400/70 font-mono text-sm">{e.company}</p>
                  </div>
                  <span className="text-white/30 font-mono text-xs mt-1 md:mt-0">{e.period}</span>
                </div>
                <ul className="space-y-2">
                  {e.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/50">
                      <span className="text-green-400/50 mt-0.5 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & CERTS ── */}
      <section id="education" className="py-20 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/education</p>
            <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.school} className="flex gap-4 items-start bg-[#0f0f0f] border border-white/10 rounded-xl p-4">
                  <GraduationCap size={20} className="text-green-400/60 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium text-sm">{e.school}</h3>
                    <p className="text-white/40 text-xs font-mono">{e.level} · {e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/certifications</p>
            <h2 className="text-2xl font-bold text-white mb-6">Certifications</h2>
            <div className="space-y-3">
              {certifications.map((c, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Award size={14} className="text-green-400/60 shrink-0 mt-0.5" />
                  <p className="text-white/50 text-sm">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-green-400/60 text-xs uppercase tracking-widest mb-2">~/contact</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactCards.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex gap-4 items-start bg-[#0f0f0f] border border-white/10 rounded-xl p-5 hover:border-green-400/30 transition-all duration-300 group"
              >
                <Icon size={18} className="text-green-400/60 shrink-0 mt-0.5 group-hover:text-green-400 transition-colors" />
                <div>
                  <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white/70 text-sm">{value}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <a href={socialLinks[0].href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
              <GitBranch size={14} /> {socialLinks[0].label}
            </a>
            <a href={socialLinks[1].href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
              <ExternalLink size={14} /> {socialLinks[1].label}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 md:px-12 text-center">
        <p className="text-white/20 text-xs font-mono">
          © {new Date().getFullYear()} Abdul Hadi Millwala · Built with Next.js, Tailwind CSS & Prisma
        </p>
      </footer>
    </>
  );
}
