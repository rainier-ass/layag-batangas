"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
	{
		title: "Laiya Beach",
		image: "/laiya.jpg",
		category: "Beach Escape",
		description:
			"Soft sand, calm water, and a classic Batangas coastline for weekend resets.",
	},
	{
		title: "Monte Maria",
		image: "/monte-maria.jpg",
		category: "Pilgrimage Site",
		description:
			"A landmark shrine with a wide view of the province and a peaceful atmosphere.",
	},
	{
		title: "Taal Heritage Town",
		image: "/taal.webp",
		category: "Heritage Stop",
		description:
			"A heritage district filled with old houses, churches, and heritage streets.",
	},
];

export default function HeroSection() {
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setActiveSlide((current) => (current + 1) % slides.length);
		}, 4500);

		return () => window.clearInterval(timer);
	}, []);

	const slide = slides[activeSlide];

	return (
		<section className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(245,245,244,1)_0%,rgba(255,250,243,1)_45%,rgba(255,255,255,1)_100%)]">
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(194,121,56,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(73,108,137,0.14),transparent_28%)]" />
			<div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
				<div className="max-w-2xl">
					<span className="inline-flex rounded-full border border-border/60 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground shadow-sm backdrop-blur">
						Layag Batangas
					</span>

					<h1 className="mt-6 font-heading text-5xl leading-[0.95] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
						Discover the places that make Batangas feel alive.
					</h1>

					<p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
						From coastlines and heritage towns to pilgrimage sites and local food
						stops, Layag Batangas helps travelers explore the province with a
						slower, more intentional route.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							href="#destinations"
							className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
						>
							Explore Destinations
						</Link>
						<Link
							href="#stories"
							className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
						>
							Read Travel Stories
						</Link>
					</div>

					<div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-border/60 pt-6">
						<div>
							<p className="text-2xl font-semibold text-foreground">300+</p>
							<p className="mt-1 text-sm text-muted-foreground">Featured Routes</p>
						</div>
						<div>
							<p className="text-2xl font-semibold text-foreground">240</p>
							<p className="mt-1 text-sm text-muted-foreground">Towns to explore</p>
						</div>
						<div>
							<p className="text-2xl font-semibold text-foreground">16</p>
							<p className="mt-1 text-sm text-muted-foreground">Province to map</p>
						</div>
					</div>
				</div>

				<div className="relative mx-auto w-full max-w-[560px]">
					<div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-primary/10 blur-2xl" />
					<div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/90 p-3 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] backdrop-blur">
						<div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
							{slides.map((item, index) => {
								const isActive = index === activeSlide;

								return (
									<div
										key={item.title}
										className={`absolute inset-0 transition-all duration-700 ease-out ${
											isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
										}`}
										aria-hidden={!isActive}
									>
										<Image
											src={item.image}
											alt={item.title}
											fill
											priority={isActive}
											className="object-cover"
										/>
									</div>
								);
							})}

							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 text-white">
								<p className="text-xs uppercase tracking-[0.3em] text-white/70">
									{slide.category}
								</p>
								<h2 className="mt-2 text-2xl font-semibold">{slide.title}</h2>
								<p className="mt-2 max-w-md text-sm leading-6 text-white/80">
									{slide.description}
								</p>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 px-1 pb-1">
							<div className="flex gap-2">
								{slides.map((item, index) => (
									<button
										key={item.title}
										type="button"
										onClick={() => setActiveSlide(index)}
										className={`h-2.5 rounded-full transition-all ${
											index === activeSlide ? "w-8 bg-primary" : "w-2.5 bg-border"
										}`}
										aria-label={`Show slide ${index + 1}: ${item.title}`}
										aria-pressed={index === activeSlide}
									/>
								))}
							</div>
							<p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
								Auto sliding gallery
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
