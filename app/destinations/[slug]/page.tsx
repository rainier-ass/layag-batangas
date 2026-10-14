import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToTripButton } from "@/components/trip-planner";
import { getSpotBySlug, getSpotSlug, spots } from "@/lib/spots";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return spots.map((spot) => ({ slug: getSpotSlug(spot.name) }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);

  return {
    title: spot
      ? `${spot.name} | Layag Batangas`
      : "Destination | Layag Batangas",
    description: spot?.description,
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);

  if (!spot) {
    notFound();
  }

  const mapUrl = `https://www.google.com/maps?q=${spot.coordinates.lat},${spot.coordinates.lng}`;

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/#destinations"
          className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
        >
          Back to destinations
        </Link>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[16/8] min-h-64 bg-muted sm:min-h-96">
            <Image
              src={spot.image}
              alt={spot.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-10 sm:right-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                {spot.category}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                {spot.name}
              </h1>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-muted-foreground">
                {spot.description}
              </p>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Use this page as a starting point for your route, then confirm
                current schedules, access rules, and availability before you
                travel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-stretch">
              <AddToTripButton spot={spot} />
              <Link
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                Open in Google Maps
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
