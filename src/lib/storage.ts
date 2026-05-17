import supabaseServer from "@/lib/supabase-server";

const storageProvider = process.env.STORAGE_PROVIDER ?? "supabase";

async function uploadImageSupabase(file: File) {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `${crypto.randomUUID()}-${safeName}`;
    const bucketName = process.env.SUPABASE_IMAGE_BUCKET ?? "project-images";

    const { error } = await supabaseServer.storage.from(bucketName).upload(filePath, file.stream(), {
        contentType: file.type,
        upsert: true,
    });

    if (error) {
        throw new Error(error.message);
    }

    const { data } = supabaseServer.storage.from(bucketName).getPublicUrl(filePath);
    if (!data?.publicUrl) {
        throw new Error("Failed to get public URL for uploaded image.");
    }

    return data.publicUrl;
}

export async function uploadImage(file: File) {
    if (storageProvider === "supabase") {
        return uploadImageSupabase(file);
    }
    throw new Error(`Unsupported storage provider: ${storageProvider}`);
}
