import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

function isAuthorized(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const token = req.headers.get("x-admin-token");
  return Boolean(adminPassword) && token === adminPassword;
}

function safeFileName(name: string) {
  const cleanName = name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${Date.now()}-${cleanName || "upload"}.pdf`;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin password is not configured. Add ADMIN_PASSWORD to .env.local and restart the dev server." },
        { status: 500 }
      );
    }

    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 20MB" }, { status: 400 });
    }

    // On Vercel: write to /tmp (writable), locally: write to public/uploads
    const uploadDir = process.env.VERCEL
      ? path.join("/tmp", "uploads")
      : path.join(process.cwd(), "public", "uploads");

    const fileName = safeFileName(file.name);
    const destPath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(destPath, Buffer.from(bytes));

    // On Vercel, the file is in /tmp so it can't be served as a static asset.
    // Return a serving route or the local path.
    if (process.env.VERCEL) {
      return NextResponse.json({ fileUrl: `/api/admin/upload?file=${fileName}` });
    }

    return NextResponse.json({ fileUrl: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}

/** Serve uploaded PDFs from /tmp on Vercel */
export async function GET(req: NextRequest) {
  const fileName = new URL(req.url).searchParams.get("file");
  if (!fileName) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  // Sanitize: only allow alphanumeric, dash, underscore, dot
  if (!/^[\w.-]+$/.test(fileName)) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
  }

  const filePath = path.join("/tmp", "uploads", fileName);

  try {
    const { readFile } = await import("fs/promises");
    const data = await readFile(filePath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
