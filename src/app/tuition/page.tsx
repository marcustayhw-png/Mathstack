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
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Ask questions outside lesson time when you are stuck, so confusion does not snowball.",
    highlight: false,
  },
  {
    icon: CalendarCheck,
    title: "Extra Exam Consults",
    desc: "Before tests or exams, we make space for focused check-ins where possible — without surprise charges.",
    highlight: true,
  },
  {
    icon: Timer,
    title: "Timed Practice",
    desc: "Build speed, accuracy, and confidence with guided exam-style practice under realistic conditions.",
    highlight: false,
  },
  {
    icon: Brain,
    title: "Concept Mastery",
    desc: "We slow down enough to understand the why behind each method, then practise until it feels natural.",
    highlight: false,
  },
  {
    icon: ScrollText,
    title: "Past Paper Guidance",
    desc: "Systematic O-Level and N-Level style drilling, with walkthroughs that show how to think through the question.",
    highlight: true,
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
    accent: "bg-primary text-primary-foreground",
  },
  {
    level: "Upper Secondary",
    audience: "Sec 3–4 E Math / A Math",
    price: "$756",
    saving: "Save $252",
    accent: "bg-accent text-accent-foreground",
  },
];

const ENSO_PATH = "M50 8 C79 8, 94 27, 94 50 C94 73, 79 92, 50 92 C21 92, 6 73, 6 50 C6 29, 19 12, 36 8.5";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] } },
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

