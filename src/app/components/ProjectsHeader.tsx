"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Plus } from "lucide-react";

interface ProjectsHeaderProps {
    projectCount: number;
}

export default function ProjectsHeader({ projectCount }: ProjectsHeaderProps) {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        getSession()
            .then((s) => {
                if (mounted) setSession(s);
            })
            .catch(() => { })
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 text-green-400/60 font-mono text-sm mb-3">
                <span>~/projects</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Project Directory</h1>
            <p className="text-white/40 max-w-xl text-base">
                A curated list of things I&apos;ve built — from full-stack web apps to data pipelines and mobile apps.
            </p>
            <div className="mt-6 flex items-center gap-4">
                {session && !loading && (
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 hover:bg-green-400/20 transition-all duration-200"
                    >
                        <Plus size={14} />
                        Add Project
                    </Link>
                )}
                <span className="text-white/20 text-sm font-mono">{projectCount} projects</span>
            </div>
        </div>
    );
}
