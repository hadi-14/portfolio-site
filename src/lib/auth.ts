const authProvider = process.env.AUTH_PROVIDER ?? "supabase";

async function getSupabaseSession() {
    if (typeof window === "undefined") return null;
    const module = await import("@/lib/supabase-browser");
    const supabaseBrowser = module.default;
    const { data, error } = await supabaseBrowser.auth.getSession();
    if (error) throw error;
    return data.session;
}

export async function signInWithPassword(email: string, password: string) {
    if (authProvider === "supabase") {
        const module = await import("@/lib/supabase-browser");
        const supabaseBrowser = module.default;
        return supabaseBrowser.auth.signInWithPassword({ email, password });
    }
    throw new Error(`Unsupported auth provider: ${authProvider}`);
}

export async function signOut() {
    if (authProvider === "supabase") {
        const module = await import("@/lib/supabase-browser");
        const supabaseBrowser = module.default;
        return supabaseBrowser.auth.signOut();
    }
    throw new Error(`Unsupported auth provider: ${authProvider}`);
}

export async function getSession() {
    if (authProvider === "supabase") {
        return getSupabaseSession();
    }
    throw new Error(`Unsupported auth provider: ${authProvider}`);
}

export async function getAuthHeader() {
    const session = await getSession();
    return session?.access_token ? `Bearer ${session.access_token}` : null;
}

export async function validateAdminAuth(request: Request) {
    if (authProvider === "supabase") {
        const module = await import("@/lib/supabase-server");
        return module.validateAdminAuth(request as any);
    }
    throw new Error(`Unsupported auth provider: ${authProvider}`);
}
