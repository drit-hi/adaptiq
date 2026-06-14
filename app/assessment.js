"use client";

import { useEffect, useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const TIME_OPTIONS = ["Under 30 min", "30–60 min", "1–2 hours", "2+ hours"];

const STYLES = [
  {
    value: "Visual learner",
    description: "Diagrams, videos, and visual explanations.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    value: "Hands-on practice",
    description: "Learn by doing with interactive exercises.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    value: "Theory first",
    description: "Understand the concepts before applying them.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    value: "Project-based learning",
    description: "Build real projects to master the material.",
    gradient: "from-sky-500 to-indigo-500",
  },
];

const GOALS = [
  { value: "Exam preparation", emoji: "📝" },
  { value: "Job interviews", emoji: "💼" },
  { value: "Career switch", emoji: "🚀" },
  { value: "Personal interest", emoji: "✨" },
];

const DURATION_OPTIONS = ["1 month", "3 months", "6 months", "1 year", "Custom"];

const INITIAL = {
  name: "",
  topic: "",
  level: "",
  style: "",
  time: "",
  goal: "",
  duration: "",
  customDuration: "",
};

// ---- Small presentational helpers ----

function StepLabel({ step, children }) {
  return (
    <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow">
        {step}
      </span>
      {children}
    </h3>
  );
}

function Reveal({ show, delay = 0, className = "", children }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Scoped keyframes for the analyzing animation + typewriter caret. Kept in this
// file so no global stylesheet is touched. Honors prefers-reduced-motion.
function AssessmentStyles() {
  return (
    <style>{`
@keyframes aiq-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes aiq-shimmer { 0%{transform:translateX(-130%)} 100%{transform:translateX(130%)} }
@keyframes aiq-helixA { 0%,100%{transform:translateX(-11px) scale(1);opacity:1} 50%{transform:translateX(11px) scale(.5);opacity:.4} }
@keyframes aiq-helixB { 0%,100%{transform:translateX(11px) scale(.5);opacity:.4} 50%{transform:translateX(-11px) scale(1);opacity:1} }
@keyframes aiq-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes aiq-fadeup { 0%{opacity:0;transform:translateY(6px)} 100%{opacity:1;transform:translateY(0)} }
@media (prefers-reduced-motion: reduce){ .aiq-anim *{animation:none!important} }
    `}</style>
  );
}

// Gradual character-by-character reveal for the AI's response text.
function useTypewriter(text, speed = 16, startDelay = 120) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!text) return undefined;
    let i = 0;
    let interval;
    const starter = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(starter);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return out;
}

// A rotating DNA double-helix built from two columns of phase-offset dots.
function Helix() {
  return (
    <div className="relative h-28 w-16">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 flex items-center justify-between"
          style={{ top: `${(i / 8) * 100}%` }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
            style={{ animation: "aiq-helixA 1.6s ease-in-out infinite", animationDelay: `${i * -0.16}s` }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500"
            style={{ animation: "aiq-helixB 1.6s ease-in-out infinite", animationDelay: `${i * -0.16}s` }}
          />
        </div>
      ))}
    </div>
  );
}

const ANALYSIS_STAGES = [
  "Decoding your learning patterns",
  "Mapping your cognitive strengths",
  "Detecting skill gaps",
  "Composing your personalized roadmap",
  "Finalizing your Learning DNA",
];

