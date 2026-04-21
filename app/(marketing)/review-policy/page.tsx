export const metadata = {
  title: "Review Collection Policy | Plumberdost",
  description:
    "How Plumberdost collects, reviews, and displays customer feedback for local plumber bookings and city service pages."
};

const rules = [
  "Reviews should come from customers who contacted Plumberdost or completed a plumbing service interaction.",
  "Featured reviews should include city or area context when available so users can understand local relevance.",
  "Fake, copied, incentivised, or unverifiable review claims should not be published as trust proof.",
  "Negative feedback should be used to improve routing, follow-up, plumber readiness, and service clarity."
];

export default function ReviewPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[36px] bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
          Review quality
        </p>
        <h1 className="mt-3 font-display text-5xl text-primary">
          How Plumberdost handles customer reviews
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Reviews are most useful when they reflect real service experiences. Plumberdost uses
          review context to improve trust, city coverage, and plumber routing rather than treating
          review text as decoration.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule} className="rounded-[24px] bg-bg p-5 text-sm leading-7 text-muted">
              {rule}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
