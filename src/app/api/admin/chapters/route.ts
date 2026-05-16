import { NextRequest, NextResponse } from "next/server";
import {
  getChapters,
  createChapter,
  updateChapter,
  bulkUpdateSortOrder,
  deleteChapter,
} from "@/lib/chapters-store";

function isAuthorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") ?? undefined;
  const subject = searchParams.get("subject") ?? undefined;

  return NextResponse.json(getChapters({ level, subject }));
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, level, subject, code, strand, title, description, sort_order } = body;

  if (!level || !subject || !code || !strand || !title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const chapterId =
    id ||
    `${level}-${title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}-${Date.now()}`;

  const chapter = createChapter({
    id: chapterId,
    level,
    subject,
    code,
    strand,
    title,
    description: description || "",
    sort_order: sort_order ?? 0,
  });

  return NextResponse.json(chapter);
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const { code, strand, title, description, sort_order } = body;

  const updated = updateChapter(id, { code, strand, title, description, sort_order });
  if (!updated) return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { updates } = body as { updates: { id: string; sort_order: number }[] };
  if (!Array.isArray(updates)) return NextResponse.json({ error: "updates array required" }, { status: 400 });

  bulkUpdateSortOrder(updates);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const deleted = deleteChapter(id);
  if (!deleted) return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
