import { NextResponse } from "next/server";
import { validateAdminAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";

export async function POST(request: Request) {
    const user = await validateAdminAuth(request);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: "Missing file upload." }, { status: 400 });
    }

    try {
        const publicUrl = await uploadImage(file);
        return NextResponse.json({ publicUrl });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Upload failed." }, { status: 500 });
    }
}
