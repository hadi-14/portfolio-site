import prisma from "@/lib/prisma";
import ProjectCard from "@/app/components/ProjectCard";
import Link from "next/link";
import { FolderOpen, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Abdul Hadi Millwala",
  description: "A directory of projects built by Abdul Hadi — full-stack apps, data systems, and more.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-green-400/60 font-mono text-sm mb-3">
            <FolderOpen size={16} />
            <span>~/projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Project Directory
          </h1>
          <p className="text-white/40 max-w-xl text-base">
            A curated list of things I&apos;ve built — from full-stack web apps to data pipelines and mobile apps.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 hover:bg-green-400/20 transition-all duration-200"
            >
              <Plus size={14} />
              Add Project
            </Link>
            <span className="text-white/20 text-sm font-mono">{projects.length} projects</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-24">
            <FolderOpen size={48} className="mx-auto mb-4 text-white/10" />
            <p className="text-white/30 font-mono">No projects yet.</p>
            <Link href="/admin" className="mt-4 inline-block text-green-400 text-sm hover:underline">
              Add your first project →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