export default function TuitionPage() {
  const openWhatsApp = () => window.open("https://wa.me/6588872996", "_blank");

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="relative px-5 sm:px-8 pt-20 pb-24 md:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-18%] left-[2%] h-[58vw] max-h-[720px] w-[58vw] max-w-[720px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-18%] right-[4%] h-[42vw] max-h-[560px] w-[42vw] max-w-[560px] rounded-full bg-accent/25 blur-[100px]" />
          <EnsoMark className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] text-primary" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm shadow-primary/5">
                <Sparkles className="h-3.5 w-3.5" />
                First Lesson Free · No Commitment
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Secondary Maths tuition,
                <br />
                <span className="text-primary">without the pressure.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
                Try the first lesson free to see if Satori Studio feels suitable. If it does not, no hard feelings — you can simply stop there. No deposit, no registration fee, no hidden costs.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={openWhatsApp}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <Gift className="h-4 w-4" />
                Claim Free Trial Lesson
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-card/70 px-8 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
              >
                Ask About Availability
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-card/60 to-accent/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Satori Promise</p>
                  <h2 className="mt-1 text-2xl font-bold">A softer way to begin</h2>
                </div>
                <EnsoMark className="h-16 w-16 text-primary" />
              </div>

              <div className="space-y-3">
                {PROMISES.map((promise, index) => {
                  const Icon = promise.icon;
                  return (
                    <motion.div
                      key={promise.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.45 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                      className="group flex gap-4 rounded-2xl border border-border/60 bg-background/65 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold">{promise.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{promise.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-28 sm:px-8">
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="max-w-2xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">What&apos;s Included</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your child needs to feel steady again</h2>
            <p className="leading-relaxed text-muted-foreground">
              Every student gets the full Satori support package — nothing hidden behind a premium tier.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_GET.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                    item.highlight
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/60 bg-card/80"
                  }`}
                >
                  <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/8 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mb-2 font-bold">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="rounded-3xl border border-border/60 bg-card/80 p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Who We Teach</h3>
            </div>
            <div className="space-y-3">
              {[
                { level: "Lower Secondary", detail: "Sec 1–2 · Mathematics" },
                { level: "Upper Secondary", detail: "Sec 3–4 · E Math & A Math" },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-3 rounded-2xl bg-muted/45 p-4">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold">{item.level}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-3xl border border-border/60 bg-card/80 p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Lesson Format</h3>
            </div>
            <div className="space-y-3">
              {[
                "1-on-1 personalised sessions",
                "1.5–2 hour lessons",
                "Weekdays & weekends available",
                "Physical or online — your choice",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-muted/45 p-4">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <div className="flex items-center gap-5 opacity-35">
          <div className="h-px flex-1 bg-border" />
          <span className="text-lg text-muted-foreground" style={{ fontFamily: "serif" }}>悟り</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* ── Affordability banner ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-0"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-r from-accent/15 via-card/70 to-primary/10 p-7 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 left-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground">
                  <BadgePercent className="h-3.5 w-3.5" />
                  Affordable Quality
                </div>
                <h3 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  Premium tuition. <span className="text-primary">Not premium pricing.</span>
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Most tuition centres in Singapore charge <span className="font-semibold text-foreground">$40–$80/hr</span> for secondary Maths — on top of registration fees and deposits.
                  At Satori Studio, we believe quality learning should not feel like a financial burden.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  {
                    label: "Typical tuition centre",
                    price: "$40–$80/hr",
                    extras: "+ registration fee + deposit",
                    us: false,
                  },
                  {
                    label: "Satori Studio",
                    price: "$25–$35/hr",
                    extras: "First lesson free · Zero hidden fees",
                    us: true,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${
                      row.us
                        ? "border-primary/35 bg-primary/8"
                        : "border-border/50 bg-background/50 opacity-70"
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-bold ${row.us ? "text-primary" : "text-foreground"}`}>{row.label}</p>
                      <p className="text-xs text-muted-foreground">{row.extras}</p>
                    </div>
                    <span className={`shrink-0 text-xl font-bold ${row.us ? "text-primary" : "text-muted-foreground line-through"}`}>
                      {row.price}
                    </span>
                  </div>
                ))}
                <p className="px-1 text-xs text-muted-foreground">
                  * Market rates sourced from typical Singapore tuition centres, 2024–2025.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Pricing</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, honest rates</h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground lg:ml-auto">
              First lesson is free. If lessons continue, pricing stays straightforward — no initial deposit, no registration fee, no one-time admin fee, and no hidden costs.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
            {RATES.map(({ mode, icon: ModeIcon, tiers }) => (
              <motion.div key={mode} variants={fadeUp} className="rounded-3xl border border-border/60 bg-card/85 p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <ModeIcon className="h-4 w-4 text-primary" />
                  {mode}
                </div>
                <div className="space-y-3">
                  {tiers.map((tier) => (
                    <div key={tier.label} className="flex items-center justify-between rounded-2xl border border-primary/15 bg-primary/5 p-4">
                      <div>
                        <p className="text-sm font-bold">{tier.label}</p>
                        <p className="text-xs text-muted-foreground">{tier.sub}</p>
                      </div>
                      <span className="text-3xl font-bold text-primary">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Gift, note: "First lesson free" },
              { icon: ShieldCheck, note: "No registration fees" },
              { icon: Wallet, note: "No initial deposit" },
            ].map(({ icon: Icon, note }) => (
              <div key={note} className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-semibold text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {note}
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── 3-Month Bridging Programme ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-0"
        >
          {/* Full-bleed immersive card */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-accent/15 p-8 shadow-xl shadow-primary/8 sm:p-12"
          >
            {/* Background enso marks */}
            <EnsoMark className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rotate-12 text-primary opacity-30" />
            <EnsoMark className="pointer-events-none absolute -bottom-10 left-4 h-40 w-40 -rotate-20 text-accent opacity-20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 rounded-[2.5rem]" />

            <div className="relative z-10 space-y-10">
              {/* Header */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm">
                    <Sprout className="h-3.5 w-3.5" />
                    Limited Intake · One-Time Programme
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                    <BadgePercent className="h-3.5 w-3.5" />
                    Up to $252 off per month
                  </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                      Lost confidence? Fallen behind?
                      <br />
                      <span className="text-primary">We built this programme for exactly that.</span>
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-muted-foreground text-[0.97rem]">
                      A safe, structured 3-month reset — no judgement, no rushing, no shame. We go back to the roots,
                      rebuild confidence from the ground up, and use the final stretch as a focused boot camp before exams hit.
                      Think of it as a fresh start with someone genuinely in your corner.
                    </p>
                  </div>
                  <button
                    onClick={() => window.open("https://wa.me/6588872996", "_blank")}
                    className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                  >
                    <Sprout className="h-4 w-4" />
                    Enquire Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* What's included + pricing: two-column layout */}
              <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                {/* Left: feature list */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">What&apos;s included</p>
                  <div className="space-y-2.5">
                    {[
                      { icon: Clock,          text: "3 × 2hr lessons per week" },
                      { icon: CalendarCheck,  text: "3 months, one flat fee" },
                      { icon: BookOpen,       text: "Back-to-basics curriculum" },
                      { icon: HeartHandshake, text: "No-judgement, no-shame space" },
                      { icon: Sparkles,       text: "Exam boot camp in the final stretch" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 rounded-2xl border border-border/45 bg-background/50 px-4 py-3 backdrop-blur-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                          <Icon className="h-[17px] w-[17px]" />
                        </div>
                        <p className="text-sm font-semibold">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: pricing tier cards */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">Pricing</p>
                  <div className="space-y-4">
                    {BRIDGING_TIERS.map((tier) => (
                      <motion.div
                        key={tier.level}
                        whileHover={{ y: -4, scale: 1.015 }}
                        className="group relative overflow-hidden rounded-[1.75rem] border-2 border-primary/25 bg-background/75 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                      >
                        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative z-10">
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{tier.level}</p>
                              <p className="mt-0.5 text-sm text-muted-foreground">{tier.audience}</p>
                            </div>
                            <span className="shrink-0 rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
                              {tier.saving}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[2.75rem] font-bold leading-none tracking-tight">{tier.price}</span>
                            <span className="text-sm font-medium text-muted-foreground">/ month</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <p className="px-1 text-xs text-muted-foreground/70">
                      * One-time intake · Limited spots · Per student per month, full 3-month duration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Better Together</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Small group tuition</h2>
            <p className="leading-relaxed text-muted-foreground">Bring 1–2 friends and everyone pays less. Same quality, warmer energy, still capped small.</p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2">
            {GROUP_TIERS.map((tier) => (
              <motion.div
                key={tier.pax}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-3xl border-2 border-primary/20 bg-primary/5 p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold">{tier.pax}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      <BadgePercent className="h-3.5 w-3.5" />
                      {tier.discount}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{tier.saving}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[{ label: "Physical", icon: MapPin, data: tier.physical }, { label: "Online", icon: Monitor, data: tier.online }].map((section) => (
                    <div key={section.label} className="space-y-2.5">
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

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-center text-primary-foreground shadow-2xl shadow-primary/20 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-2xl space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/15">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start with a free lesson</h2>
              <p className="mx-auto max-w-md leading-relaxed opacity-85">
                No payment, no deposit, no pressure. Come try the class; if it is not the right fit, you can walk away kindly.
              </p>
            </div>
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2.5 rounded-full bg-primary-foreground px-9 py-3.5 text-sm font-bold tracking-wide text-primary shadow-xl transition-transform hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4" />
              Book Your Free Trial on WhatsApp
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
