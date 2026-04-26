"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "./button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes" },
  { href: "/formulas", label: "Formulas" },
  { href: "/practice", label: "Practice" },
  { href: "/tuition", label: "Tuition" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAdmin(!!localStorage.getItem("ms_admin_token"));
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/75 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-black text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect width="32" height="32" rx="9" fill="url(#nav-logo-grad)" />
              <text x="16" y="22" textAnchor="middle" fontSize="17" fontWeight="bold" fontFamily="serif" fill={mounted && theme === "dark" ? "#18181b" : "white"}>∑</text>
              <defs>
                <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor={mounted && theme === "dark" ? "#f4f4f5" : "#18181b"} />
                  <stop offset="1" stopColor={mounted && theme === "dark" ? "#d4d4d8" : "#27272a"} />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-base tracking-tight">MathStack</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-3 pl-3 border-l border-border/60 flex items-center gap-1">
              {mounted && isAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary font-semibold"
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
                  className="h-8 w-8 rounded-lg"
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
                className="h-8 w-8 rounded-lg"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
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
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden border-t border-border/50 overflow-hidden"
            >
              <div className="py-3 space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-t border-border/40 mt-1 pt-3 ${
                      pathname.startsWith("/admin")
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
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