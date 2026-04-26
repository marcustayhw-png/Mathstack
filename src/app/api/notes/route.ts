import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/content-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return NextResponse.json(getItems("notes", {
    level: searchParams.get("level") ?? undefined,
    subject: searchParams.get("subject") ?? undefined,
    chapter_id: searchParams.get("chapter_id") ?? undefined,
  }));
}
