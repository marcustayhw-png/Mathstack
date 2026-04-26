import { NextRequest, NextResponse } from "next/server";
import { getChapters } from "@/lib/chapters-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") ?? undefined;
  const subject = searchParams.get("subject") ?? undefined;

  return NextResponse.json(getChapters({ level, subject }));
}
