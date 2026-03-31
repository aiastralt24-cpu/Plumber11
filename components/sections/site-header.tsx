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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-white sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
          PlumbRight
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:09810001001" className="hidden md:block">
            <Button variant="ghost">
              <PhoneCall className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </a>
          <Link href="/book">
            <Button>Book a Plumber</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