function Analyzing() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s < ANALYSIS_STAGES.length - 1 ? s + 1 : s));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const progress = ((stage + 1) / ANALYSIS_STAGES.length) * 100;

  return (
    <div className="aiq-anim relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-white px-8 py-16 text-center shadow-2xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900">
      <AssessmentStyles />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 blur-3xl" />

      {/* Emblem: dashed spinning ring + counter-orbiting particles + DNA helix */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/30"
          style={{ animation: "aiq-orbit 9s linear infinite" }}
        />
        <div className="absolute inset-3 rounded-full border border-indigo-500/10" />
        <div className="absolute inset-0" style={{ animation: "aiq-orbit 3.2s linear infinite" }}>
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/40" />
        </div>
        <div className="absolute inset-0" style={{ animation: "aiq-orbit 4.5s linear infinite reverse" }}>
          <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-fuchsia-400" />
        </div>
        <Helix />
      </div>

      <p className="mt-8 text-xl font-semibold tracking-tight">Analyzing your Learning DNA</p>

      {/* Cycling analysis-stage text — re-keyed so each stage fades up */}
      <div className="mt-3 h-6">
        <p
          key={stage}
          className="text-zinc-500 dark:text-zinc-400"
          style={{ animation: "aiq-fadeup 0.45s ease-out" }}
        >
          {ANALYSIS_STAGES[stage]}…
        </p>
      </div>

      {/* Progress bar with a moving light sweep */}
      <div className="relative mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{ animation: "aiq-shimmer 1.6s ease-in-out infinite" }}
        />
      </div>

      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.15}s` }}
            className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
          />
        ))}
      </div>
    </div>
  );
}

function Report({ report, answers, onReset }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(id);
  }, []);

  // Typewriter reveal: title types first, then the tagline follows it.
  const title = report.title || "";
  const tagline = report.tagline || "";
  const typedTitle = useTypewriter(title, 34, 320);
  const titleDone = typedTitle.length >= title.length;
  const typedTagline = useTypewriter(tagline, 15, 320 + title.length * 34 + 450);
  const taglineDone = typedTagline.length >= tagline.length;

  const caret = (
    <span className="ml-0.5 inline-block" style={{ animation: "aiq-blink 1s step-end infinite" }}>
      |
    </span>
  );

  const chips = [answers.name, answers.topic, answers.level, answers.style, answers.time, answers.goal, answers.duration];

  return (
    <div className="aiq-anim space-y-6">
      <AssessmentStyles />

      {/* Header */}
      <Reveal show={show} delay={0}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-center shadow-2xl shadow-indigo-500/30 sm:p-12">
          <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          {/* Slow light sweep across the header */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              style={{ animation: "aiq-shimmer 4.5s ease-in-out infinite" }}
            />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              AI-generated · Your Learning DNA
            </span>
            <h3 className="mt-5 min-h-[3rem] text-4xl font-bold tracking-tight text-white sm:min-h-[3.75rem] sm:text-5xl">
              {typedTitle}
              {!titleDone && caret}
            </h3>
            <p className="mx-auto mt-4 min-h-[1.75rem] max-w-xl text-lg text-indigo-100">
              {typedTagline}
              {titleDone && !taglineDone && caret}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur transition-transform hover:scale-105"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Strengths & weaknesses */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal show={show} delay={140}>
          <div className="h-full rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h4 className="text-xl font-semibold tracking-tight">Strengths</h4>
            </div>
            <ul className="mt-5 space-y-3">
              {report.strengths.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 text-zinc-600 transition-transform hover:translate-x-1 dark:text-zinc-300"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal show={show} delay={240}>
          <div className="h-full rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 8v5m0 3.5h.01M10.3 4.3 2.7 17.4A2 2 0 0 0 4.4 20.4h15.2a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h4 className="text-xl font-semibold tracking-tight">Areas to focus</h4>
            </div>
            <ul className="mt-5 space-y-3">
              {report.weaknesses.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 text-zinc-600 transition-transform hover:translate-x-1 dark:text-zinc-300"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform group-hover:scale-110 dark:bg-amber-500/15 dark:text-amber-400">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M12 9v4m0 3h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Recommended study method */}
      <Reveal show={show} delay={340}>
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 blur-2xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M12 3l8 4-8 4-8-4 8-4ZM6 9.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Recommended study method
              </span>
              <h4 className="mt-1 text-2xl font-bold tracking-tight">{report.method.name}</h4>
              <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {report.method.detail}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Personalized study strategy */}
      <Reveal show={show} delay={440}>
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M5 19c0-2 2-3 4-3s4 1 4-2 2-3 4-3M5 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h4 className="text-2xl font-bold tracking-tight">Your personalized study strategy</h4>
          </div>
          <ol className="relative mt-6 space-y-6">
            <span
              className="absolute left-[17px] top-3 bottom-3 w-px bg-gradient-to-b from-indigo-500/40 via-fuchsia-500/30 to-transparent"
              aria-hidden="true"
            />
            {report.strategy.map((step, i) => (
              <li key={i} className="group relative flex gap-4">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
                  {i + 1}
                </span>
                <p className="pt-1 text-base leading-7 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal show={show} delay={540}>
        <div className="flex flex-col items-center gap-4 pt-2">
          <p className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3ZM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"
                fill="currentColor"
              />
            </svg>
            Analyzed by AdaptIQ AI from your Learning DNA
          </p>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:scale-[1.03] hover:border-zinc-400 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/30"
          >
            Retake assessment
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export default function Assessment() {
  const [answers, setAnswers] = useState(INITIAL);
  // phase: "form" | "analyzing" | "report" | "error"
  const [phase, setPhase] = useState("form");
  const [report, setReport] = useState(null);
  const [payload, setPayload] = useState(null); // resolved answers sent to API; used for report display
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const effectiveDuration =
    answers.duration === "Custom" ? answers.customDuration.trim() : answers.duration;

  const isComplete =
    answers.name.trim() !== "" &&
    answers.topic.trim() !== "" &&
    answers.level !== "" &&
    answers.style !== "" &&
    answers.time !== "" &&
    answers.goal !== "" &&
    effectiveDuration !== "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isComplete) return;

    const apiPayload = {
      name: answers.name.trim(),
      topic: answers.topic.trim(),
      level: answers.level,
      style: answers.style,
      time: answers.time,
      goal: answers.goal,
      duration: effectiveDuration,
    };
    setPayload(apiPayload);

    setErrorMessage("");
    setPhase("analyzing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to analyze your Learning DNA.");
      }

      setReport(data.report);
      setPhase("report");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setPhase("error");
    }
  };

  const reset = () => {
    setAnswers(INITIAL);
    setReport(null);
    setPayload(null);
    setErrorMessage("");
    setPhase("form");
  };

  // Return to the form (keeping answers) so the user can retry after an error.
  const retry = () => {
    setErrorMessage("");
    setPhase("form");
  };

  const pillBase =
    "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03]";
  const pillIdle =
    "border border-zinc-300 bg-white text-zinc-700 hover:border-indigo-400 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-indigo-400";
  const pillActive =
    "border border-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30";

  const isReport = phase === "report";

  return (
    <section
      id="assessment"
      className={`scroll-mt-20 mx-auto w-full px-6 pb-28 ${isReport ? "max-w-4xl" : "max-w-3xl"}`}
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {isReport ? "Your report" : "The assessment"}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {isReport ? "Your Learning DNA, decoded" : "Build your Learning DNA"}
        </h2>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          {isReport
            ? "A personalized profile based on how you answered."
            : "Answer a few quick questions so AdaptIQ can tailor your experience."}
        </p>
      </div>

      {phase === "analyzing" && <Analyzing />}

      {phase === "error" && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white px-8 py-16 text-center shadow-2xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <path
                d="M12 8v5m0 3.5h.01M10.3 4.3 2.7 17.4A2 2 0 0 0 4.4 20.4h15.2a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            We couldn&apos;t generate your report
          </h3>
          <p className="mt-2 max-w-md text-zinc-500 dark:text-zinc-400">{errorMessage}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-fuchsia-500/40"
          >
            Try again
          </button>
        </div>
      )}

      {phase === "report" && report && payload && (
        <Report report={report} answers={payload} onReset={reset} />
      )}

      {phase === "form" && (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900 sm:p-10"
        >
          {/* 1. Name */}
          <div>
            <StepLabel step={1}>What&apos;s your name?</StepLabel>
            <input
              type="text"
              value={answers.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Alex, Sarah…"
              className="mt-4 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-5 py-3.5 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>

          {/* 2. Topic */}
          <div>
            <StepLabel step={2}>What topic do you want to learn?</StepLabel>
            <input
              type="text"
              value={answers.topic}
              onChange={(e) => update("topic", e.target.value)}
              placeholder="e.g. Machine Learning, Spanish, Guitar…"
              className="mt-4 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-5 py-3.5 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>

          {/* 3. Skill level */}
          <div>
            <StepLabel step={3}>Current skill level</StepLabel>
            <div className="mt-4 flex flex-wrap gap-3">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update("level", level)}
                  className={`${pillBase} ${answers.level === level ? pillActive : pillIdle}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Learning style */}
          <div>
            <StepLabel step={4}>Preferred learning style</StepLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {STYLES.map((style) => {
                const active = answers.style === style.value;
                return (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => update("style", style.value)}
                    className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                      active
                        ? "border-transparent ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10"
                        : "border-zinc-200 hover:border-indigo-300 dark:border-white/10 dark:hover:border-indigo-400/50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.gradient} text-white shadow`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={active ? "opacity-100" : "opacity-0"}
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          fill="currentColor"
                          className={active ? "opacity-0" : "opacity-100"}
                        />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {style.value}
                      </span>
                      <span className="mt-0.5 block text-sm text-zinc-500 dark:text-zinc-400">
                        {style.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Daily time */}
          <div>
            <StepLabel step={5}>How much time can you dedicate per day?</StepLabel>
            <div className="mt-4 flex flex-wrap gap-3">
              {TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => update("time", time)}
                  className={`${pillBase} ${answers.time === time ? pillActive : pillIdle}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Goal */}
          <div>
            <StepLabel step={6}>Your learning goal</StepLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {GOALS.map((goal) => {
                const active = answers.goal === goal.value;
                return (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => update("goal", goal.value)}
                    className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                      active
                        ? "border-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30"
                        : "border-zinc-200 bg-white text-zinc-800 hover:border-indigo-300 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-indigo-400/50"
                    }`}
                  >
                    <span className="text-xl">{goal.emoji}</span>
                    {goal.value}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Target duration */}
          <div>
            <StepLabel step={7}>Target learning duration</StepLabel>
            <div className="mt-4 flex flex-wrap gap-3">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    update("duration", opt);
                    if (opt !== "Custom") update("customDuration", "");
                  }}
                  className={`${pillBase} ${answers.duration === opt ? pillActive : pillIdle}`}
                >
                  {opt === "Custom" ? "Custom…" : opt}
                </button>
              ))}
            </div>
            {answers.duration === "Custom" && (
              <input
                type="text"
                value={answers.customDuration}
                onChange={(e) => update("customDuration", e.target.value)}
                placeholder="e.g. 2 weeks, 8 months…"
                className="mt-3 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-5 py-3.5 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-100"
              />
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isComplete}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 enabled:hover:scale-[1.02] enabled:hover:shadow-2xl enabled:hover:shadow-fuchsia-500/40 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Analyze My Learning DNA
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 transition-transform duration-300 group-enabled:group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {!isComplete && (
              <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
                Answer all seven questions to continue.
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
