"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Edit2, Trash2 } from "lucide-react";

interface AdminControlsProps {
    projectId: string;
}

export default function AdminControls({ projectId }: AdminControlsProps) {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    if (loading || !session) return null;

    const handleDelete = async () => {
        if (!confirm("Delete this project? This cannot be undone.")) return;
        try {
            const authHeader = await import("@/lib/auth").then((m) => m.getAuthHeader());
            const headers: any = {};
            if (authHeader) headers["Authorization"] = authHeader;

            const res = await fetch(`/api/projects/${projectId}`, {
                method: "DELETE",
                headers,
            });
            if (!res.ok) throw new Error("Delete failed");
            router.push("/projects");
            router.refresh();
        } catch (err: any) {
            alert(err.message || "Delete failed");
        }
    };

    return (
        <div className="flex items-center gap-2 mt-6">
            <a
                href={`/projects/edit/${projectId}`}
                className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-blue-400/10 border border-blue-400/30 text-blue-400 hover:bg-blue-400/20 transition-all"
            >
                <Edit2 size={14} />
                Edit
            </a>
            <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-red-400/10 border border-red-400/30 text-red-400 hover:bg-red-400/20 transition-all"
            >
                <Trash2 size={14} />
                Delete
            </button>
        </div>
    );
}
