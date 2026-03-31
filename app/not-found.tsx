import Link from "next/link";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";

export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">404</p>
        <h1 className="mt-4 font-display text-5xl text-primary">This service route is not live yet.</h1>
        <p className="mt-4 text-lg text-muted">
          Use the city selector or jump back to the homepage to continue booking.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-panel"
        >
          Go to homepage
        </Link>
      </main>
      <div id="site-footer-trigger" />
      <SiteFooter />
    </div>
  );
}
