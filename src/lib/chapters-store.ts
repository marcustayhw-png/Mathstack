import fs from "fs";
import path from "path";

const BUNDLED_FILE = path.join(process.cwd(), "data", "chapters.json");

function writableFile() {
  if (process.env.VERCEL) return path.join("/tmp", "chapters.json");
  return BUNDLED_FILE;
}

export type DbChapter = {
  id: string;
  level: string;
  subject: string;
  code: string;
  strand: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function readAll(): DbChapter[] {
  try {
    // On Vercel: prefer /tmp (has latest writes), fall back to bundled data
    const tmpPath = path.join("/tmp", "chapters.json");
    if (process.env.VERCEL && fs.existsSync(tmpPath)) {
      return JSON.parse(fs.readFileSync(tmpPath, "utf-8"));
    }
    if (!fs.existsSync(BUNDLED_FILE)) return [];
    return JSON.parse(fs.readFileSync(BUNDLED_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(chapters: DbChapter[]): void {
  const p = writableFile();
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(chapters, null, 2), "utf-8");
}

export function getChapters(filters?: { level?: string; subject?: string }): DbChapter[] {
  let chapters = readAll();
  if (filters?.level) chapters = chapters.filter((c) => c.level === filters.level);
  if (filters?.subject) chapters = chapters.filter((c) => c.subject === filters.subject);
  return chapters.sort((a, b) => a.sort_order - b.sort_order || a.created_at.localeCompare(b.created_at));
}

export function getChapterById(id: string): DbChapter | null {
  return readAll().find((c) => c.id === id) ?? null;
}

export function createChapter(data: Omit<DbChapter, "created_at" | "updated_at">): DbChapter {
  const chapters = readAll();
  const now = new Date().toISOString();
  const chapter: DbChapter = { ...data, created_at: now, updated_at: now };
  chapters.push(chapter);
  writeAll(chapters);
  return chapter;
}

export function updateChapter(
  id: string,
  data: Partial<Omit<DbChapter, "id" | "created_at">>
): DbChapter | null {
  const chapters = readAll();
  const idx = chapters.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  chapters[idx] = { ...chapters[idx], ...data, updated_at: new Date().toISOString() };
  writeAll(chapters);
  return chapters[idx];
}

export function deleteChapter(id: string): boolean {
  const chapters = readAll();
  const filtered = chapters.filter((c) => c.id !== id);
  if (filtered.length === chapters.length) return false;
  writeAll(filtered);
  return true;
}

export function bulkUpdateSortOrder(updates: { id: string; sort_order: number }[]): void {
  const chapters = readAll();
  for (const { id, sort_order } of updates) {
    const idx = chapters.findIndex((c) => c.id === id);
    if (idx !== -1) chapters[idx] = { ...chapters[idx], sort_order, updated_at: new Date().toISOString() };
  }
  writeAll(chapters);
}

export function upsertChapters(rows: Omit<DbChapter, "created_at" | "updated_at">[]): number {
  const chapters = readAll();
  const now = new Date().toISOString();
  let upserted = 0;
  for (const row of rows) {
    const idx = chapters.findIndex((c) => c.id === row.id);
    if (idx !== -1) {
      chapters[idx] = { ...chapters[idx], ...row, updated_at: now };
    } else {
      chapters.push({ ...row, created_at: now, updated_at: now });
      upserted++;
    }
  }
  writeAll(chapters);
  return upserted;
}
