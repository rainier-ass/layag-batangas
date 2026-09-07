import Link from "next/link";

const footerLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Stories", href: "#stories" },
  { label: "Plan a trip", href: "#plan-trip" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0E3B43]">
      {/* horizon line, matching navbar/hero */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#E0703A] via-[#4FA9A8] to-[#0E3B43]" />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        {/* brand */}
        <div className="max-w-md space-y-4">
          <span className="font-serif text-2xl font-medium tracking-tight text-[#F5EFE2]">
            Layag Batangas
          </span>
          <p className="text-[15px] leading-relaxed text-[#F5EFE2]/60">
            A simple Batangas tourism guide built to highlight beaches,
            heritage towns, faith destinations, and local experiences in one
            place.
          </p>
        </div>

        {/* links */}
        <div>
          <h2 className="font-serif text-lg text-[#F5EFE2]">Explore</h2>
          <div className="mt-5 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] text-[#F5EFE2]/60 transition-colors hover:text-[#E0703A]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* contact */}
        <div>
          <h2 className="font-serif text-lg text-[#F5EFE2]">Contact</h2>
          <div className="mt-5 space-y-3 text-[15px] text-[#F5EFE2]/60">
            <p>Batangas, Philippines</p>
            <p>
              <Link
                href="mailto:hello@layagbatangas.com"
                className="transition-colors hover:text-[#E0703A]"
              >
                hello@layagbatangas.com
              </Link>
            </p>
            <p>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#E0703A]"
              >
                @layagbatangas
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F5EFE2]/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 text-sm text-[#F5EFE2]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Layag Batangas. All rights reserved.</p>
          <p>Built to showcase the beauty of Batangas.</p>
        </div>
      </div>
    </footer>
  );
}