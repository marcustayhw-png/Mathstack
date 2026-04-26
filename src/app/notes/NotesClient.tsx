"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, Sprout, TrendingUp, GraduationCap, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HapticButton } from "@/components/ui/haptic-button";
import { cn } from "@/lib/utils";
import { LEVEL_LABELS, type Level, type Subject } from "./syllabus-data";

type Chapter = {
  id: string;
  title: string;
  code: string;
  strand: string;
  description: string;
  desc?: string; // compat alias
};

type Step = "level" | "subject" | "chapter" | "content";

const LEVELS: {
  id: Level;
  desc: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  iconColor: string;
  badge: string;
}[] = [
  {
    id: "sec1",
    desc: "Numbers, Algebra, Geometry fundamentals",
    icon: Sprout,
    color: "from-sky-500/15 to-sky-600/5",
    iconBg: "bg-sky-500/10 group-hover:bg-sky-500/20",
    iconColor: "text-sky-600",
    badge: "Sec 1",
  },
  {
    id: "sec2",
    desc: "Quadratics, Trigonometry, Probability",
    icon: TrendingUp,
    color: "from-violet-500/15 to-violet-600/5",
    iconBg: "bg-violet-500/10 group-hover:bg-violet-500/20",
    iconColor: "text-violet-600",
    badge: "Sec 2",
  },
  {
    id: "sec34",
    desc: "O-Level prep: Circles, Calculus, Coordinate Geometry",
    icon: GraduationCap,
    color: "from-emerald-500/15 to-emerald-600/5",
    iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    iconColor: "text-emerald-600",
    badge: "Sec 3 – 4",
  },
];

const SUBJECTS: { id: Subject; desc: string; color: string; gradient: string; textColor: string }[] = [
  {
    id: "E Math",
    desc: "Core mathematics covering Number & Algebra, Geometry & Measurement, Statistics & Probability",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-600/5",
    textColor: "text-blue-600",
  },
  {
    id: "A Math",
    desc: "Additional Mathematics covering Algebra, Geometry & Trigonometry, and Calculus",
    color: "text-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    textColor: "text-emerald-600",
  },
];

const STRAND_COLORS: Record<string, { bg: string; text: string }> = {
  "Number & Algebra": { bg: "bg-blue-500/10", text: "text-blue-600" },
  "Geometry & Measurement": { bg: "bg-purple-500/10", text: "text-purple-600" },
  "Statistics & Probability": { bg: "bg-orange-500/10", text: "text-orange-600" },
  "Algebra": { bg: "bg-emerald-500/10", text: "text-emerald-600" },
  "Geometry & Trigonometry": { bg: "bg-pink-500/10", text: "text-pink-600" },
  "Calculus": { bg: "bg-red-500/10", text: "text-red-600" },
};

