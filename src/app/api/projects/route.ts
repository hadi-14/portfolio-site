import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await validateAdminAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, description, longDesc, techStack, category, githubUrl, liveUrl, imageUrl, featured } = body;

    if (!title || !slug || !description || !techStack) {
      return NextResponse.json({ error: "Missing required fields: title, slug, description, techStack" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: { title, slug, description, longDesc, techStack, category, githubUrl, liveUrl, imageUrl, featured: featured ?? false },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
