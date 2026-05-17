"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/app/components/ProjectForm";
import { Lock } from "lucide-react";
import { signInWithPassword, signOut, getSession } from "@/lib/auth";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await signInWithPassword(email, password);
      if (res?.error) throw res.error;
      // refresh session
      const s = await getSession();
      setSession(s);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-white/20 font-mono text-sm mb-3">
          <Lock size={14} />
          <span>admin panel</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
        <p className="text-white/30 text-sm mb-6">Manage projects — create, edit, and upload images.</p>

        {loading ? (
          <div className="text-white/40">Checking session...</div>
        ) : session ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-white/60">Signed in</div>
              <button onClick={handleSignOut} className="text-sm text-red-400 font-mono underline">
                Sign out
              </button>
            </div>
            <h2 className="text-2xl text-white font-semibold mb-2">Add New Project</h2>
            <p className="text-white/30 mb-6">Fill in the fields and use the image uploader below.</p>
            <ProjectForm mode="create" />
          </div>
        ) : (
          <div className="max-w-md">
            {error && <div className="p-3 rounded bg-red-500/10 text-red-400 mb-3">{error}</div>}
            <form onSubmit={handleSignIn} className="space-y-3">
              <label className="block text-xs font-mono text-white/40">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80" />
              <label className="block text-xs font-mono text-white/40">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80" />
              <div className="flex items-center justify-between">
                <button disabled={loading} type="submit" className="mt-3 bg-green-400/10 border border-green-400/30 px-4 py-2 rounded text-green-400 font-mono text-sm">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
