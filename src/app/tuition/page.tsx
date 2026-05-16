"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Gift,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Monitor,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Sprout,
  Timer,
  Users,
  Wallet,
} from "lucide-react";

const WHAT_YOU_GET = [
  {
    icon: FileText,
    title: "Custom Notes & Worksheets",
    desc: "Materials are tailored to your level and weak areas — clean explanations first, practice after.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Ask questions outside lesson time when you are stuck, so confusion does not snowball.",
  },
  {
    icon: CalendarCheck,
    title: "Extra Exam Consults",
    desc: "Before tests or exams, we make space for focused check-ins where possible — without surprise charges.",
  },
  {
    icon: Timer,
    title: "Timed Practice",
    desc: "Build speed, accuracy, and confidence with guided exam-style practice under realistic conditions.",
  },
  {
    icon: Brain,
    title: "Concept Mastery",
    desc: "We slow down enough to understand the why behind each method, then practise until it feels natural.",
  },
  {
    icon: ScrollText,
    title: "Past Paper Guidance",
    desc: "Systematic O-Level and N-Level style drilling, with walkthroughs that show how to think through the question.",
  },
  {
    icon: HeartHandshake,
    title: "Quality Education, Made Affordable",
    desc: "We believe great tuition should not be out of reach. Our rates are kept fair and transparent — no hidden tiers, no surprise costs — so every student who needs support can access it.",
  },
];

const RATES = [
  {
    mode: "Physical",
    icon: MapPin,
    tiers: [
      { label: "Sec 1–2", price: "$30", sub: "per hour" },
      { label: "Sec 3–4", price: "$35", sub: "per hour" },
    ],
  },
  {
    mode: "Online",
    icon: Monitor,
    tiers: [
      { label: "Sec 1–2", price: "$25", sub: "per hour" },
      { label: "Sec 3–4", price: "$30", sub: "per hour" },
    ],
  },
];

const GROUP_TIERS = [
  {
    pax: "2 Students",
    discount: "10% off",
    saving: "Save $2–3/hr each",
    physical: [{ label: "Sec 1–2", was: "$30", now: "$27" }, { label: "Sec 3–4", was: "$35", now: "$31" }],
    online: [{ label: "Sec 1–2", was: "$25", now: "$22" }, { label: "Sec 3–4", was: "$30", now: "$27" }],
  },
  {
    pax: "3 Students",
    discount: "15% off",
    saving: "Save $3–5/hr each",
    physical: [{ label: "Sec 1–2", was: "$30", now: "$25" }, { label: "Sec 3–4", was: "$35", now: "$29" }],
    online: [{ label: "Sec 1–2", was: "$25", now: "$21" }, { label: "Sec 3–4", was: "$30", now: "$25" }],
  },
];

const PROMISES = [
  {
    icon: Gift,
    title: "First lesson free",
    desc: "Come in, try the lesson, and see if the fit feels right before making any decision.",
  },
  {
    icon: HeartHandshake,
    title: "No hard feelings",
    desc: "If the style is not suitable, you can stop after the trial — no pressure, no awkwardness.",
  },
  {
    icon: Wallet,
    title: "No upfront deposit",
    desc: "No initial deposit, no registration fee, and no one-time admin charge hidden in the fine print.",
  },
];

const BRIDGING_TIERS = [
  {
    level: "Lower Secondary",
    audience: "Sec 1–2 Maths",
    price: "$648",
    saving: "Save $216",
  },
  {
    level: "Upper Secondary",
    audience: "Sec 3–4 E Math / A Math",
    price: "$756",
    saving: "Save $252",
  },
];

