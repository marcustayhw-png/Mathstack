"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronLeft, Sprout, TrendingUp, GraduationCap,
  Loader2, PenTool, ExternalLink,
  Hash, Calculator, Triangle, BarChart3, FunctionSquare, Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SYLLABUS, LEVEL_LABELS,
  type Level, type Subject, type Chapter,
} from "../notes/syllabus-data";

type Step = "level" | "subject" | "chapter" | "content";

const LEVELS = [
  {
    id: "sec1" as Level,
    desc: "Numbers, Algebra, Geometry fundamentals",
    icon: Sprout,
    badge: "Sec 1",
    gradient: "from-[oklch(0.88_0.04_148)/30] to-transparent",
    ring: "hover:border-[oklch(0.65_0.10_148)]",
    iconBg: "bg-[oklch(0.88_0.04_148)/50] group-hover:bg-[oklch(0.88_0.04_148)]",
    iconColor: "text-[oklch(0.35_0.09_148)]",
    pillBg: "bg-[oklch(0.88_0.04_148)/60]",
    pillText: "text-[oklch(0.30_0.09_148)]",
  },
  {
    id: "sec2" as Level,
    desc: "Quadratics, Trigonometry, Probability",
    icon: TrendingUp,
    badge: "Sec 2",
    gradient: "from-primary/15 to-transparent",
    ring: "hover:border-primary",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
    pillBg: "bg-primary/10",
    pillText: "text-primary",
  },
  {
    id: "sec34" as Level,
    desc: "O-Level prep · E Math & A Math",
    icon: GraduationCap,
    badge: "Sec 3–4",
    gradient: "from-[oklch(0.82_0.08_55)/30] to-transparent",
    ring: "hover:border-[oklch(0.62_0.12_55)]",
    iconBg: "bg-[oklch(0.82_0.08_55)/40] group-hover:bg-[oklch(0.82_0.08_55)]",
    iconColor: "text-[oklch(0.40_0.10_55)]",
    pillBg: "bg-[oklch(0.82_0.08_55)/50]",
    pillText: "text-[oklch(0.35_0.09_55)]",
  },
] as const;

const SUBJECTS = [
  {
    id: "E Math" as Subject,
    desc: "Core mathematics — Number & Algebra, Geometry & Measurement, Statistics & Probability",
    gradient: "from-primary/15 to-transparent",
    ring: "hover:border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "A Math" as Subject,
    desc: "Additional Mathematics — Algebra, Geometry & Trigonometry, Calculus",
    gradient: "from-[oklch(0.82_0.08_55)/30] to-transparent",
    ring: "hover:border-[oklch(0.62_0.12_55)]",
    iconBg: "bg-[oklch(0.82_0.08_55)/40]",
    iconColor: "text-[oklch(0.40_0.10_55)]",
  },
] as const;

const STRAND_META: Record<string, { icon: React.ElementType; bg: string; text: string }> = {
  "Number & Algebra":       { icon: Hash,            bg: "bg-primary/8",                 text: "text-primary"              },
  "Geometry & Measurement": { icon: Compass,         bg: "bg-[oklch(0.82_0.08_55)/30]",  text: "text-[oklch(0.40_0.10_55)]" },
  "Statistics & Probability":{ icon: BarChart3,      bg: "bg-[oklch(0.88_0.04_148)/40]", text: "text-[oklch(0.35_0.09_148)]" },
  "Algebra":                { icon: Calculator,      bg: "bg-primary/8",                 text: "text-primary"              },
  "Geometry & Trigonometry":{ icon: Triangle,        bg: "bg-[oklch(0.82_0.08_55)/30]",  text: "text-[oklch(0.40_0.10_55)]" },
  "Calculus":               { icon: FunctionSquare,  bg: "bg-[oklch(0.88_0.04_148)/40]", text: "text-[oklch(0.35_0.09_148)]" },
};
const FALLBACK = { icon: PenTool, bg: "bg-muted/40", text: "text-muted-foreground" };

const slideIn = {
  initial: { opacity: 0, x: 40, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0,  filter: "blur(0px)" },
  exit:    { opacity: 0, x: -30, filter: "blur(4px)" },
  transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
};
const popIn = {
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: { opacity: 1, scale: 1,    y: 0  },
  exit:    { opacity: 0, scale: 0.96, y: -8 },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
};
const staggerList = { animate: { transition: { staggerChildren: 0.06 } } };
const listItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

