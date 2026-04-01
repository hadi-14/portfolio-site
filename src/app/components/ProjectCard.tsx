"use client";

import Link from "next/link";
import { ExternalLink, GitBranch, Tag } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  slug,
  description,
  techStack,
  githubUrl,
  liveUrl,
  featured,
}: ProjectCardProps) {
  const tags = techStack.split(",").map((t) => t.trim());

  return (
    <div className="group relative flex flex-col h-full bg-[#0f0f0f] border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.08)]">
      {featured && (
        <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/30">
          featured
        </span>
      )}
      <Link href={`/projects/${slug}`} className="flex-1">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{description}</p>
      </Link>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/10"
          >
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200"
          >
            <GitBranch size={14} />
            Code
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-green-400/70 hover:text-green-400 transition-colors duration-200"
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
      </div>
    </div>
  );
}