const ENSO_PATH = "M50 8 C79 8, 94 27, 94 50 C94 73, 79 92, 50 92 C21 92, 6 73, 6 50 C6 29, 19 12, 36 8.5";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: [0.23, 1, 0.32, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function EnsoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d={ENSO_PATH} stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.22" />
      <path d="M34.5 7.8 C34 5.8, 36.5 4.5, 38 6.5 C36.5 7.8, 35 8.8, 34.5 7.8Z" fill="currentColor" opacity="0.32" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{children}</p>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-5 opacity-30">
      <div className="h-px flex-1 bg-border" />
      <span className="text-base text-muted-foreground" style={{ fontFamily: "serif" }}>悟り</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function TuitionPage() {
  const openWhatsApp = () => window.open("https://wa.me/6588872996", "_blank");

  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 pt-20 pb-28 md:pb-36">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[0%] h-[65vw] max-h-[780px] w-[65vw] max-w-[780px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute bottom-[-20%] right-[2%] h-[48vw] max-h-[600px] w-[48vw] max-w-[600px] rounded-full bg-accent/20 blur-[110px]" />
          <EnsoMark className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] text-primary" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-9 text-center lg:text-left"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                First Lesson Free · No Commitment
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Secondary Maths tuition,
                <br />
                <span className="text-primary">without the pressure.</span>
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
                Try the first lesson free. If it does not feel right, no hard feelings — just stop there. No deposit, no registration fee, no hidden costs.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={openWhatsApp}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <Gift className="h-4 w-4" />
                Claim Free Trial Lesson
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-card/60 px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
              >
                Ask About Availability
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {[
                { icon: Gift, label: "First lesson free" },
                { icon: ShieldCheck, label: "No registration fee" },
                { icon: Wallet, label: "No deposit" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Satori Promise card */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-primary/12 via-transparent to-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 p-7 shadow-2xl shadow-primary/8 backdrop-blur-sm">
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-primary/8 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />

              <div className="relative z-10 mb-7 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Satori Promise</p>
                  <h2 className="mt-1.5 text-2xl font-bold tracking-tight">A softer way to begin</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Three things we commit to from day one.</p>
                </div>
                <EnsoMark className="h-14 w-14 shrink-0 text-primary" />
              </div>

              <div className="relative z-10 space-y-3">
                {PROMISES.map((promise, index) => {
                  const Icon = promise.icon;
                  return (
                    <motion.div
                      key={promise.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                      className="group flex gap-4 rounded-2xl border border-border/50 bg-background/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-4.5 w-4.5" style={{ width: "1.125rem", height: "1.125rem" }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm">{promise.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{promise.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BODY SECTIONS ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl space-y-28 px-5 pb-28 sm:px-8">

        {/* ── What's Included ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <SectionLabel>What&apos;s Included</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything to feel steady again</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              Every student gets the full support package — nothing hidden behind a premium tier.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_GET.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/6 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mb-1.5 font-bold">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── Who + Format — horizontal strip layout ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="space-y-2">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Small, personal, flexible</h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Lessons are kept intimate by design — so every session genuinely moves the needle.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            {/* Who we teach */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-7 shadow-sm"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/8 blur-2xl" />
              <div className="relative z-10 mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Who We Teach</h3>
              </div>
              <div className="relative z-10 space-y-3">
                {[
                  { level: "Lower Secondary", detail: "Sec 1–2 · Mathematics" },
                  { level: "Upper Secondary", detail: "Sec 3–4 · E Math & A Math" },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/65 px-4 py-3.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-bold">{item.level}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Lesson format — 2×2 grid */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-7 shadow-sm"
            >
              <div className="pointer-events-none absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-accent/15 blur-2xl" />
              <div className="relative z-10 mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Lesson Format</h3>
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-3">
                {[
                  { icon: Users, text: "1-on-1 personalised sessions" },
                  { icon: Clock, text: "1.5–2 hour lessons" },
                  { icon: CalendarCheck, text: "Weekdays & weekends" },
                  { icon: Monitor, text: "Physical or online" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5 rounded-2xl border border-border/50 bg-background/65 px-4 py-3.5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm font-semibold leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── Pricing ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, honest rates</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              No initial deposit · No registration fee · No hidden costs
            </p>
          </motion.div>

          {/* Rate cards */}
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
            {RATES.map(({ mode, icon: ModeIcon, tiers }) => (
              <motion.div
                key={mode}
                variants={fadeUp}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-7 shadow-sm"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/6 blur-2xl" />
                <div className="relative z-10 mb-6 flex items-center gap-2.5">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <ModeIcon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{mode}</p>
                </div>
                <div className="relative z-10 space-y-3">
                  {tiers.map((tier) => (
                    <div key={tier.label} className="flex items-center justify-between rounded-2xl border border-primary/12 bg-primary/5 px-5 py-4">
                      <div>
                        <p className="font-bold">{tier.label}</p>
                        <p className="text-xs text-muted-foreground">{tier.sub}</p>
                      </div>
                      <span className="text-4xl font-bold tracking-tight text-primary">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Guarantee strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Gift, note: "First lesson free" },
              { icon: ShieldCheck, note: "No registration fees" },
              { icon: Wallet, note: "No initial deposit" },
            ].map(({ icon: Icon, note }) => (
              <div
                key={note}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-5 py-2.5 text-sm font-semibold text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {note}
              </div>
            ))}
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── 3-Month Bridging Programme ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sprout className="h-3.5 w-3.5" />
              Limited Intake · One-Time Programme
            </span>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  Fallen behind?{" "}
                  <span className="text-primary">We&apos;ve built a programme just for that.</span>
                </h2>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  A safe, structured 3-month reset — no judgement, no rushing, no shame. We go back to the roots, rebuild confidence from the ground up, and use the final stretch like a focused boot camp before exams hit.
                </p>
              </div>
              <button
                onClick={() => window.open("https://wa.me/6588872996", "_blank")}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <Sprout className="h-4 w-4" />
                Enquire Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Two-column layout: phases + pricing */}
          <motion.div variants={stagger} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

            {/* Left — Phase cards */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-7 shadow-sm">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/6 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent/8 blur-2xl" />

              {/* Header */}
              <div className="relative z-10 mb-7 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">How It Unfolds</p>
                <h3 className="text-2xl font-bold tracking-tight">Three phases. One transformation.</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Each phase builds on the last — from rediscovering foundations to exam-day confidence.</p>
              </div>

              {/* Phase cards stacked */}
              <div className="relative z-10 space-y-3">
                {[
                  {
                    phase: "Phase 01",
                    label: "Rebuild the Roots",
                    desc: "We go back without shame — identifying every gap and patching them gently, one at a time. No rushing.",
                    accent: "border-l-[oklch(0.65_0.10_148)]",
                    numBg: "bg-[oklch(0.88_0.04_148)/70]",
                    numText: "text-[oklch(0.28_0.09_148)]",
                    tagBg: "bg-[oklch(0.88_0.04_148)/50]",
                    tagText: "text-[oklch(0.28_0.09_148)]",
                    icon: "🌱",
                  },
                  {
                    phase: "Phase 02",
                    label: "Build Upward",
                    desc: "With a solid base in place, we layer on concepts systematically — connecting the dots between topics.",
                    accent: "border-l-primary",
                    numBg: "bg-primary/12",
                    numText: "text-primary",
                    tagBg: "bg-primary/10",
                    tagText: "text-primary",
                    icon: "📐",
                  },
                  {
                    phase: "Phase 03",
                    label: "Exam Boot Camp",
                    desc: "Timed practice, past papers, exam strategy. The final push — focused, structured, and confidence-building.",
                    accent: "border-l-[oklch(0.62_0.12_55)]",
                    numBg: "bg-[oklch(0.82_0.08_55)/40]",
                    numText: "text-[oklch(0.38_0.10_55)]",
                    tagBg: "bg-[oklch(0.82_0.08_55)/35]",
                    tagText: "text-[oklch(0.35_0.09_55)]",
                    icon: "🎯",
                  },
                ].map((p) => (
                  <div
                    key={p.phase}
                    className={`flex items-start gap-4 rounded-2xl border border-border/50 border-l-4 bg-background/65 px-5 py-4 ${p.accent}`}
                  >
                    {/* Large phase number */}
                    <div className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-center ${p.numBg}`}>
                      <span className="text-[9px] font-black uppercase leading-none tracking-widest opacity-60" style={{ color: "inherit" }}>
                        <span className={p.numText.replace("text-", "color-")}></span>
                      </span>
                      <span className={`text-lg font-black leading-none ${p.numText}`}>{p.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${p.tagBg} ${p.tagText}`}>
                          {p.phase}
                        </span>
                      </div>
                      <p className="mt-1 font-bold leading-snug">{p.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* What's included */}
              <div className="relative z-10 mt-5 grid grid-cols-2 gap-2">
                {[
                  { icon: Clock, text: "3 × 2hr lessons / week" },
                  { icon: FileText, text: "Custom worksheets" },
                  { icon: MessageCircle, text: "WhatsApp support" },
                  { icon: Sparkles, text: "Exam strategy included" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5 text-xs font-semibold text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Pricing cards */}
            <div className="space-y-5">
              {BRIDGING_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.level}
                  variants={fadeUp}
                  whileHover={{ y: -5, scale: 1.015 }}
                  className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-7 shadow-sm transition-all duration-300 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/6 via-transparent to-accent/6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{tier.level}</p>
                        <p className="mt-1 text-sm font-semibold">{tier.audience}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-primary/20 bg-primary/15 px-3.5 py-1.5 text-xs font-bold text-primary">
                        {tier.saving}
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-5xl font-bold leading-none tracking-tight text-foreground">{tier.price}</span>
                      <span className="mb-1.5 text-sm font-semibold text-muted-foreground">/ month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">per student · for 3 months</p>
                  </div>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} className="rounded-2xl border border-border/50 bg-card/70 p-4 text-xs text-muted-foreground leading-relaxed">
                * One-time intake · Limited spots available · Both levels run simultaneously — enrol early to secure a place.
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── Group Tuition ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <SectionLabel>Better Together</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Small group tuition</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              Bring 1–2 friends and everyone pays less. Same quality, warmer energy, still capped small.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2">
            {GROUP_TIERS.map((tier) => (
              <motion.div
                key={tier.pax}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-7 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/6 blur-2xl" />
                <div className="relative z-10 mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold">{tier.pax}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      <BadgePercent className="h-3.5 w-3.5" />
                      {tier.discount}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{tier.saving}</p>
                  </div>
                </div>

                <div className="relative z-10 space-y-5">
                  {[{ label: "Physical", icon: MapPin, data: tier.physical }, { label: "Online", icon: Monitor, data: tier.online }].map((section) => (
                    <div key={section.label} className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        <section.icon className="h-3.5 w-3.5 text-primary" /> {section.label}
                      </div>
                      {section.data.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-4 py-3">
                          <span className="text-sm font-semibold">{item.label}</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-muted-foreground line-through">{item.was}</span>
                            <span className="font-bold text-primary">{item.now}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-muted-foreground">
            * All students must be at the same level and subject. Group size is capped at 3 to maintain quality.
          </motion.p>
        </motion.section>

        {/* ── Final CTA — soft, on-theme ── */}
        <motion.section
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary/5 p-10 text-center sm:p-14"
        >
          {/* Layered glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          </div>
          <EnsoMark className="pointer-events-none absolute right-8 top-8 h-32 w-32 rotate-[15deg] text-primary opacity-60" />

          <div className="relative z-10 mx-auto max-w-2xl space-y-7">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start with a free lesson</h2>
              <p className="mx-auto max-w-md leading-relaxed text-muted-foreground">
                No payment, no deposit, no pressure. Come try the class — if it is not the right fit, you can walk away kindly.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={openWhatsApp}
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-9 py-4 text-sm font-bold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <BookOpen className="h-4 w-4" />
                Book Your Free Trial on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground/60">First lesson is completely free · No commitment required</p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
