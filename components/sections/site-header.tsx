import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/cities", label: "Cities" },
  { href: "/services", label: "Services" },
  { href: "/mumbai/emergency-plumber", label: "Emergency" },
  { href: "/reviews", label: "Reviews" },
  { href: "/partner-with-us", label: "Partner With Us" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-white shadow-[0_10px_30px_rgba(3,10,18,0.22)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-base text-accent sm:h-10 sm:w-10 sm:text-lg">
            ◔
          </span>
          <span className="truncate text-white">Plumberdost</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/78 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:09810001001"
            className="hidden rounded-2xl border border-white/12 bg-white/6 px-5 py-3 md:block"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <PhoneCall className="h-4 w-4" />
              24/7 Helpline
            </span>
          </a>
          <Link href="/book">
            <Button className="min-h-11 px-4 text-sm sm:px-6" variant="primary">
              Book Plumber Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
