import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PartnerWithUsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[32px] bg-primary p-8 text-white shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Partner with us</p>
          <h1 className="mt-3 font-display text-5xl">Join the city network and receive qualified leads.</h1>
          <ul className="mt-8 space-y-3 text-white/78">
            <li>Verified badge and routing visibility</li>
            <li>CRM-backed lead operations</li>
            <li>Review system and city growth support</li>
          </ul>
        </div>
        <form className="rounded-[32px] bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-semibold text-primary">Plumber application</h2>
          <div className="mt-6 space-y-4">
            <Input placeholder="Name" />
            <Input placeholder="City" />
            <Input placeholder="Years of experience" />
            <Input placeholder="Specialisation" />
            <Input placeholder="Mobile" />
            <Textarea placeholder="Upload certificate workflow and document storage are Phase 2 seams; capture notes here for now." />
            <Button fullWidth type="submit">
              Apply to join
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
