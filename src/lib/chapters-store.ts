import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "chapters.json");

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
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(chapters: DbChapter[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(chapters, null, 2), "utf-8");
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
