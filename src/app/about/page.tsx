"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FlameKindling, Leaf, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative px-5 sm:px-8 pt-20 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute top-[-10%] right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-primary/8 blur-[90px] -z-10" />

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-5xl" style={{ fontFamily: "serif" }}>悟り</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              About <span className="text-primary">Satori Studio</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              A boutique learning space built on one belief: that the best learning moment is the quiet one — when confusion turns to calm, clear understanding.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-28 space-y-20">

        {/* The Name */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">The Name</p>
            <h2 className="text-3xl font-bold tracking-tight">Why Satori?</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Satori (悟り) is a Japanese word that represents that exact, magical moment when a difficult concept suddenly clicks — the <em>"aha!"</em> or lightbulb moment when confusion turns into clear, calm understanding.
            </p>
            <p>
              It perfectly captures what we stand for: not the stress of drilling, not the pressure of rankings — but the joy of breakthrough. That quiet, warm feeling when something hard finally makes sense.
            </p>
            <p>
              Every session we run, every resource we build, every explanation we give — is designed to create more of those moments.
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-5 opacity-30">
          <div className="flex-1 h-px bg-border" />
          <span className="text-lg text-muted-foreground" style={{ fontFamily: "serif" }}>悟り</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Philosophy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Approach</p>
            <h2 className="text-3xl font-bold tracking-tight">How we teach</h2>
          </motion.div>

          <motion.div variants={stagger} className="space-y-4">
            {[
              {
                icon: FlameKindling,
                title: "Understanding over drilling",
                desc: "We don't just teach you how to answer — we teach you why it works. That's the difference between a student who can do one type of question and a student who can handle anything the exam throws at them.",
              },
              {
                icon: Leaf,
                title: "Patience as a method",
                desc: "Every child learns at their own pace. We slow down where needed, revisit what was missed, and never make a student feel behind. Patience isn't just a virtue here — it's a teaching technique.",
              },
              {
                icon: Heart,
                title: "Care for the whole child",
                desc: "Exam anxiety, low confidence, the feeling of being lost — we see these as challenges to solve together. A student who feels safe and seen learns better than any amount of practice can achieve.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center space-y-6"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Ready to experience the difference?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your first session is completely free. No commitment, no pressure.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tuition"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-border hover:border-primary/40 font-bold text-sm tracking-wide hover:bg-primary/5 transition-all duration-300"
            >
              Explore Free Notes
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
