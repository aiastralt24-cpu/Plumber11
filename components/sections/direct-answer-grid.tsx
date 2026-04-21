type DirectAnswer = {
  question: string;
  answer: string;
};

export function DirectAnswerGrid({ answers }: { answers: DirectAnswer[] }) {
  return (
    <section className="rounded-[32px] border border-primary/10 bg-white p-8 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
        Quick answers
      </p>
      <h2 className="mt-3 font-display text-3xl text-primary">
        Helpful answers before you book
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {answers.map((item) => (
          <article key={item.question} className="rounded-[22px] bg-bg p-5">
            <h3 className="text-lg font-semibold text-primary">{item.question}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
