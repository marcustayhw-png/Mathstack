"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "./button";
import Image from "next/image";

const navItems = [
  { href: "/notes", label: "Notes" },
  { href: "/formulas", label: "Formulas" },
  { href: "/practice", label: "Practice" },
  { href: "/tuition", label: "Tuition" },
  { href: "/about", label: "About" },
];

/* Native logo mark — enso SVG that uses site colour tokens directly,
   used in dark mode (and as fallback) so it feels part of the site */
function SatoriMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Thin enso — open at top, slight hand-drawn asymmetry */}
      <path
        d="M20.5 5.5 C30.2 5.8, 36.5 12.2, 36.2 20.4 C35.9 28.8, 29 35.2, 20 35 C11 34.8, 4.2 28.2, 4.5 19.8 C4.7 13.4, 8.8 8.3, 15.2 6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="text-primary"
      />
      {/* Tiny maple leaf bridging the gap at top — stem anchors the two ends */}
      <path
        d="M17.8 5.2 C18.3 3.8, 19.5 3.2, 20.8 3.8 C21.8 4.3, 22 5.2, 21.2 5.8 C20.4 6.4, 19 6.8, 17.8 5.2Z"
        fill="currentColor"
        opacity="0.65"
        className="text-[#7A9E7E]"
        style={{ fill: "#7A9E7E" }}
      />
      {/* Leaf stem */}
      <line x1="19.5" y1="5.2" x2="19.5" y2="7" stroke="#7A9E7E" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAdmin(!!localStorage.getItem("ms_admin_token"));
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl shadow-sm shadow-primary/5 border-b border-border/40"
          : "bg-background/60 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-7">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-75 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Light mode: image with multiply blend so linen bg dissolves into nav */}
            <Image
              src="/logo-horizontal.jpg"
              alt="Satori Education Studio"
              width={210}
              height={70}
              className="h-10 w-auto object-contain dark:hidden"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
            {/* Dark mode: native SVG mark + text using site colour tokens */}
            <span className="hidden dark:flex items-center gap-2.5">
              <SatoriMark size={32} />
              <span className="flex flex-col leading-none gap-0.5">
                <span
                  className="text-[14px] font-bold tracking-wide text-foreground"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Satori
                </span>
                <span
                  className="text-[9.5px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Education Studio
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-border/60 flex items-center gap-1">
              {mounted && isAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center md:hidden gap-1">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden border-t border-border/40 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border-t border-border/40 mt-1 pt-3 ${
                      pathname.startsWith("/admin")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
