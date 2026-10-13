"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MapPinned, Trash2, X } from "lucide-react";

import { spots, type Spot } from "@/lib/spots";

type TripPlannerContextValue = {
  plannedSpots: Spot[];
  addSpot: (spot: Spot) => void;
  removeSpot: (spotName: string) => void;
  isPlanned: (spotName: string) => boolean;
  openPlanner: () => void;
};

const TripPlannerContext = createContext<TripPlannerContextValue | null>(null);
const storageKey = "layag-batangas-itinerary";

export function TripPlannerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plannedNames, setPlannedNames] = useState<string[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedNames = window.localStorage.getItem(storageKey);

      if (savedNames) {
        try {
          const parsedNames = JSON.parse(savedNames);
          if (Array.isArray(parsedNames)) {
            setPlannedNames(
              parsedNames.filter(
                (name): name is string => typeof name === "string",
              ),
            );
          }
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }

      setHasLoadedStorage(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(plannedNames));
  }, [hasLoadedStorage, plannedNames]);

  useEffect(() => {
    if (!isPlannerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPlannerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlannerOpen]);

  const plannedSpots = useMemo(
    () =>
      plannedNames
        .map((name) => spots.find((spot) => spot.name === name))
        .filter((spot): spot is Spot => Boolean(spot)),
    [plannedNames],
  );

  const addSpot = (spot: Spot) => {
    setPlannedNames((currentNames) =>
      currentNames.includes(spot.name)
        ? currentNames
        : [...currentNames, spot.name],
    );
  };

  const removeSpot = (spotName: string) => {
    setPlannedNames((currentNames) =>
      currentNames.filter((name) => name !== spotName),
    );
  };

  const isPlanned = (spotName: string) => plannedNames.includes(spotName);

  return (
    <TripPlannerContext.Provider
      value={{
        plannedSpots,
        addSpot,
        removeSpot,
        isPlanned,
        openPlanner: () => setIsPlannerOpen(true),
      }}
    >
      {children}
      <TripPlannerPanel
        isOpen={isPlannerOpen}
        plannedSpots={plannedSpots}
        onClose={() => setIsPlannerOpen(false)}
        onRemove={removeSpot}
        onClear={() => setPlannedNames([])}
      />
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  const context = useContext(TripPlannerContext);

  if (!context) {
    throw new Error("useTripPlanner must be used inside TripPlannerProvider");
  }

  return context;
}

function TripPlannerPanel({
  isOpen,
  plannedSpots,
  onClose,
  onRemove,
  onClear,
}: {
  isOpen: boolean;
  plannedSpots: Spot[];
  onClose: () => void;
  onRemove: (spotName: string) => void;
  onClear: () => void;
}) {
  const routeUrl = useMemo(() => {
    if (plannedSpots.length === 0) {
      return "https://www.google.com/maps";
    }

    const destination = plannedSpots[plannedSpots.length - 1].coordinates;
    const waypoints = plannedSpots
      .slice(0, -1)
      .map((spot) => `${spot.coordinates.lat},${spot.coordinates.lng}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}${waypoints ? `&waypoints=${waypoints}` : ""}`;
  }, [plannedSpots]);

  return (
    <div
      className={`fixed inset-0 z-60 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close trip planner"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/45 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="trip-planner-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-[-24px_0_70px_-35px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Your route
            </p>
            <h2
              id="trip-planner-title"
              className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground"
            >
              Plan a Trip
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Save a few places and turn them into a Batangas route.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close trip planner"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
            <div className="flex items-center gap-3">
              <MapPinned className="size-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {plannedSpots.length}{" "}
                {plannedSpots.length === 1 ? "stop" : "stops"} selected
              </span>
            </div>
            {plannedSpots.length > 0 ? (
              <button
                type="button"
                onClick={onClear}
                className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {plannedSpots.length > 0 ? (
            <div className="mt-5 space-y-3">
              {plannedSpots.map((spot, index) => (
                <div
                  key={spot.name}
                  className="flex items-center gap-4 rounded-2xl border border-border/70 p-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">
                      {spot.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {spot.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(spot.name)}
                    aria-label={`Remove ${spot.name}`}
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <MapPinned className="mx-auto size-10 text-border" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Your itinerary is empty
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                Add destinations from the guide and they will appear here.
              </p>
              <Link
                href="#destinations"
                onClick={onClose}
                className="mt-5 inline-flex text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Browse destinations
              </Link>
            </div>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <a
            href={routeUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${plannedSpots.length > 0 ? "bg-primary text-primary-foreground hover:bg-primary/80" : "pointer-events-none bg-muted text-muted-foreground"}`}
          >
            Open route in Google Maps
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </aside>
    </div>
  );
}

export function AddToTripButton({ spot }: { spot: Spot }) {
  const { addSpot, isPlanned, openPlanner } = useTripPlanner();
  const planned = isPlanned(spot.name);

  const handleClick = () => {
    if (planned) {
      openPlanner();
      return;
    }

    addSpot(spot);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${planned ? "bg-primary/10 text-primary" : "border border-border bg-background text-foreground hover:bg-muted"}`}
    >
      {planned ? (
        <Check className="size-4" />
      ) : (
        <MapPinned className="size-4" />
      )}
      {planned ? "In your trip" : "Add to trip"}
    </button>
  );
}
