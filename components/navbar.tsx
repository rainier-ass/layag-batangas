"use client";

import Link from "next/link";
import { useTripPlanner } from "./trip-planner";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experiences" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { openPlanner, plannedSpots } = useTripPlanner();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Layag Batangas
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Tour & Explore
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openPlanner}
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Plan a Trip
            {plannedSpots.length > 0 ? ` (${plannedSpots.length})` : ""}
          </button>
        </div>
      </header>
    </>
  );
}
