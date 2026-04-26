"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-lg"
      >
        <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Formula Flashcards</h1>
        <p className="text-muted-foreground text-base md:text-lg font-medium">
          Master key formulas, identities, and theorems with spaced-repetition flashcards. Coming soon.
        </p>
      </motion.div>
    </div>
  );
}
