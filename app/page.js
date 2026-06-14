import Assessment from "./assessment";

export const metadata = {
  title: "AdaptIQ — Your Learning DNA",
  description:
    "Discover how you learn. AdaptIQ builds a personalized AI Learning DNA profile tailored to your cognitive style, goals, and timeline.",
};

const FEATURES = [
  {
    n: "01",
    title: "AI Learning DNA Analysis",
    body: "A full profile of your cognitive style, strengths, and blind spots — generated in seconds from seven questions.",
  },
  {
    n: "02",
    title: "Personalized Study Roadmaps",
    body: "Strategy phased to your exact timeline. Not generic advice — steps built for your topic, level, and goal.",
  },
  {
    n: "03",
    title: "Skill Gap Detection",
    body: "Honest identification of where you are likely to struggle, so you can prepare before you stall.",
  },
  {
    n: "04",
    title: "Adaptive AI Insight",
    body: "Recommendations that account for your available time, preferred learning style, and end objective.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5ECD9" }}>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 sm:px-14 border-b border-[#111111]/12">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#111111]">
          AdaptIQ
        </span>
        <a
          href="#assessment"
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A] hover:text-[#111111] transition-colors duration-300"
        >
          Begin ↓
        </a>
      </nav>

      {/* Hero */}
      <section className="px-8 sm:px-14 pt-20 pb-20 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#4A3B2A]">
            Vol. I — AI Learning Intelligence
          </span>
        </div>

        <h1
          className="font-serif text-[clamp(56px,10vw,120px)] leading-[0.88] tracking-tight text-[#111111]"
        >
          Discover<br />
          how you<br />
          <em>learn.</em>
        </h1>

        {/* Decorative cross-rule */}
        <div className="mt-14 mb-10 flex items-center gap-6 max-w-sm">
          <div className="flex-1 h-px bg-[#111111]/20" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <line x1="5" y1="0" x2="5" y2="10" stroke="#111111" strokeWidth="0.75" opacity="0.4" />
            <line x1="0" y1="5" x2="10" y2="5" stroke="#111111" strokeWidth="0.75" opacity="0.4" />
          </svg>
          <div className="flex-1 h-px bg-[#111111]/20" />
        </div>

        <div className="max-w-xs">
          <p className="font-mono text-sm text-[#4A3B2A] leading-relaxed">
            Most learning fails not because of effort, but because the method
            doesn&apos;t match the mind. AdaptIQ finds the gap.
          </p>
          <a
            href="#assessment"
            className="inline-flex items-center gap-3 mt-8 font-mono text-xs tracking-[0.2em] uppercase text-[#111111] border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#F5ECD9] transition-all duration-300"
          >
            Begin Assessment
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* What is Learning DNA */}
      <section className="px-8 sm:px-14 py-16 max-w-7xl mx-auto border-t border-[#111111]/12">
        <div className="grid sm:grid-cols-[180px_1fr] gap-10 sm:gap-20">
          <div className="pt-1">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">
              What it is
            </span>
          </div>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] leading-snug mb-6">
              Your Learning DNA is the unique fingerprint of how you absorb,
              retain, and apply knowledge.
            </h2>
            <p className="font-mono text-sm text-[#4A3B2A] leading-relaxed max-w-2xl">
              Just as genetic DNA makes you biologically unique, your Learning DNA
              captures what makes you cognitively unique — your ideal pace,
              preferred format, attention patterns, and the exact points where
              concepts tend to slip. AdaptIQ turns those signals into a single
              adaptive profile.
            </p>
          </div>
        </div>
      </section>

      {/* Features — editorial grid */}
      <section className="px-8 sm:px-14 py-16 max-w-7xl mx-auto border-t border-[#111111]/12">
        <div className="mb-10">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">
            Capabilities
          </span>
        </div>
        <div className="grid sm:grid-cols-2 border border-[#111111]/15">
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className={`p-8 hover:bg-[#111111]/[0.025] transition-colors duration-300
                ${i % 2 === 0 ? "sm:border-r border-[#111111]/15" : ""}
                ${i < 2 ? "border-b border-[#111111]/15" : ""}
              `}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-[#4A3B2A]">{f.n}</span>
              <h3 className="font-serif text-xl text-[#111111] mt-4 mb-3">{f.title}</h3>
              <p className="font-mono text-xs text-[#4A3B2A] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment intro */}
      <section className="px-8 sm:px-14 py-16 max-w-7xl mx-auto border-t border-[#111111]/12">
        <div className="max-w-lg">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#4A3B2A]">
            The Assessment
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#111111] mt-4 leading-tight">
            Build your<br />Learning DNA.
          </h2>
          <p className="font-mono text-sm text-[#4A3B2A] mt-5 leading-relaxed">
            Seven questions. Two minutes. A personalized AI profile that maps
            your exact learning fingerprint.
          </p>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="pb-28">
        <Assessment />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111111]/12 px-8 sm:px-14 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">
            AdaptIQ
          </span>
          <span className="font-mono text-xs text-[#4A3B2A]">
            Personalize not just what you learn, but how.
          </span>
        </div>
      </footer>

    </div>
  );
}
