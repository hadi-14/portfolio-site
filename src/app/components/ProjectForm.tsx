"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthHeader } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDesc?: string;
    techStack: string;
    category?: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
  };
  mode: "create" | "edit";
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    longDesc: initialData?.longDesc ?? "",
    techStack: initialData?.techStack ?? "",
    category: initialData?.category ?? "",
    githubUrl: initialData?.githubUrl ?? "",
    liveUrl: initialData?.liveUrl ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    featured: initialData?.featured ?? false,
  });

  const toSlug = (val: string) => val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
      if (name === "title" && mode === "create") {
        setForm((f) => ({ ...f, slug: toSlug(value) }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = mode === "create" ? "/api/projects" : `/api/projects/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const headers: any = { "Content-Type": "application/json" };
      const authHeader = await getAuthHeader();
      if (authHeader) headers["Authorization"] = authHeader;

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      router.push("/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(form.imageUrl || null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");
      try {
        const authHeader = await getAuthHeader();
        const fd = new FormData();
        fd.append("file", file, file.name);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: authHeader ? { Authorization: authHeader } : undefined,
          body: fd,
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Upload failed");
        }
        const data = await res.json();
        setForm((f) => ({ ...f, imageUrl: data.publicUrl }));
        setPreview(data.publicUrl);
      } catch (err: any) {
        setError(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [setForm]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const inputClass =
    "w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-green-400/50 transition-colors";
  const labelClass = "block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="My Awesome Project" />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="my-awesome-project" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={2} className={inputClass} placeholder="One or two sentence overview..." />
      </div>

      <div>
        <label className={labelClass}>Full Description</label>
        <textarea name="longDesc" value={form.longDesc} onChange={handleChange} rows={5} className={inputClass} placeholder="Detailed description, challenges, solutions..." />
      </div>

      <div>
        <label className={labelClass}>Tech Stack * (comma-separated)</label>
        <input name="techStack" value={form.techStack} onChange={handleChange} required className={inputClass} placeholder="Next.js, TypeScript, PostgreSQL, Prisma" />
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <input name="category" value={form.category} onChange={handleChange} className={inputClass} placeholder="Web Development, Mobile App, etc." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} type="url" className={inputClass} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className={labelClass}>Live URL</label>
          <input name="liveUrl" value={form.liveUrl} onChange={handleChange} type="url" className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className={labelClass}>Image</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-4 text-sm text-white/60 flex items-center justify-center flex-col gap-2"
        >
          {preview ? (
            <img src={preview} alt="preview" className="max-h-44 object-contain rounded" />
          ) : (
            <div className="text-white/30">Drag & drop an image here, or</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 text-sm text-white/50" />
          {uploading && <div className="text-xs text-white/40 mt-2">Uploading...</div>}
        </div>
        <div className="mt-2">
          <label className="text-xs font-mono text-white/40">Or use image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} type="url" className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={form.featured}
          onChange={handleChange}
          className="w-4 h-4 rounded accent-green-400"
        />
        <label htmlFor="featured" className="text-sm text-white/50 font-mono">
          Mark as featured (shows on homepage)
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-green-400/10 border border-green-400/30 hover:bg-green-400/20 text-green-400 px-6 py-2.5 rounded-lg text-sm font-mono transition-all duration-200 disabled:opacity-50"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {mode === "create" ? "Create Project" : "Save Changes"}
      </button>
    </form>
  );
}
