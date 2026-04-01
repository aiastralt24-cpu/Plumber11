export function HeroVisual() {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#163556_0%,#0b1b2e_100%)] sm:h-[500px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(232,96,28,0.22),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/72">
        Verified crew
      </div>

      <div className="absolute right-8 top-8 w-[44%] rounded-[26px] border border-white/10 bg-[#102640]/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
              City dispatch
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">Mumbai</p>
          </div>
          <span className="rounded-full bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            Live
          </span>
        </div>
        <div className="mt-5 rounded-[20px] bg-[#fcfaf6] px-4 py-4 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/45">
            Current request
          </p>
          <p className="mt-2 text-lg font-semibold">Pipe leakage repair</p>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
          Nearest verified crew assigned in 14 minutes
        </div>
      </div>

      <div className="absolute bottom-0 left-[6%] h-[78%] w-[42%]">
        <div className="absolute bottom-0 left-[8%] h-[58%] w-[26%] rounded-t-[42px] bg-[#e68d60]" />
        <div className="absolute bottom-[44%] left-[18%] h-[18%] w-[24%] rounded-[999px] bg-[#f4b18b]" />
        <div className="absolute bottom-[56%] left-[21%] h-[12%] w-[18%] rounded-t-[999px] bg-[#0f243a]" />
        <div className="absolute bottom-[34%] left-[28%] h-[20%] w-[18%] rounded-[28px] bg-accent" />
        <div className="absolute bottom-[30%] left-[43%] h-[4%] w-[28%] rotate-[42deg] rounded-full bg-[#dfe5ea]" />
        <div className="absolute bottom-[20%] left-[64%] h-[15%] w-[15%] rounded-full border-[18px] border-[#dfe5ea]" />
        <div className="absolute bottom-[44%] left-[7%] h-[10%] w-[22%] rounded-[18px] bg-[#fcfaf6] px-4 py-3 text-sm font-semibold text-primary shadow-panel">
          Leak fix
        </div>
      </div>

      <div className="absolute bottom-8 right-8 max-w-xs rounded-[24px] border border-white/10 bg-primary/92 px-5 py-4 text-white shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/90">
          Response promise
        </p>
        <p className="mt-1 text-2xl font-semibold">Most jobs confirmed within 5 minutes</p>
        <p className="mt-2 text-sm text-white/72">
          Built for high-intent searchers who need a local operator, not a generic listing.
        </p>
      </div>
    </div>
  );
}
