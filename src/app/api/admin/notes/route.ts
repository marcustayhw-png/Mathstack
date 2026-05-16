import { NextRequest, NextResponse } from "next/server";
import { getItems, createItem, updateItem, deleteItem } from "@/lib/content-store";

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  return NextResponse.json(getItems("notes", {
    level: searchParams.get("level") ?? undefined,
    subject: searchParams.get("subject") ?? undefined,
    chapter_id: searchParams.get("chapter_id") ?? undefined,
  }));
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, description, level, subject, chapter_id, chapter_title, pdf_url } = body;
  if (!title || !level || !subject || !chapter_id || !chapter_title)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  return NextResponse.json(createItem("notes", { title, description: description || "", level, subject, chapter_id, chapter_title, pdf_url: pdf_url || "" }));
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const body = await req.json();
  const updated = updateItem("notes", id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  if (!deleteItem("notes", id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
