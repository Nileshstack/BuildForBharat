"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RegisterButton } from "@/components/shared/register-button";
import { navigationItems } from "./navigation";

const drawerVariants = {
  closed: { x: "100%", opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.28, staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 14 },
  open: { opacity: 1, x: 0 },
};

const stillDrawerVariants = {
  closed: { x: 0, opacity: 1 },
  open: { x: 0, opacity: 1, transition: { duration: 0 } },
};

const stillLinkVariants = {
  closed: { opacity: 1, x: 0 },
  open: { opacity: 1, x: 0, transition: { duration: 0 } },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateScrolled);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusableItems = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      );
    focusableItems()[0]?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        const items = focusableItems();
        const first = items[0];
        const last = items.at(-1);
        if (!menu?.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };
  const activeItem =
    pathname === "/tracks" ||
    pathname === "/prizes" ||
    pathname === "/schedule" ||
    pathname === "/rules" ||
    pathname === "/faq" ||
    pathname === "/contact"
      ? pathname.slice(1)
      : pathname === "/"
        ? active
        : "home";

  return (
    <>
      <header
        className={`sticky top-0.75 z-40 border-b transition-[background-color,box-shadow,border-color] ${scrolled ? "border-navy/10 bg-white/82 shadow-[0_8px_24px_rgba(11,27,58,0.06)] backdrop-blur-xl" : "border-transparent bg-white/55 backdrop-blur-md"}`}
      >
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 sm:px-7">
          <Link
            href="/#home"
            className="shrink-0 font-heading text-sm font-bold leading-tight text-navy sm:text-base"
            aria-label="Build for Bharat 2026 home"
          >
            BUILD FOR <span className="tricolour-text">BHARAT</span>{" "}
            <span className="text-saffron">2026</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActive(item.id)}
                aria-current={activeItem === item.id ? "location" : undefined}
                className="relative rounded-sm px-2.5 py-3 text-[13px] font-medium text-navy/70 transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              >
                {item.label}
                {activeItem === item.id ? (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute inset-x-2.5 bottom-1 h-0.5 rounded-full bg-saffron"
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <RegisterButton className="min-h-10 px-4 py-2 text-xs" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-10 place-items-center rounded-md border border-navy/10 bg-white/75 text-navy lg:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" size={19} />
            ) : (
              <Menu aria-hidden="true" size={19} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-60 bg-navy/35 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            onClick={closeMenu}
          >
            <motion.nav
              id="mobile-navigation"
              ref={menuRef}
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
              className="absolute inset-y-0 right-0 flex w-[min(88vw,390px)] flex-col border-l border-white/80 bg-[#f7fbff] px-6 pb-8 pt-5 shadow-2xl"
              variants={reducedMotion ? stillDrawerVariants : drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: reducedMotion ? 0 : 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-9 flex items-center justify-between border-b border-navy/10 pb-5">
                <p className="font-heading text-sm font-bold text-navy">
                  BUILD FOR BHARAT 2026
                </p>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="grid size-10 place-items-center rounded-md text-navy hover:bg-navy/5"
                >
                  <X aria-hidden="true" size={19} />
                </button>
              </div>
              <ul className="flex flex-1 flex-col">
                {navigationItems.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={reducedMotion ? stillLinkVariants : linkVariants}
                    transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActive(item.id);
                        closeMenu();
                      }}
                      aria-current={
                        activeItem === item.id ? "location" : undefined
                      }
                      className="block border-b border-navy/8 py-3.5 font-heading text-lg font-medium text-navy"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <RegisterButton className="w-full" />
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
