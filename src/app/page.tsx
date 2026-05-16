"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, PenTool, ArrowRight, Sigma, GraduationCap, Sparkles, FlameKindling, Leaf, Star } from "lucide-react";
import { useRef } from "react";

const subjects = [
  { label: "Secondary 1 & 2", sub: "E Math foundation" },
  { label: "Secondary 3 & 4", sub: "E Math · A Math" },
  { label: "O-Level", sub: "4048 · 4049" },
  { label: "N-Level", sub: "Maths" },
];

const offerings = [
  {
    icon: BookOpen,
    title: "Study Notes",
    desc: "Clear, exam-focused notes covering full syllabi — organised by chapter and topic, written to truly explain the why.",
    href: "/notes",
    tag: "Free",
    tagColor: "bg-[oklch(0.88_0.04_148)] text-[oklch(0.28_0.06_145)]",
  },
  {
    icon: Sigma,
    title: "Formula Hub",
    desc: "Every key formula in one clean reference — with the official exam formula sheet, searchable and copyable.",
    href: "/formulas",
    tag: "Free",
    tagColor: "bg-[oklch(0.88_0.04_148)] text-[oklch(0.28_0.06_145)]",
  },
  {
    icon: PenTool,
    title: "Practice",
    desc: "Past-paper style questions with full worked solutions, organised by topic and difficulty level.",
    href: "/practice",
    tag: "Free",
    tagColor: "bg-[oklch(0.88_0.04_148)] text-[oklch(0.28_0.06_145)]",
  },
  {
    icon: GraduationCap,
    title: "Private Tuition",
    desc: "1-on-1 boutique sessions for Sec 1–4 E Math & A Math. Small groups. Free trial lesson — no commitment.",
    href: "/tuition",
    tag: "Boutique",
    tagColor: "bg-primary/10 text-primary",
  },
];

const values = [
  {
    icon: FlameKindling,
    title: "The Satori Moment",
    desc: "We chase the quiet \"click\" — that beautiful instant when confusion turns to calm clarity. Every session is designed to create more of those moments.",
  },
  {
    icon: Leaf,
    title: "Patient by Design",
    desc: "No rushing, no pressure, no drilling for its own sake. We give each concept the time and space it deserves to truly take root.",
  },
  {
    icon: Star,
    title: "Mindset Over Marks",
    desc: "We care about your child's confidence and curiosity as much as their grades. Lasting success starts from the inside.",
  },
  {
    icon: Sparkles,
    title: "Boutique Quality",
    desc: "Small groups. Custom materials. A tutor who genuinely knows your child — not a franchise, not a system.",
  },
];

const testimonials = [
  {
    quote: "My daughter used to dread Maths. After three months at Satori Education Studio, she actually looks forward to it. The difference is real.",
    name: "Parent of Sec 3 student",
    detail: "E Math & A Math",
  },
  {
    quote: "The notes are so much cleaner than anything else I've found. Actually explains the concept, not just the steps.",
    name: "Secondary 4 student",
    detail: "A Math",
  },
  {
    quote: "Finally a tutor who doesn't just drill past papers. My son understands why — and that changed everything.",
    name: "Parent of Sec 2 student",
    detail: "E Math",
  },
];

const ENSO_PATH = "M50 8 C79 8, 94 27, 94 50 C94 73, 79 92, 50 92 C21 92, 6 73, 6 50 C6 29, 19 12, 36 8.5";
// Three rings, three Satori palette colours: terracotta · sage · warm amber
const RINGS = [
  { size: "min(72vw, 72vh)", left: "50%",  top: "50%",  x: "-50%", y: "-50%", peak: 0.48, rest: 0.11, sw: 2.2, delay: 0.1,  dur: 2.8,  rot: -8,  stroke: "#C2705A", tipFill: "#C2705A" },
  { size: "min(44vw, 44vh)", left: "14%",  top: "26%",  x: "-50%", y: "-50%", peak: 0.36, rest: 0.09, sw: 2.8, delay: 0.6,  dur: 2.4,  rot: 20,  stroke: "#7A9E7E", tipFill: "#7A9E7E" },
  { size: "min(40vw, 40vh)", left: "86%",  top: "72%",  x: "-50%", y: "-50%", peak: 0.34, rest: 0.09, sw: 3.0, delay: 1.1,  dur: 2.2,  rot: -30, stroke: "#C49A3C", tipFill: "#C49A3C" },
] as const;

function AnimatedEnsoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {RINGS.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: ring.left,
            top: ring.top,
            width: ring.size,
            height: ring.size,
            x: ring.x,
            y: ring.y,
            rotate: ring.rot,
            mixBlendMode: "multiply",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: [0, ring.peak, ring.peak, ring.rest], scale: [0.96, 1, 1] }}
          transition={{
            duration: ring.dur + 1.2,
            times: [0, 0.08, 0.74, 1],
            ease: "easeInOut",
            delay: ring.delay,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible drop-shadow-[0_18px_35px_rgba(194,112,90,0.10)]">
            <motion.path
              d={ENSO_PATH}
              pathLength={1}
              stroke={ring.stroke}
              strokeWidth={ring.sw}
              strokeLinecap="round"
              fill="none"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0.045 }}
              transition={{ duration: ring.dur, ease: [0.65, 0, 0.25, 1], delay: ring.delay }}
            />
            <motion.path
              d="M34.5 7.8 C34 5.8, 36.5 4.5, 38 6.5 C36.5 7.8, 35 8.8, 34.5 7.8Z"
              fill={ring.tipFill}
              initial={{ opacity: 0, scale: 0, rotate: -8 }}
              animate={{ opacity: i === 0 ? 0.9 : 0.72, scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, delay: ring.delay + ring.dur - 0.08, ease: "backOut" }}
              style={{ transformOrigin: "36px 7px" }}
            />
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.65, 0.28], scale: [0.8, 1.06, 1] }}
        transition={{ duration: 3.4, ease: "easeOut" }}
      />
    </div>
  );
}

function EnsoCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d={ENSO_PATH}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center px-5 sm:px-8 pt-12 pb-24 overflow-hidden">

        {/* Animated enso background — draws on page load */}
        <AnimatedEnsoBackground />

        {/* Warm ambient colour blobs */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-primary/6 blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/15 blur-[90px]" />
        </div>

        {/* Small decorative enso accents */}
        <EnsoCircle className="pointer-events-none absolute top-16 right-[8%] z-0 w-28 h-28 text-primary hidden lg:block" />
        <EnsoCircle className="pointer-events-none absolute bottom-24 left-[6%] z-0 w-16 h-16 text-accent hidden lg:block" />

        {/* Floating maths symbols */}
        {[
          { sym: "∑", x: "11%",  y: "17%", delay: 0,   dur: 7  },
          { sym: "∂", x: "87%",  y: "24%", delay: 1.2, dur: 9  },
          { sym: "π", x: "77%",  y: "71%", delay: 0.5, dur: 8  },
          { sym: "∫", x: "6%",   y: "67%", delay: 2,   dur: 10 },
          { sym: "√", x: "49%",  y: "87%", delay: 0.8, dur: 6  },
        ].map((f) => (
          <motion.span
            key={f.sym + f.x}
            className="pointer-events-none absolute z-10 text-xl font-light text-primary/8 select-none hidden md:block"
            style={{ left: f.x, top: f.y, fontFamily: "serif" }}
            animate={{ y: [0, -14, 0], opacity: [0.06, 0.16, 0.06] }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {f.sym}
          </motion.span>
        ))}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 max-w-4xl mx-auto text-center space-y-10"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <FlameKindling className="w-3.5 h-3.5" />
              Secondary Maths Tuition · Singapore
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold tracking-tight leading-[1.05]">
              The space where
              <br />
              <span className="relative inline-block">
                <span className="text-primary">learning clicks.</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M2 9 C60 3, 150 2, 298 9"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-primary/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
                  />
                </svg>
              </span>
            </h1>

            {/* Kanji */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-3 pt-2"
            >
              <span className="text-2xl font-light text-muted-foreground/50" style={{ fontFamily: "serif" }}>悟り</span>
              <span className="w-px h-5 bg-border" />
              <span className="text-sm text-muted-foreground font-medium italic">
                the moment understanding arrives
              </span>
            </motion.div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
          >
            A boutique mathematics learning space for Singapore secondary school students — Sec 1 to 4,
            E Math and A Math. Free resources, personalised tuition, and a belief that understanding cannot be forced — only uncovered.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2"
          >
            <Link
              href="/notes"
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Free Resources
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tuition"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-border hover:border-primary/40 bg-transparent text-foreground font-bold text-sm tracking-wide hover:bg-primary/5 transition-all duration-300"
            >
              Book Free Trial
            </Link>
          </motion.div>

          {/* Subject pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {subjects.map((s) => (
              <div key={s.label} className="px-4 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs font-semibold text-muted-foreground">
                <span className="text-foreground">{s.label}</span>
                <span className="ml-1 opacity-60">· {s.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="flex items-center gap-6 px-8 sm:px-16 py-4 opacity-30">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-lg text-muted-foreground" style={{ fontFamily: "serif" }}>悟り</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ─── PHILOSOPHY ─── */}
      <section className="px-5 sm:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Philosophy</p>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                  Nurturing minds.<br />
                  <span className="text-primary">Unlocking</span> breakthrough moments.
                </h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-lg">
                You know that beautiful, quiet moment when a heavy academic challenge suddenly makes sense?
                The relief, the spark in the eyes, the sudden surge of confidence — that is Satori.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                We believe true learning cannot be forced; it must be <em>uncovered</em>. Through small groups,
                deep patience, and gentle guidance, we care for your child&apos;s mindset just as much as their grades.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OFFERINGS ─── */}
      <section className="px-5 sm:px-8 py-24 md:py-32 bg-card/40 border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            <motion.div variants={fadeUp} className="text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">What We Offer</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Everything in one place</h2>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Free resources for every student. Boutique tuition for those who want more.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {offerings.map((o, idx) => (
                <motion.div key={o.href} variants={fadeUp} custom={idx}>
                  <Link
                    href={o.href}
                    className="group flex flex-col gap-5 p-6 rounded-2xl border border-border/50 bg-card h-full hover:border-primary/40 hover:shadow-xl hover:shadow-primary/6 hover:-translate-y-1 transition-all duration-400"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <o.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${o.tagColor}`}>
                        {o.tag}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-base">{o.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="px-5 sm:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            <motion.div variants={fadeUp} className="text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Kind Words</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Where confidence meets<br />understanding</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative flex flex-col gap-5 p-7 pl-9 rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-400 overflow-hidden"
                >
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors duration-400" />
                  <div className="text-4xl leading-none text-primary/20 font-serif select-none">"</div>
                  <p className="text-sm leading-relaxed text-foreground/90 flex-1 -mt-3">{t.quote}</p>
                  <div className="pt-4 border-t border-border/40">
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-5 sm:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16 text-center text-primary-foreground"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-black/10 blur-3xl pointer-events-none" />
            <div className="absolute top-6 right-8 opacity-15">
              <EnsoCircle className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-7">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">Start Today</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Your first lesson<br />is completely free.
                </h2>
              </div>
              <p className="text-base md:text-lg opacity-80 max-w-md mx-auto font-medium leading-relaxed">
                No payment. No pressure. Just show up, experience the Satori difference, and see if it works for your child.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  href="/tuition"
                  className="px-8 py-3.5 rounded-full bg-primary-foreground text-primary font-bold text-sm tracking-wide shadow-xl hover:scale-[1.02] transition-transform"
                >
                  Book Free Trial Lesson
                </Link>
                <Link
                  href="/notes"
                  className="px-8 py-3.5 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-bold text-sm tracking-wide hover:bg-white/10 transition-colors"
                >
                  Explore Free Notes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/40 px-5 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xl font-light" style={{ fontFamily: "serif" }}>悟り</span>
            <span className="text-sm font-semibold">Satori Education Studio</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Satori Education Studio · Boutique Learning Space · Singapore
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground font-semibold">
            <Link href="/notes" className="hover:text-foreground transition-colors">Notes</Link>
            <Link href="/tuition" className="hover:text-foreground transition-colors">Tuition</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
