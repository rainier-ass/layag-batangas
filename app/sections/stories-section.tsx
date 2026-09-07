import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    title: "A slow morning in Laiya",
    image: "/laiya.jpg",
    tag: "Beach Journal",
    excerpt:
      "A quiet coast, early light, and an easy itinerary make Laiya feel like Batangas at its most restful.",
    readTime: "4 min read",
  },
  {
    title: "Pilgrimage light at Monte Maria",
    image: "/monte-maria.jpg",
    tag: "Faith Route",
    excerpt:
      "The climb, the view, and the shrine itself turn Monte Maria into a reflective stop for travelers.",
    readTime: "3 min read",
  },
  {
    title: "Finding texture in Taal",
    image: "/taal.webp",
    tag: "Heritage Walk",
    excerpt:
      "Old homes, church facades, and narrow streets give Taal a visual rhythm worth slowing down for.",
    readTime: "5 min read",
  },
];

export default function StoriesSection() {
  return (
    <section id="stories" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-border bg-background px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Stories
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Short reads from the road.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
            These sample stories are a simple editorial layer for the site, built
            around Batangas places and the kind of mood each stop creates.
          </p>
        </div>

        <Link
          href="#destinations"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to destinations
        </Link>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="group overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-[0_20px_60px_-42px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            <Image
              src={stories[0].image}
              alt={stories[0].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-5 top-5 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-white backdrop-blur">
              {stories[0].tag}
            </div>
          </div>

          <div className="p-7">
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span>{stories[0].readTime}</span>
              <span>Layag Batangas editorial</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {stories[0].title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {stories[0].excerpt}
            </p>
          </div>
        </article>

        <div className="grid gap-6">
          {stories.slice(1).map((story) => (
            <article
              key={story.title}
              className="grid overflow-hidden rounded-[1.75rem] border border-border/70 bg-background shadow-[0_20px_60px_-42px_rgba(0,0,0,0.35)] sm:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative min-h-55 bg-muted">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
                <div className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur">
                  {story.tag}
                </div>
              </div>

              <div className="flex flex-col justify-between p-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {story.readTime}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {story.excerpt}
                  </p>
                </div>

                <Link
                  href="#destinations"
                  className="mt-5 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                >
                  Explore related spots
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}