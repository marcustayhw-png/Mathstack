import { NotesClient } from "./NotesClient";

export const metadata = {
  title: "Notes | MathStack",
  description: "Comprehensive mathematics notes for Secondary 1 to 4, covering E Math and A Math.",
};

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Mathematics Notes
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl">
            Comprehensive notes organised by level and chapter, aligned to the Singapore secondary school syllabus.
          </p>
        </div>
        <NotesClient />
      </div>
    </div>
  );
}
