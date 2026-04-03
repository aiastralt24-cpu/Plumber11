export function HeroVisual() {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden bg-[linear-gradient(180deg,#132f4d_0%,#081a2c_100%)] sm:min-h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_74%_18%,rgba(232,96,28,0.18),transparent_22%),linear-gradient(90deg,rgba(8,22,38,0.24)_0%,rgba(8,22,38,0.12)_45%,rgba(8,22,38,0)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(90deg,rgba(6,20,35,0.82)_0%,rgba(6,20,35,0.48)_65%,rgba(6,20,35,0)_100%)]" />

      <div className="absolute right-[-6%] top-[6%] h-[90%] w-[86%] sm:right-[-3%] sm:top-[3%] sm:w-[78%]">
        <div className="absolute inset-0 rounded-l-[40px] bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.24),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />

        <div className="absolute bottom-0 left-[12%] h-[84%] w-[58%]">
          <div className="absolute bottom-0 left-[18%] h-[66%] w-[30%] rounded-t-[50px] bg-[#13385b]" />
          <div className="absolute bottom-[50%] left-[24%] h-[18%] w-[23%] rounded-[999px] bg-[#f2bf97]" />
          <div className="absolute bottom-[63%] left-[29%] h-[12%] w-[17%] rounded-t-[999px] bg-[#0d2540]" />
          <div className="absolute bottom-[38%] left-[35%] h-[24%] w-[22%] rounded-[32px] bg-[#0f2b48]" />
          <div className="absolute bottom-[54%] left-[45%] h-[9%] w-[14%] rounded-[20px] bg-[#102b47]" />
          <div className="absolute bottom-[34%] left-[53%] h-[4%] w-[28%] rotate-[36deg] rounded-full bg-[#dbe3ea]" />
          <div className="absolute bottom-[22%] left-[74%] h-[16%] w-[16%] rounded-full border-[20px] border-[#dbe3ea]" />
          <div className="absolute bottom-[16%] left-[60%] h-[54%] w-[32%] rounded-[40px] bg-[linear-gradient(180deg,#163a5f_0%,#102846_100%)]" />
          <div className="absolute bottom-[44%] left-[17%] h-[14%] w-[24%] rounded-[18px] bg-[#fbf6f0]" />
          <div className="absolute bottom-[46%] left-[21%] h-[3%] w-[10%] rounded-full bg-[#d4dce3]" />
        </div>

        <div className="absolute bottom-[12%] left-[8%] h-[18%] w-[20%] rounded-[28px] bg-[#112a45]/70 blur-[2px]" />
        <div className="absolute bottom-[8%] left-[4%] h-[7%] w-[28%] rounded-[999px] bg-black/28 blur-xl" />
      </div>

      <div className="absolute left-[6%] top-[8%] rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/76 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
        Verified crew on call
      </div>
    </div>
  );
}