export function NotesClient() {
  const [step, setStep] = useState<Step>("level");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [notes, setNotes] = useState<{ id: string; title: string; description: string; pdf_url: string }[]>([]);
  const [practiceItems, setPracticeItems] = useState<{ id: string; title: string; description: string; pdf_url: string }[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setSelectedSubject(null);
    setSelectedChapter(null);
    // Sec 1 and Sec 2 have no subject choice — go straight to chapters
    if (level === "sec1" || level === "sec2") {
      setStep("chapter");
    } else {
      setStep("subject");
    }
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
    setStep("chapter");
  };

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setNotes([]);
    setPracticeItems([]);
    setStep("content");
  };

  const handleBackToLevel = () => {
    setSelectedLevel(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setStep("level");
  };

  const handleBackToSubject = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setStep("subject");
  };

  const handleBackToChapter = () => {
    setSelectedChapter(null);
    setStep("chapter");
  };

  const fetchChapters = useCallback(async () => {
    if (!selectedLevel) return;
    const subject = selectedLevel === "sec34" ? (selectedSubject || null) : "only";
    if (selectedLevel === "sec34" && !subject) return; // wait for subject selection
    setChaptersLoading(true);
    try {
      const params = new URLSearchParams({ level: selectedLevel, subject: subject! });
      const res = await fetch(`/api/chapters?${params}`);
      if (res.ok) {
        const data = await res.json();
        setChapters(data);
      }
    } catch { /* silently fail */ }
    finally { setChaptersLoading(false); }
  }, [selectedLevel, selectedSubject]);

  useEffect(() => {
    if (step === "chapter") fetchChapters();
  }, [step, fetchChapters]);

  useEffect(() => {
    if (step !== "content" || !selectedChapter) return;
    setContentLoading(true);
    const params = new URLSearchParams({ chapter_id: selectedChapter.id });
    Promise.all([
      fetch(`/api/notes?${params}`).then((r) => r.ok ? r.json() : []),
      fetch(`/api/practice?${params}`).then((r) => r.ok ? r.json() : []),
    ]).then(([n, p]) => {
      setNotes(n);
      setPracticeItems(p);
    }).finally(() => setContentLoading(false));
  }, [step, selectedChapter]);

  // Group chapters by strand
  const chaptersByStrand = chapters.reduce<Record<string, Chapter[]>>((acc, ch) => {
    if (!acc[ch.strand]) acc[ch.strand] = [];
    acc[ch.strand].push(ch);
    return acc;
  }, {});

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">

        {/* ─── Step 1: Select Level ─── */}
        {step === "level" && (
          <motion.div
            key="level"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Select Your Level
              </h2>
              <p className="text-muted-foreground font-medium">
                Choose your secondary school level to get started
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {LEVELS.map((level, idx) => (
                <motion.div
                  key={level.id}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card
                    className="relative h-full border-2 border-border/50 cursor-pointer overflow-hidden group hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl bg-card"
                    onClick={() => handleLevelSelect(level.id)}
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", level.color)} />
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-5 relative z-10">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3", level.iconBg)}>
                        <level.icon className={cn("w-8 h-8 transition-colors duration-300", level.iconColor)} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className={cn("text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-widest", level.iconBg, level.iconColor)}>
                            {level.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {LEVEL_LABELS[level.id]}
                        </h3>
                        <p className="text-muted-foreground font-medium text-sm">
                          {level.desc}
                        </p>
                      </div>
                      <div className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300 text-sm">
                        Browse Notes
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Step 2: Select Subject (Sec 3-4 only) ─── */}
        {step === "subject" && (
          <motion.div
            key="subject"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <HapticButton
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToLevel}
                  className="rounded-full hover:bg-muted"
                >
                  <ArrowLeft className="w-6 h-6" />
                </HapticButton>
                <Badge variant="secondary" className="px-4 py-1 text-sm font-bold uppercase tracking-wider">
                  {selectedLevel && LEVEL_LABELS[selectedLevel]}
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Choose Your Subject
              </h2>
              <p className="text-muted-foreground font-medium">
                Select E Math (compulsory) or A Math (elective)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {SUBJECTS.map((subject) => (
                <motion.div
                  key={subject.id}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="relative h-full border-2 border-border/50 cursor-pointer overflow-hidden group hover:border-primary transition-all duration-500 shadow-sm hover:shadow-2xl bg-card"
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", subject.gradient)} />
                    <CardContent className="p-8 md:p-10 flex flex-col items-center text-center space-y-6 relative z-10">
                      <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                        <span className={cn("text-3xl font-black", subject.textColor)}>
                          {subject.id === "E Math" ? "E" : "A"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight">{subject.id}</h3>
                        <p className="text-muted-foreground font-medium text-sm md:text-base">
                          {subject.desc}
                        </p>
                      </div>
                      <div className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Browse Notes
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Step 3: Select Chapter ─── */}
        {step === "chapter" && (
          <motion.div
            key="chapter"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <HapticButton
                  variant="ghost"
                  size="icon"
                  onClick={selectedSubject ? handleBackToSubject : handleBackToLevel}
                  className="rounded-full hover:bg-muted"
                >
                  <ArrowLeft className="w-6 h-6" />
                </HapticButton>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-bold uppercase tracking-wider">
                  {selectedLevel && LEVEL_LABELS[selectedLevel]}
                </Badge>
                {selectedSubject && (
                  <Badge className="px-3 py-1 text-sm font-bold uppercase tracking-wider bg-primary/10 text-primary border-none">
                    {selectedSubject}
                  </Badge>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Select a Chapter
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {Object.entries(chaptersByStrand).map(([strand, strandChapters]) => {
                const colors = STRAND_COLORS[strand] || { bg: "bg-muted", text: "text-muted-foreground" };
                return (
                  <div key={strand} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest", colors.bg, colors.text)}>
                        {strand}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {strandChapters.map((chapter, idx) => (
                        <motion.div
                          key={chapter.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                        >
                          <button
                            onClick={() => handleChapterSelect(chapter)}
                            className="w-full p-5 md:p-6 rounded-2xl border-2 border-border/50 bg-card hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center justify-between group relative overflow-hidden text-left"
                          >
                            <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            <div className="flex items-center gap-4 relative z-10">
                              <span className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xs font-black group-hover:bg-primary group-hover:text-primary-foreground transition-colors", colors.bg, colors.text)}>
                                {chapter.code}
                              </span>
                              <div>
                                <span className="font-bold md:text-lg block">{chapter.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{chapter.desc}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all relative z-10 flex-shrink-0 ml-2" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Step 4: Chapter Content ─── */}
        {step === "content" && selectedChapter && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            {/* Back nav */}
            <HapticButton
              variant="ghost"
              size="sm"
              onClick={handleBackToChapter}
              className="rounded-xl font-bold -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Chapters
            </HapticButton>

            {/* Chapter header */}
            <div className="rounded-2xl border-2 border-border/60 bg-card p-6 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                  STRAND_COLORS[selectedChapter.strand]?.bg ?? "bg-muted",
                  STRAND_COLORS[selectedChapter.strand]?.text ?? "text-muted-foreground"
                )}>
                  {selectedChapter.code}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {selectedLevel && LEVEL_LABELS[selectedLevel]}{selectedSubject && ` · ${selectedSubject}`}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{selectedChapter.title}</h2>
              {selectedChapter.desc && (
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedChapter.desc}</p>
              )}
            </div>

            {contentLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-8">

                {/* Notes section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-black text-base">Notes</span>
                      {notes.length > 0 && (
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{notes.length}</span>
                      )}
                    </div>
                  </div>
                  {notes.length === 0 ? (
                    <div className="py-10 text-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/10">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">Notes for this chapter haven&apos;t been uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {notes.map((note, idx) => (
                        <a
                          key={note.id}
                          href={note.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 bg-card hover:border-primary hover:bg-primary/5 hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                            <span className="text-xs font-black text-primary group-hover:text-primary-foreground transition-colors">{idx + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm">{note.title}</p>
                            {note.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{note.description}</p>}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                            Open PDF
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Practice section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="font-black text-base">Practice</span>
                    {practiceItems.length > 0 && (
                      <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full">{practiceItems.length}</span>
                    )}
                  </div>
                  {practiceItems.length === 0 ? (
                    <div className="py-10 text-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/10">
                      <ArrowRight className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">Practice papers haven&apos;t been uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {practiceItems.map((item, idx) => (
                        <a
                          key={item.id}
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 bg-card hover:border-emerald-500 hover:bg-emerald-500/5 hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                            <span className="text-xs font-black text-emerald-600 group-hover:text-white transition-colors">{idx + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm">{item.title}</p>
                            {item.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-emerald-600 transition-colors shrink-0">
                            Attempt
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
