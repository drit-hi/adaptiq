import Assessment from "./assessment";

export const metadata = {
  title: "AdaptIQ — Personalize how you learn",
  description:
    "AdaptIQ is an AI-powered personalized learning platform that builds your Learning DNA profile to personalize not just what you learn, but how you learn.",
};

const features = [
  {
    title: "AI Learning DNA Analysis",
    description:
      "Our models decode how you absorb, retain, and recall information — turning your habits into a living profile that powers every recommendation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M8 3c0 4 8 6 8 10s-8 4-8 8M16 3c0 4-8 6-8 10s8 4 8 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M9 7h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Personalized Study Roadmaps",
    description:
      "Get a step-by-step path tuned to your goals, pace, and Learning DNA — so you always know the highest-impact thing to study next.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M5 19c0-2 2-3 4-3s4 1 4-2 2-3 4-3M5 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Skill Gap Detection",
    description:
      "AdaptIQ continuously pinpoints exactly where your understanding breaks down and surfaces the gaps holding you back — before they cost you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M3 17l5-5 4 4 8-8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="12" r="1.4" fill="currentColor" />
        <circle cx="12" cy="16" r="1.4" fill="currentColor" />
      </svg>
    ),
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Adaptive AI Tutor",
    description:
      "A tutor that reshapes its explanations to match your Learning DNA — switching examples, depth, and format until it truly clicks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M12 3l8 4-8 4-8-4 8-4ZM6 9.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-sky-500 to-indigo-500",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-400/40 to-violet-500/30 blur-3xl" />
        <div className="absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-fuchsia-400/30 to-pink-500/20 blur-3xl" />
        <div className="absolute top-[40rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/20 to-indigo-500/20 blur-3xl" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
              A
            </span>
            <span>
              Adapt<span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">IQ</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:flex">
            <a href="#dna" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
              Learning DNA
            </a>
            <a href="#features" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
              Features
            </a>
          </div>
          <a
            href="#assessment"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.03] hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get started
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-20 pb-24 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
          AI-Powered Personalized Learning
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400">
            AdaptIQ
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl">
          Personalize not just <span className="italic">what</span> you learn, but{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-fuchsia-400">
            how
          </span>{" "}
          you learn.
        </p>

        <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-zinc-500 dark:text-zinc-400">
          AdaptIQ builds your personal{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">Learning DNA</span> — a
          dynamic profile of how you think, focus, and retain. Every roadmap, lesson, and tutor
          response adapts to it, so studying finally fits the way your mind actually works.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#assessment"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-fuchsia-500/40"
          >
            Start Your Learning DNA Assessment
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#dna"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/60 px-8 py-4 text-base font-semibold text-zinc-700 backdrop-blur transition-all hover:scale-[1.04] hover:border-zinc-400 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/30"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-zinc-400 dark:text-zinc-500">
          Takes ~3 minutes · No credit card required
        </p>
      </section>

      {/* Learning DNA explainer */}
      <section id="dna" className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-2xl shadow-zinc-900/5 dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950 sm:p-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl" />
          <div className="relative">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              The concept
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What is your Learning DNA?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Just like genetic DNA makes you biologically unique, your{" "}
              <span className="font-semibold text-zinc-900 dark:text-white">Learning DNA</span> captures
              what makes you <span className="italic">cognitively</span> unique — your ideal pace,
              preferred formats, attention patterns, strengths, and the exact points where concepts
              tend to slip. AdaptIQ turns those signals into a single adaptive profile and uses it to
              reshape your entire learning experience in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One profile. A smarter way to learn.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Four intelligent systems work together — all powered by your Learning DNA.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-zinc-900"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${feature.gradient} transition-transform duration-300 group-hover:scale-x-100`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-16 text-center shadow-2xl shadow-indigo-500/30 sm:px-16">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover how you learn best.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Build your Learning DNA profile in minutes and let AdaptIQ tailor every step of your
            journey.
          </p>
          <a
            href="#assessment"
            className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-700 shadow-xl transition-all duration-300 hover:scale-[1.04] hover:bg-indigo-50"
          >
            Start Your Learning DNA Assessment
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* Assessment */}
      <Assessment />

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200/60 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
              A
            </span>
            AdaptIQ
          </div>
          <p>Personalize not just what you learn, but how you learn.</p>
        </div>
      </footer>
    </div>
  );
}
