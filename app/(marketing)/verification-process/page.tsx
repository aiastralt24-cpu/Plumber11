export const metadata = {
  title: "Plumber Verification Process | Plumberdost",
  description:
    "How Plumberdost reviews plumber profiles, service history, phone verification, and local readiness before routing customer enquiries."
};

const checks = [
  "Phone and WhatsApp contact verification before a plumber is shown as active.",
  "City and area readiness review so bookings are routed only where support can be confirmed.",
  "Service specialisation mapping for leakage, drainage, toilet repair, tap fitting, tank work, and emergency plumbing.",
  "Customer feedback review after completed jobs to improve future routing quality."
];

export default function VerificationProcessPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[36px] bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
          Trust and verification
        </p>
        <h1 className="mt-3 font-display text-5xl text-primary">
          How Plumberdost verifies local plumber readiness
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Plumberdost is a booking and lead-routing platform for plumbing services. Before a city,
          area, or plumber is shown as active, the platform checks contact routes, service coverage,
          and operational readiness so customers receive clearer expectations before booking.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {checks.map((check) => (
            <div key={check} className="rounded-[24px] bg-bg p-5 text-sm leading-7 text-muted">
              {check}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
