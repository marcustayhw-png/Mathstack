"use client";

import { motion } from "framer-motion";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="text-center space-y-7 max-w-lg"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Layers className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Coming Soon
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Formula Flashcards</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Master key formulas, identities, and theorems through spaced-repetition flashcards — built for E Math & A Math.
          </p>
        </div>
        <Link
          href="/formulas"
          className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
        >
          Browse the Formula Hub instead
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
