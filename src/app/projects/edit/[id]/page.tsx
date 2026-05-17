import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "@/app/components/ProjectForm";
import { Lock } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Edit Project | Abdul Hadi Millwala",
};

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) notFound();

    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-mono text-white/30 hover:text-white/60 transition-colors mb-6"
                >
                    <ArrowLeft size={14} />
                    Back to project
                </Link>

                <div className="flex items-center gap-2 text-white/20 font-mono text-sm mb-3">
                    <Lock size={14} />
                    <span>admin panel</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
                <p className="text-white/30 text-sm mb-10">Update project details, upload a new image, or manage metadata.</p>

                <ProjectForm mode="edit" initialData={project} />
            </div>
        </main>
    );
}
