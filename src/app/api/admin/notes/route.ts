import { NextRequest, NextResponse } from "next/server";
import { getItems, createItem, updateItem, deleteItem } from "@/lib/content-store";

function isAuthorized(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  return Boolean(adminPassword) && req.headers.get("x-admin-token") === adminPassword;
}

function errorResponse(error: unknown, fallback: string, status = 500) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : fallback },
    { status }
  );
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);

  try {
    return NextResponse.json(await getItems("notes", {
      level: searchParams.get("level") ?? undefined,
      subject: searchParams.get("subject") ?? undefined,
      chapter_id: searchParams.get("chapter_id") ?? undefined,
    }));
  } catch (error) {
    return errorResponse(error, "Failed to fetch notes");
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, description, level, subject, chapter_id, chapter_title, pdf_url } = body;
    if (!title || !level || !subject || !chapter_id || !chapter_title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json(await createItem("notes", {
      title,
      description: description || "",
      level,
      subject,
      chapter_id,
      chapter_title,
      pdf_url: pdf_url || "",
    }));
  } catch (error) {
    return errorResponse(error, "Failed to save note");
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    const body = await req.json();
    const updated = await updateItem("notes", id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return errorResponse(error, "Failed to update note");
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    if (!(await deleteItem("notes", id))) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to delete note");
  }
}
