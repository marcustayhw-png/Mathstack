"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, PenTool, ArrowRight, Sigma, GraduationCap } from "lucide-react";
import { HapticButton } from "@/components/ui/haptic-button";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Notes",
    desc: "Clear, exam-focused notes covering the full O-Level and N-Level syllabus — organised by chapter.",
    href: "/notes",
    accent: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Sigma,
    title: "Formulas",
    desc: "Every key formula for E Math and A Math in one place, with the official exam formula sheet.",
    href: "/formulas",
    accent: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: PenTool,
    title: "Practice",
    desc: "Past-paper style questions with full worked solutions, organised by topic and difficulty.",
    href: "/practice",
    accent: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Tuition",
    desc: "1-on-1 personalised sessions for Sec 1–4 students. Online and physical options available.",
    href: "/tuition",
    accent: "bg-purple-500/10 text-purple-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* ─── Hero ─── */}
      <section className="relative px-4 sm:px-6 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] -z-10 bg-primary/10 blur-[120px] rounded-full" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-muted/40 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Secondary 1 – 4 · E Math · A Math
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              Master Maths.<br />
              <span className="text-primary">Ace Your Exams.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Free notes, formula references, and practice questions — built specifically for Singapore secondary school students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <HapticButton asChild size="lg" className="w-full sm:w-auto h-12 md:h-13 px-8 text-base rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              <Link href="/notes" className="flex items-center gap-2">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
            </HapticButton>
            <HapticButton asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 md:h-13 px-8 text-base rounded-xl border-2">
              <Link href="/tuition">Book Tuition</Link>
            </HapticButton>
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="px-4 sm:px-6 md:px-8 py-20 md:py-28 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3">Everything in one place</h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto">All the resources you need to go from confused to confident.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {features.map((f, idx) => (
              <motion.div
                key={f.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <Link href={f.href} className="group flex gap-5 p-6 md:p-7 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${f.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-lg">{f.title}</h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-4 sm:px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center text-primary-foreground"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Ready to Ace Your<br className="hidden sm:block" /> Maths Exam?
              </h2>
              <p className="text-base md:text-lg opacity-85 max-w-lg mx-auto font-medium">
                Join students using MathStack to master the syllabus and hit their target grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 rounded-xl font-bold shadow-xl hover:scale-[1.02] transition-transform">
                  <Link href="/notes">Browse Notes</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl font-bold border-2 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-white/10 transition-colors">
                  <Link href="/practice">Try Practice</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/40 px-4 py-8 text-center">
        <p className="text-xs text-muted-foreground font-medium">© {new Date().getFullYear()} MathStack · Built for Singapore Secondary students</p>
      </footer>

    </div>
  );
}
