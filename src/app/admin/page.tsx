import ProjectForm from "@/app/components/ProjectForm";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Admin | Abdul Hadi Millwala",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-white/20 font-mono text-sm mb-3">
          <Lock size={14} />
          <span>admin panel</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Add New Project</h1>
        <p className="text-white/30 text-sm mb-10">
          Fill in the details below. Required fields are marked with *.
        </p>
        <ProjectForm mode="create" />
      </div>
    </main>
  );
}
