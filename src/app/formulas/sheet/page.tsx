"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { EMATH_SHEET_SECTIONS, AMATH_SHEET_SECTIONS } from "../formula-data";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Tab = "emath" | "amath";

function SheetContent({ sections }: { sections: typeof EMATH_SHEET_SECTIONS }) {
  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <div key={i} className="space-y-3">
          {section.heading && (
            <h3 className="text-base font-black tracking-tight border-b border-border pb-2">
              {section.heading}
            </h3>
          )}
          {"subheading" in section && section.subheading && (
            <p className="text-sm font-bold italic text-muted-foreground">{section.subheading}</p>
          )}
          <div className="space-y-2 pl-4">
            {section.formulas.map((f, j) => (
              <div key={j} className="flex flex-col gap-0.5">
                {f.name && <span className="text-xs text-muted-foreground font-medium">{f.name}</span>}
                <div className="overflow-x-auto">
                  <BlockMath math={f.latex} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FormulaSheetPage() {
  const [tab, setTab] = useState<Tab>("emath");

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-area { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

          {/* Controls (hidden when printing) */}
          <div className="no-print flex items-center justify-between mb-8 flex-wrap gap-4">
            <Link href="/formulas" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Formulas
            </Link>
            <Button onClick={handlePrint} className="rounded-xl font-bold gap-2">
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </Button>
          </div>

          {/* Tabs (hidden when printing) */}
          <div className="no-print flex gap-2 mb-8 p-1 bg-muted/40 rounded-2xl w-fit border border-border/50">
            {([
              { id: "emath" as Tab, label: "E Math", code: "4048" },
              { id: "amath" as Tab, label: "A Math", code: "4049" },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2",
                  tab === t.id
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
                <span className={cn("text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                  tab === t.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {t.code}
                </span>
              </button>
            ))}
          </div>

          {/* Sheet content */}
          <div className="print-area border border-border/50 rounded-2xl p-6 md:p-10 bg-card shadow-sm space-y-6">
            <div className="text-center border-b border-border pb-6 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {tab === "emath" ? "4048 Mathematics GCE O-Level" : "4049 Additional Mathematics GCE O-Level"}
              </p>
              <h1 className="text-2xl font-black tracking-tight">Mathematical Formulae</h1>
            </div>
            <SheetContent sections={tab === "emath" ? EMATH_SHEET_SECTIONS : AMATH_SHEET_SECTIONS} />
          </div>

          <p className="no-print text-center text-xs text-muted-foreground mt-6 font-medium">
            To save as PDF: use <strong>Print → Save as PDF</strong> in your browser
          </p>
        </div>
      </div>
    </>
  );
}
