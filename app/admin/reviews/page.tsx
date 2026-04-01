import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminReviewsPageData } from "@/lib/domain/admin";

export default async function AdminReviewsPage() {
  await getAdminAccess();
  const reviews = await getAdminReviewsPageData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Review signals</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">Proof inventory belongs in its own workspace too.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            This page helps the team inspect featured reviews by city and service context without
            mixing them into lead or city ops screens.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-[28px] bg-white p-6 shadow-panel">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">{review.citySlug}</p>
              <p className="mt-2 text-lg font-semibold text-primary">{review.reviewerName}</p>
              <p className="text-sm text-muted">{review.reviewerArea}</p>
              <p className="mt-4 text-sm leading-7 text-primary">{review.reviewText}</p>
              <p className="mt-4 text-sm font-semibold text-accent">{review.rating} / 5 rating</p>
            </div>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
