import { Star } from "lucide-react";
import { getFeaturedReviews } from "@/lib/domain/catalog";

export default function ReviewsPage() {
  const reviews = getFeaturedReviews();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">All reviews</p>
      <h1 className="mt-3 font-display text-5xl text-primary">Reputation signals for every city rollout.</h1>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[28px] bg-white p-6 shadow-panel">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={`${review.id}-${index}`} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-lg text-primary">“{review.reviewText}”</p>
            <p className="mt-4 text-sm text-muted">
              {review.reviewerName} · {review.reviewerArea}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