function Breadcrumb({
  step, level, subject, onLevel, onSubject,
}: {
  step: Step; level: Level | null; subject: Subject | null;
  onLevel: () => void; onSubject: () => void;
}) {
  const order: Step[] = ["level", "subject", "chapter", "content"];
  const currentIdx = order.indexOf(step);
  const crumbs = [
    { key: "level",   label: "Level",   onClick: level   ? onLevel   : undefined },
    { key: "subject", label: "Subject", onClick: subject ? onSubject : undefined },
    { key: "chapter", label: "Chapter" },
    { key: "content", label: "Practice" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {crumbs.map((c, i) => {
        if (c.key === "subject" && !subject && step !== "subject") return null;
        const done   = order.indexOf(c.key as Step) < currentIdx;
        const active = c.key === step;
        return (
          <motion.span key={c.key} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted-foreground/30 text-xs">›</span>}
            <button
              onClick={c.onClick}
              disabled={!c.onClick || active}
              className={cn(
                "rounded-full border border-transparent px-3 py-1.5 text-xs font-bold tracking-wide transition-all",
                active ? "border-primary/20 bg-primary/8 text-primary" : "",
                done   ? "text-muted-foreground hover:border-border hover:bg-card hover:text-foreground cursor-pointer" : "",
                !done && !active ? "text-muted-foreground/40 cursor-default" : "",
              )}
            >
              {c.label}
            </button>
          </motion.span>
        );
      })}
    </div>
  );
}

export function PracticeClient() {
  const [step, setStep]                       = useState<Step>("level");
  const [selectedLevel, setSelectedLevel]     = useState<Level | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [practiceItems, setPracticeItems]     = useState<{ id: string; title: string; description: string; pdf_url: string }[]>([]);
  const [contentLoading, setContentLoading]   = useState(false);

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setStep(level === "sec1" || level === "sec2" ? "chapter" : "subject");
  };
  const handleSubjectSelect = (subject: Subject) => { setSelectedSubject(subject); setSelectedChapter(null); setStep("chapter"); };
  const handleChapterSelect = (chapter: Chapter) => { setSelectedChapter(chapter); setPracticeItems([]); setStep("content"); };
  const handleBackToLevel   = () => { setSelectedLevel(null); setSelectedSubject(null); setSelectedChapter(null); setStep("level"); };
  const handleBackToSubject = () => { setSelectedSubject(null); setSelectedChapter(null); setStep("subject"); };
  const handleBackToChapter = () => { setSelectedChapter(null); setStep("chapter"); };

  useEffect(() => {
    if (step !== "content" || !selectedChapter) return;
    setContentLoading(true);
    fetch(`/api/practice?chapter_id=${selectedChapter.id}`)
      .then(r => r.ok ? r.json() : [])
      .then(setPracticeItems)
      .finally(() => setContentLoading(false));
  }, [step, selectedChapter]);

  const getChapters = (): Chapter[] => {
    if (!selectedLevel) return [];
    const data = SYLLABUS[selectedLevel];
    if (selectedLevel === "sec34" && selectedSubject) return data[selectedSubject] || [];
    return data.only || [];
  };

  const chaptersByStrand = getChapters().reduce<Record<string, Chapter[]>>((acc, ch) => {
    if (!acc[ch.strand]) acc[ch.strand] = [];
    acc[ch.strand].push(ch);
    return acc;
  }, {});

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-12 top-20 h-32 rounded-full bg-primary/4 blur-3xl" />
      <AnimatePresence>
        {step !== "level" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8 flex flex-col gap-3 rounded-[1.5rem] border border-border/60 bg-background/75 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4"
          >
            <Breadcrumb step={step} level={selectedLevel} subject={selectedSubject} onLevel={handleBackToLevel} onSubject={handleBackToSubject} />
            <button
              onClick={step === "content" ? handleBackToChapter : step === "chapter" ? (selectedSubject ? handleBackToSubject : handleBackToLevel) : handleBackToLevel}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3.5 py-2 text-xs font-bold text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ─── Step 1: Level ─── */}
        {step === "level" && (
          <motion.div key="level" {...popIn} className="space-y-10">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Which year are you in?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">Pick your level and we&apos;ll show you the right practice questions.</p>
            </div>
            <motion.div variants={staggerList} initial="initial" animate="animate" className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
              {LEVELS.map((level) => (
                <motion.button
                  key={level.id}
                  variants={listItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLevelSelect(level.id)}
                  className={cn("group relative flex min-h-[22rem] flex-col items-center justify-between overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-9 text-center transition-all duration-400", level.ring, "hover:shadow-[0_32px_72px_-36px_rgba(84,56,44,0.34)]")}
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500", level.gradient)} />
                  <div className={cn("relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:-rotate-6", level.iconBg)}>
                    <level.icon className={cn("w-10 h-10", level.iconColor)} />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <span className={cn("inline-block text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em]", level.pillBg, level.pillText)}>
                      {level.badge}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">{LEVEL_LABELS[level.id]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{level.desc}</p>
                  </div>
                  <div className="relative z-10 w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-primary/10 text-primary text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Browse Practice <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ─── Step 2: Subject ─── */}
        {step === "subject" && (
          <motion.div key="subject" {...slideIn} className="space-y-10">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">E Math or A Math?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">E Math is compulsory for all; A Math is an elective.</p>
            </div>
            <motion.div variants={staggerList} initial="initial" animate="animate" className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {SUBJECTS.map((sub) => (
                <motion.button
                  key={sub.id}
                  variants={listItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSubjectSelect(sub.id)}
                  className={cn("group relative flex min-h-[22rem] flex-col items-center justify-between overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center transition-all duration-400", sub.ring, "hover:shadow-[0_32px_72px_-36px_rgba(84,56,44,0.34)]")}
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500", sub.gradient)} />
                  <div className={cn("relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:rotate-3", sub.iconBg)}>
                    <span className={cn("text-4xl font-bold", sub.iconColor)}>
                      {sub.id === "E Math" ? "∑" : "∂"}
                    </span>
                  </div>
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl font-bold">{sub.id}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{sub.desc}</p>
                  </div>
                  <div className="relative z-10 w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-primary/10 text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Browse Practice <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ─── Step 3: Chapter ─── */}
        {step === "chapter" && (
          <motion.div key="chapter" {...slideIn} className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What are you practising?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">Select a chapter to find the matching questions.</p>
            </div>
            <motion.div variants={staggerList} initial="initial" animate="animate" className="mx-auto max-w-4xl space-y-8">
              {Object.entries(chaptersByStrand).map(([strand, strandChapters]) => {
                const meta = STRAND_META[strand] || FALLBACK;
                const StrandIcon = meta.icon;
                return (
                  <div key={strand} className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", meta.bg)}>
                        <StrandIcon className={cn("w-3.5 h-3.5", meta.text)} />
                      </div>
                      <span className={cn("text-xs font-bold uppercase tracking-[0.18em]", meta.text)}>{strand}</span>
                    </div>
                    <div className="space-y-3">
                      {strandChapters.map((chapter) => (
                        <motion.button
                          key={chapter.id}
                          variants={listItem}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleChapterSelect(chapter)}
                          className="group relative flex w-full items-center gap-5 overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/80 px-6 py-5 text-left transition-all duration-300 hover:border-primary/45 hover:shadow-[0_20px_48px_-28px_rgba(84,56,44,0.28)]"
                        >
                          <div className="absolute inset-0 bg-primary/4 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                          <span className={cn("relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300", meta.bg, meta.text, "group-hover:bg-primary group-hover:text-primary-foreground")}>
                            {chapter.code}
                          </span>
                          <div className="relative z-10 flex-1 min-w-0">
                            <span className="font-bold text-base block">{chapter.title}</span>
                            {chapter.desc && <span className="text-sm text-muted-foreground mt-1 line-clamp-1">{chapter.desc}</span>}
                          </div>
                          <ArrowRight className="relative z-10 w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1.5 transition-all shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* ─── Step 4: Practice Papers ─── */}
        {step === "content" && selectedChapter && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto max-w-4xl space-y-8"
          >
            {/* Chapter header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-3 rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm"
            >
              {(() => {
                const meta = STRAND_META[selectedChapter.strand] || FALLBACK;
                const StrandIcon = meta.icon;
                return (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", meta.bg, meta.text)}>
                        <StrandIcon className="w-3 h-3" />
                        {selectedChapter.code}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {selectedLevel && LEVEL_LABELS[selectedLevel]}{selectedSubject && ` · ${selectedSubject}`}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{selectedChapter.title}</h2>
                    {selectedChapter.desc && <p className="text-sm text-muted-foreground leading-relaxed">{selectedChapter.desc}</p>}
                  </>
                );
              })()}
            </motion.div>

            {contentLoading ? (
              <div className="flex flex-col items-center gap-3 py-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                  <Loader2 className="w-7 h-7 text-primary/60" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Loading practice papers…</p>
              </div>
            ) : (
              <motion.div variants={staggerList} initial="initial" animate="animate" className="space-y-4">
                <motion.div variants={listItem} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-base">Practice Papers</span>
                  {practiceItems.length > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {practiceItems.length}
                    </motion.span>
                  )}
                </motion.div>

                {practiceItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="space-y-3 rounded-[1.75rem] border border-dashed border-border/55 bg-muted/12 py-16 text-center"
                  >
                    <PenTool className="w-8 h-8 mx-auto text-muted-foreground/25" />
                    <p className="text-base text-muted-foreground">Practice papers haven&apos;t been uploaded yet.</p>
                    <p className="text-sm text-muted-foreground/50">Check back soon.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {practiceItems.map((item, idx) => (
                      <motion.a
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-5 rounded-[1.75rem] border border-border/60 bg-background/80 px-6 py-5 transition-all duration-250 hover:border-primary/45 hover:bg-primary/4 hover:shadow-[0_18px_42px_-26px_rgba(84,56,44,0.26)]"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-250">
                          <span className="text-sm font-bold text-primary group-hover:text-primary-foreground transition-colors">{idx + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-base">{item.title}</p>
                          {item.description && <p className="text-sm text-muted-foreground mt-1 truncate">{item.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                          <span className="hidden sm:block">Attempt</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
