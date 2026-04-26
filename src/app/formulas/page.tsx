"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { EMATH_FORMULAS, AMATH_FORMULAS, type FormulaSection as FormulaSectionType } from "./formula-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FileText, Printer, Search, ChevronDown, BookOpen, Copy, Check, GraduationCap } from "lucide-react";

type Tab = "emath" | "amath";

function toSlug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function FormulaCard({
  name,
  latex,
  note,
  examProvided,
  accentBg,
  accentText,
}: {
  name: string;
  latex: string;
  note?: string;
  examProvided?: boolean;
  accentBg: string;
  accentText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(latex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-4 md:p-5 rounded-2xl border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200 space-y-3 overflow-hidden group"
    >
      {/* Left accent bar */}
      <div className={cn("absolute left-0 top-3 bottom-3 w-1 rounded-full", accentBg)} />

      <div className="pl-3 flex items-start justify-between gap-2 flex-wrap">
        <span className="text-sm font-bold text-foreground leading-snug">{name}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {examProvided && (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black uppercase tracking-wider">
              Exam Sheet
            </Badge>
          )}
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Copy LaTeX"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-emerald-500" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </button>
        </div>
      </div>

      <div className="pl-3 overflow-x-auto py-1">
        <BlockMath math={latex} />
      </div>

      {note && (
        <p className={cn("pl-3 text-xs font-medium", accentText, "opacity-80")}>{note}</p>
      )}
    </motion.div>
  );
}

function FormulaSectionComponent({
  section,
  open,
  onToggle,
  searchQuery,
  examOnly,
}: {
  section: FormulaSectionType;
  open: boolean;
  onToggle: () => void;
  searchQuery: string;
  examOnly: boolean;
}) {
  const filteredFormulas = useMemo(() => {
    let formulas = examOnly ? section.formulas.filter((f) => f.examProvided) : section.formulas;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      formulas = formulas.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.note && f.note.toLowerCase().includes(q))
      );
    }
    return formulas;
  }, [section.formulas, searchQuery, examOnly]);

  if ((searchQuery || examOnly) && filteredFormulas.length === 0) return null;

  return (
    <div id={toSlug(section.topic)} className="space-y-3 scroll-mt-52">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest",
              section.color,
              section.textColor
            )}
          >
            {section.topic}
          </span>
          <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
            {filteredFormulas.length} formula{filteredFormulas.length !== 1 ? "s" : ""}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-300 mr-1",
            open ? "rotate-180" : ""
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 pt-1">
              {filteredFormulas.map((f, idx) => (
                <FormulaCard
                  key={idx}
                  {...f}
                  accentBg={section.color.replace("/10", "/60")}
                  accentText={section.textColor}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FormulasPage() {
  const [tab, setTab] = useState<Tab>("emath");
  const [search, setSearch] = useState("");
  const [examOnly, setExamOnly] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const currentSections = tab === "emath" ? EMATH_FORMULAS : AMATH_FORMULAS;

  const isOpen = (topic: string) => openSections[topic] !== false;

  const toggleSection = (topic: string) => {
    setOpenSections((prev) => ({ ...prev, [topic]: prev[topic] === false }));
  };

  const expandAll = () => setOpenSections({});

  const collapseAll = () => {
    setOpenSections(
      Object.fromEntries(currentSections.map((s) => [s.topic, false]))
    );
  };

  const totalFormulas = currentSections.reduce((acc, s) => acc + s.formulas.length, 0);

  const scrollToSection = (topic: string) => {
    const el = document.getElementById(toSlug(topic));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasAnyResults = useMemo(() => {
    return currentSections.some((s) => {
      const formulas = examOnly ? s.formulas.filter((f) => f.examProvided) : s.formulas;
      if (!search) return formulas.length > 0;
      const q = search.toLowerCase();
      return formulas.some(
        (f) => f.name.toLowerCase().includes(q) || (f.note && f.note.toLowerCase().includes(q))
      );
    });
  }, [currentSections, search, examOnly]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">

        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Formulas
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl">
            All key formulas organised by topic.{" "}
            <span className="text-emerald-600 font-bold">Exam Sheet</span> formulas are provided in the official GCE O-Level exam.
          </p>
        </div>

        {/* Sticky controls bar */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/40 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-3 mb-8 space-y-3">

          {/* Row 1: Tabs + controls */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-1.5 p-1 bg-muted/40 rounded-2xl border border-border/50">
              {([
                { id: "emath" as Tab, label: "E Math", sublabel: "4048" },
                { id: "amath" as Tab, label: "A Math", sublabel: "4049" },
              ]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setSearch(""); setExamOnly(false); setOpenSections({}); }}
                  className={cn(
                    "px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2",
                    tab === t.id
                      ? "bg-background text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                    tab === t.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {t.sublabel}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground font-medium hidden sm:block mr-2">
                {totalFormulas} formulas
              </span>
              <button
                onClick={expandAll}
                className="text-xs font-bold text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted/60 transition-colors"
              >
                Expand all
              </button>
              <button
                onClick={collapseAll}
                className="text-xs font-bold text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted/60 transition-colors"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Row 2: Search + exam filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search formulas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/40 border border-border/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-bold"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={() => setExamOnly((v) => !v)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap",
                examOnly
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                  : "bg-muted/40 border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Exam only
            </button>
          </div>

          {/* Row 3: Topic jump pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {currentSections.map((s) => (
              <button
                key={s.topic}
                onClick={() => scrollToSection(s.topic)}
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all border border-transparent hover:border-current",
                  s.color,
                  s.textColor,
                  "opacity-70 hover:opacity-100"
                )}
              >
                {s.topic}
              </button>
            ))}
          </div>
        </div>

        {/* Exam sheet banner */}
        <div className="mb-8 p-4 md:p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-black text-sm">Official GCE O-Level Exam Formula Sheet</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                View the exact sheet provided in the E Math (4048) and A Math (4049) papers
              </p>
            </div>
          </div>
          <Link
            href="/formulas/sheet"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity shrink-0 whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            View &amp; Download
          </Link>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {!hasAnyResults ? (
              <div className="flex flex-col items-center py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="font-bold text-muted-foreground">
                  No formulas found{search ? ` for "${search}"` : ""}
                </p>
                <p className="text-sm text-muted-foreground/60">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-8">
                {currentSections.map((section, i) => (
                  <motion.div
                    key={section.topic}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <FormulaSectionComponent
                      section={section}
                      open={isOpen(section.topic)}
                      onToggle={() => toggleSection(section.topic)}
                      searchQuery={search}
                      examOnly={examOnly}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
