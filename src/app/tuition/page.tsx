"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap, Clock, Users, CheckCircle2, DollarSign,
  Gift, Sparkles, Target, FileText, MessageCircle, CalendarCheck,
  Timer, Brain, ScrollText, MapPin, Monitor,
} from "lucide-react";

const WHAT_YOU_GET = [
  {
    icon: FileText,
    title: "Custom Notes & Worksheets",
    desc: "All materials are written from scratch — no assessment books, no photocopied textbooks. Every sheet is tailored to your level and weak areas.",
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "24/7 Support",
    desc: "Stuck on a question at midnight before an exam? Text anytime on WhatsApp and get a response — not a bot, just your tutor.",
    highlight: false,
  },
  {
    icon: CalendarCheck,
    title: "Free Extra Consultations",
    desc: "Need an extra session before a test? Consultations outside of scheduled lessons are completely free, no extra charge.",
    highlight: true,
  },
  {
    icon: Timer,
    title: "Timed Practice",
    desc: "Build real exam stamina with structured timed exercises that simulate the pressure of actual test conditions.",
    highlight: false,
  },
  {
    icon: Brain,
    title: "Concept Mastery",
    desc: "We don't just drill formulas — you'll understand the why behind every topic so it sticks long after exam day.",
    highlight: false,
  },
  {
    icon: ScrollText,
    title: "Past Paper Drilling",
    desc: "Systematic practice with real O-Level and N-Level past papers, with guided walkthroughs of marking schemes.",
    highlight: true,
  },
];

const RATES = [
  { mode: "Physical", icon: MapPin, tiers: [{ label: "Sec 1–2", price: "$30" }, { label: "Sec 3–4", price: "$35" }] },
  { mode: "Online", icon: Monitor, tiers: [{ label: "Sec 1–2", price: "$25" }, { label: "Sec 3–4", price: "$30" }] },
];

const GROUP_TIERS = [
  {
    pax: "2 Pax",
    discount: "10% off",
    saving: "Save $2–3/hr each",
    physical: [{ label: "Sec 1–2", was: "$30", now: "$27" }, { label: "Sec 3–4", was: "$35", now: "$31" }],
    online: [{ label: "Sec 1–2", was: "$25", now: "$22" }, { label: "Sec 3–4", was: "$30", now: "$27" }],
  },
  {
    pax: "3 Pax",
    discount: "15% off",
    saving: "Save $3–5/hr each",
    physical: [{ label: "Sec 1–2", was: "$30", now: "$25" }, { label: "Sec 3–4", was: "$35", now: "$29" }],
    online: [{ label: "Sec 1–2", was: "$25", now: "$21" }, { label: "Sec 3–4", was: "$30", now: "$25" }],
  },
];

export default function TuitionPage() {
  const openWhatsApp = () => window.open("https://wa.me/6588872996", "_blank");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-16">

        {/* Hero */}
        <div className="text-center space-y-5">
          <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 font-semibold px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Free Trial Lesson — No Commitment
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
            Private Maths Tuition<br />
            <span className="text-primary">built around you.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            One-on-one tuition for Secondary 1–4 students in E Math & A Math. No textbooks. No generic worksheets. Just teaching that actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Button
              size="lg"
              className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              onClick={openWhatsApp}
            >
              <Gift className="w-4 h-4 mr-2" />
              Claim Free Trial Lesson
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl font-bold" onClick={openWhatsApp}>
              WhatsApp Us
            </Button>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">What's included</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">What you&apos;ll get</h2>
            <p className="text-muted-foreground text-sm">Every student gets the same full package — nothing locked behind a higher tier.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_YOU_GET.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex gap-4 p-5 rounded-xl border transition-colors ${
                    item.highlight
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/60 bg-muted/20"
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Who + Format */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Who I Teach</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { level: "Lower Secondary", detail: "Sec 1–2 · E Math" },
                { level: "Upper Secondary", detail: "Sec 3–4 · E Math & A Math" },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{item.level}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Lesson Format</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                "1-on-1 personalised sessions",
                "1.5–2 hour lessons",
                "Weekdays & weekends available",
                "Physical or online — your choice",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Rates */}
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Rates</h2>
            <p className="text-muted-foreground text-sm">Straightforward hourly pricing. First lesson is always free.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {RATES.map(({ mode, icon: ModeIcon, tiers }) => (
              <Card key={mode} className="border-border/60">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <ModeIcon className="w-4 h-4" />
                    {mode}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tiers.map((tier) => (
                    <div key={tier.label} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/15">
                      <div>
                        <p className="font-bold text-sm">{tier.label}</p>
                        <p className="text-xs text-muted-foreground">per hour</p>
                      </div>
                      <span className="text-3xl font-black text-primary">{tier.price}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground px-1">
            {["First lesson free", "No registration fees", "Flexible payment"].map((note) => (
              <div key={note} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {note}
              </div>
            ))}
          </div>
        </div>

        {/* Group Tuition */}
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Better with friends</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Group Tuition</h2>
            <p className="text-muted-foreground text-sm">Bring 1–2 friends and everyone pays less. Same quality, better rates.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {GROUP_TIERS.map((tier) => (
              <div key={tier.pax} className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-black text-lg">{tier.pax}</span>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 font-bold text-sm">
                      {tier.discount}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{tier.saving}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" /> Physical
                  </div>
                  {tier.physical.map((t) => (
                    <div key={t.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-background/70 border border-border/40">
                      <span className="text-sm font-medium">{t.label}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-muted-foreground line-through">{t.was}</span>
                        <span className="font-black text-primary">{t.now}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Monitor className="w-3.5 h-3.5" /> Online
                  </div>
                  {tier.online.map((t) => (
                    <div key={t.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-background/70 border border-border/40">
                      <span className="text-sm font-medium">{t.label}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-muted-foreground line-through">{t.was}</span>
                        <span className="font-black text-primary">{t.now}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground px-1">
            * All students in the group must be at the same level and subject. Group size capped at 3 to maintain lesson quality.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border-2 border-emerald-600/40 bg-emerald-600/5 p-8 text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600/10 mb-1">
            <GraduationCap className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to get started?</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
              Your first lesson is completely free. No payment, no pressure — just show up and see if it works for you.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-12"
            onClick={openWhatsApp}
          >
            <Gift className="w-4 h-4 mr-2" />
            Book Your Free Trial on WhatsApp
          </Button>
        </div>

      </div>
    </div>
  );
}
