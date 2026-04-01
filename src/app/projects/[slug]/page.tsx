import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch, Tag, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) notFound();

  const tags = project.techStack.split(",").map((t: string) => t.trim());
  const date = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-white/30 hover:text-white/60 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>

        <div className="mb-8">
          {project.featured && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/30 mb-3 inline-block">
              featured
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-white/50 text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <GitBranch size={14} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 hover:bg-green-400/20 transition-all"
            >
              <ExternalLink size={14} />
              Live Site
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        {project.longDesc && (
          <div className="prose prose-invert prose-sm max-w-none">
            <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3">About this project</h2>
            <div className="text-white/60 leading-relaxed whitespace-pre-wrap border-l-2 border-white/10 pl-4">
              {project.longDesc}
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-white/20 text-xs font-mono">
          <Calendar size={12} />
          Added {date}
        </div>
      </div>
    </main>
  );
}
