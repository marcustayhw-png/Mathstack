import fs from "fs";
import path from "path";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  level: string;
  subject: string;
  chapter_id: string;
  chapter_title: string;
  pdf_url: string;
  created_at: string;
  updated_at: string;
};

function filePath(type: "notes" | "practice") {
  return path.join(process.cwd(), "data", `${type}.json`);
}

function readAll(type: "notes" | "practice"): ContentItem[] {
  try {
    const p = filePath(type);
    if (!fs.existsSync(p)) return [];
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(type: "notes" | "practice", items: ContentItem[]): void {
  const p = filePath(type);
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(items, null, 2), "utf-8");
}

export function getItems(
  type: "notes" | "practice",
  filters?: { level?: string; subject?: string; chapter_id?: string }
): ContentItem[] {
  let items = readAll(type);
  if (filters?.level) items = items.filter((i) => i.level === filters.level);
  if (filters?.subject) items = items.filter((i) => i.subject === filters.subject);
  if (filters?.chapter_id) items = items.filter((i) => i.chapter_id === filters.chapter_id);
  return items.sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export function createItem(
  type: "notes" | "practice",
  data: Omit<ContentItem, "id" | "created_at" | "updated_at">
): ContentItem {
  const items = readAll(type);
  const now = new Date().toISOString();
  const item: ContentItem = {
    ...data,
    id: `${type}-${Date.now()}`,
    created_at: now,
    updated_at: now,
  };
  items.push(item);
  writeAll(type, items);
  return item;
}

export function updateItem(
  type: "notes" | "practice",
  id: string,
  data: Partial<Omit<ContentItem, "id" | "created_at">>
): ContentItem | null {
  const items = readAll(type);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data, updated_at: new Date().toISOString() };
  writeAll(type, items);
  return items[idx];
}

export function deleteItem(type: "notes" | "practice", id: string): boolean {
  const items = readAll(type);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeAll(type, filtered);
  return true;
}
