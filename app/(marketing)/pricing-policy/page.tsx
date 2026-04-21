export const metadata = {
  title: "Plumbing Pricing Policy | Plumberdost",
  description:
    "Plumberdost explains plumbing price bands, inspection-led quotes, emergency charges, and how customers confirm costs before work begins."
};

const policies = [
  "Small repair pages show indicative price bands to help customers understand likely starting costs.",
  "Final prices depend on issue severity, material needs, accessibility, timing, and site conditions.",
  "For larger jobs, the technician or support team should explain scope and estimated cost before work begins.",
  "Emergency or after-hours work may vary by city, but customers should receive confirmation before proceeding."
];

export default function PricingPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[36px] bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
          Pricing transparency
        </p>
        <h1 className="mt-3 font-display text-5xl text-primary">
          How plumbing prices are shown and confirmed
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Plumberdost uses city and service-level price bands so customers are not forced to book
          blindly. These bands are guidance, not a final invoice, because plumbing work often
          depends on site inspection and material requirements.
        </p>
        <div className="mt-8 space-y-4">
          {policies.map((policy) => (
            <div key={policy} className="rounded-[24px] bg-bg p-5 text-sm leading-7 text-muted">
              {policy}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
