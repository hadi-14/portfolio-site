import prisma from "@/lib/prisma";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectsHeader from "@/app/components/ProjectsHeader";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Abdul Hadi Millwala",
  description: "A directory of projects built by Abdul Hadi — full-stack web apps, data systems, and more.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const categories = Object.keys(groupedProjects).sort();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ProjectsHeader projectCount={projects.length} />

        {projects.length === 0 ? (
          <div className="text-center py-24">
            <FolderOpen size={48} className="mx-auto mb-4 text-white/10" />
            <p className="text-white/30 font-mono">No projects yet.</p>
            <Link href="/admin" className="mt-4 inline-block text-green-400 text-sm hover:underline">
              Add your first project →
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-green-400/60 font-mono text-sm">[{category}]</span>
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupedProjects[category].map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
