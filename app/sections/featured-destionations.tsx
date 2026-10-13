"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { spots } from "@/lib/spots";
import { AddToTripButton } from "@/components/trip-planner";

export default function FeaturedDestinations() {
  const categories = useMemo(
    () => ["All", ...new Set(spots.map((spot) => spot.category))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSpots =
    activeCategory === "All"
      ? spots
      : spots.filter((spot) => spot.category === activeCategory);

  return (
    <section
      id="destinations"
      className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-border bg-background px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Featured Destinations
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Spot objects that highlight Batangas in different ways.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
            Beaches, heritage towns, pilgrimage sites, and local stops are all
            represented here using the current spot objects from the data file.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredSpots.map((spot) => {
          const mapUrl = `https://www.google.com/maps?q=${spot.coordinates.lat},${spot.coordinates.lng}`;

          return (
            <article
              key={spot.name}
              className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-background shadow-[0_20px_60px_-42px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-white backdrop-blur">
                  {spot.category}
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {spot.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {spot.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <AddToTripButton spot={spot} />
                  <Link
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    Open in maps
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredSpots.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No spots match the selected filter.
        </p>
      ) : null}
    </section>
  );
}
