import { NotesClient } from "./NotesClient";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Notes | Satori Education Studio",
  description: "Comprehensive mathematics notes for Secondary 1 to 4, covering E Math and A Math.",
};

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glows — full width, behind everything */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20 md:px-12 md:pt-24">
        {/* Page header */}
        <div className="mb-14 space-y-6 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/7 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Free Resource
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Mathematics Notes
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Clear, exam-focused notes organised by level and chapter — designed to feel calm, structured, and easy to navigate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {["Sec 1 & 2", "Sec 3 & 4", "E Math (4048)", "A Math (4049)"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm">
                <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <NotesClient />
      </div>
    </div>
  );
}
