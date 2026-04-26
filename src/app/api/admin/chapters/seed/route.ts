import { NextRequest, NextResponse } from "next/server";
import { upsertChapters } from "@/lib/chapters-store";
import { SYLLABUS } from "@/app/notes/syllabus-data";

function isAuthorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows: {
    id: string;
    level: string;
    subject: string;
    code: string;
    strand: string;
    title: string;
    description: string;
    sort_order: number;
  }[] = [];

  let order = 0;
  const levels = ["sec1", "sec2", "sec34"] as const;

  for (const level of levels) {
    const levelData = SYLLABUS[level];
    for (const [subject, chapters] of Object.entries(levelData)) {
      if (!Array.isArray(chapters)) continue;
      for (const ch of chapters) {
        rows.push({
          id: ch.id,
          level,
          subject,
          code: ch.code,
          strand: ch.strand,
          title: ch.title,
          description: ch.desc,
          sort_order: order++,
        });
      }
    }
  }

  const seeded = upsertChapters(rows);
  return NextResponse.json({ ok: true, seeded: rows.length });
}
