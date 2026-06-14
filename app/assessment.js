"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

// ---- Presentational helpers ----

function StepLabel({ step, children }) {
  return (
    <h3 className="flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[0.2em] text-[#4A3B2A] shrink-0 w-6">
        {String(step).padStart(2, "0")}
      </span>
      <span className="text-base font-medium text-[#111111] leading-snug">{children}</span>
    </h3>
  );
}

function Reveal({ show, delay = 0, className = "", children }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Minimal keyframes: blink caret + gentle fade-up only.
function AssessmentStyles() {
  return (
    <style>{`
@keyframes aiq-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes aiq-fadeup { 0%{opacity:0;transform:translateY(4px)} 100%{opacity:1;transform:translateY(0)} }
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
    <div className="aiq-anim flex flex-col items-center justify-center py-28 text-center px-8">
      <AssessmentStyles />
      <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#4A3B2A] mb-8">
        In progress
      </span>
      <h2 className="font-serif text-4xl sm:text-5xl text-[#111111] leading-tight mb-12">
        Composing your<br />Learning DNA
      </h2>
      {/* Thin progress line */}
      <div className="relative w-56 mb-5" style={{ height: "1px", backgroundColor: "rgba(17,17,17,0.15)" }}>
        <div
          className="absolute inset-y-0 left-0 bg-[#111111] transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Cycling stage text */}
      <div className="h-5">
        <p
          key={stage}
          className="font-mono text-xs tracking-widest uppercase text-[#4A3B2A]"
          style={{ animation: "aiq-fadeup 0.45s ease-out" }}
        >
          {ANALYSIS_STAGES[stage]}
        </p>
      </div>
    </div>
  );
}

// Editorial section header used inside the Report.
function DocSection({ number, title, children }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-xs tracking-[0.2em] text-[#4A3B2A]">{number} —</span>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Report({ report, answers, onReset, dbStatus }) {
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
    <div className="aiq-anim">
      <AssessmentStyles />

      {/* Document header */}
      <Reveal show={show} delay={0}>
        <div className="border border-[#111111]/15 bg-[#FEFCF8] p-8 sm:p-12">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-8 border-b border-[#111111]/10">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">
              AdaptIQ — Learning DNA Profile
            </span>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-xs border border-[#111111]/20 text-[#4A3B2A] px-2.5 py-1"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Typed title */}
          <h3 className="font-serif text-4xl sm:text-5xl text-[#111111] leading-tight mb-4 min-h-[3rem]">
            {typedTitle}
            {!titleDone && caret}
          </h3>
          {/* Typed tagline */}
          <p className="font-serif italic text-xl sm:text-2xl text-[#4A3B2A] min-h-[2rem]">
            {typedTagline}
            {titleDone && !taglineDone && caret}
          </p>
        </div>
      </Reveal>

      {/* Report body */}
      <Reveal show={show} delay={220}>
        <div className="border border-t-0 border-[#111111]/15 bg-[#FEFCF8] divide-y divide-[#111111]/10">

          {/* I — Your Strengths */}
          <div className="p-8 sm:p-10">
            <DocSection number="I" title="Your Strengths">
              <ul className="space-y-3">
                {report.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#4A3B2A] mt-1 shrink-0">—</span>
                    <span className="text-base leading-7 text-[#111111]">{item}</span>
                  </li>
                ))}
              </ul>
            </DocSection>
          </div>

          {/* II — The Blind Spots */}
          <div className="p-8 sm:p-10">
            <DocSection number="II" title="The Blind Spots">
              <ul className="space-y-3">
                {report.weaknesses.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#4A3B2A] mt-1 shrink-0">—</span>
                    <span className="text-base leading-7 text-[#111111]">{item}</span>
                  </li>
                ))}
              </ul>
            </DocSection>
          </div>

          {/* III — The Learning Ritual */}
          <div className="p-8 sm:p-10">
            <DocSection number="III" title="The Learning Ritual">
              <h4 className="font-serif text-2xl text-[#111111] mb-3">{report.method.name}</h4>
              <p className="font-mono text-sm text-[#4A3B2A] leading-relaxed">
                {report.method.detail}
              </p>
            </DocSection>
          </div>

          {/* IV — The Path Forward */}
          <div className="p-8 sm:p-10">
            <DocSection number="IV" title="The Path Forward">
              <ol className="space-y-5">
                {report.strategy.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#4A3B2A] mt-1 shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-7 text-[#111111]">{step}</p>
                  </li>
                ))}
              </ol>
            </DocSection>
          </div>

        </div>
      </Reveal>

      {/* Footer row */}
      <Reveal show={show} delay={440}>
        <div className="border border-t-0 border-[#111111]/15 bg-[#FEFCF8] px-8 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs text-[#4A3B2A]">Generated by AdaptIQ AI</p>
            {dbStatus === "saving" && (
              <p className="flex items-center gap-2 font-mono text-xs text-[#4A3B2A]">
                <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Saving profile…
              </p>
            )}
            {dbStatus === "saved" && (
              <p className="font-mono text-xs text-[#4A3B2A]">Profile saved ✓</p>
            )}
            {dbStatus === "db-error" && (
              <p className="font-mono text-xs text-[#4A3B2A]">Couldn&apos;t save profile</p>
            )}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-xs tracking-[0.2em] uppercase border border-[#111111] text-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#F5ECD9] transition-all duration-300"
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
  // dbStatus: null | "saving" | "saved" | "db-error"
  const [dbStatus, setDbStatus] = useState(null);

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

      // Save to Supabase non-blocking — report is already visible.
      setDbStatus("saving");
      (async () => {
        try {
          const { data: student, error: studentError } = await supabase
            .from("students")
            .insert({ name: apiPayload.name })
            .select("id")
            .single();

          if (studentError) throw studentError;

          const { error: profileError } = await supabase
            .from("learning_profiles")
            .insert({
              student_id: student.id,
              topic: apiPayload.topic,
              current_level: apiPayload.level,
              learning_style: apiPayload.style,
              daily_time: apiPayload.time,
              goal: apiPayload.goal,
              target_duration: apiPayload.duration,
              learning_dna: data.report,
            });

          if (profileError) throw profileError;

          setDbStatus("saved");
        } catch {
          setDbStatus("db-error");
        }
      })();
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
    setDbStatus(null);
    setPhase("form");
  };

  // Return to the form (keeping answers) so the user can retry after an error.
  const retry = () => {
    setErrorMessage("");
    setPhase("form");
  };

  // Editorial button styles
  const btnBase =
    "px-5 py-2.5 text-sm font-mono tracking-wide transition-all duration-200 border";
  const btnIdle =
    "border-[#111111]/25 bg-transparent text-[#111111] hover:border-[#111111]";
  const btnActive =
    "border-[#111111] bg-[#111111] text-[#F5ECD9]";

  const isReport = phase === "report";

  return (
    <section
      id="assessment"
      className={`scroll-mt-20 mx-auto w-full px-4 sm:px-8 pb-28 ${isReport ? "max-w-4xl" : "max-w-3xl"}`}
    >
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A]">
          {isReport ? "Your report" : "The assessment"}
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#111111]">
          {isReport ? "Your Learning DNA, decoded." : "Build your Learning DNA."}
        </h2>
        <p className="mt-4 font-mono text-sm text-[#4A3B2A]">
          {isReport
            ? "A personalized profile based on how you answered."
            : "Answer a few questions so AdaptIQ can tailor your experience."}
        </p>
      </div>

      {phase === "analyzing" && <Analyzing />}

      {phase === "error" && (
        <div className="flex flex-col items-center justify-center border border-[#111111]/15 bg-[#FEFCF8] px-8 py-16 text-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#4A3B2A] mb-4">
            Error
          </span>
          <h3 className="font-serif text-2xl text-[#111111] mb-3">
            We couldn&apos;t generate your report
          </h3>
          <p className="font-mono text-sm text-[#4A3B2A] max-w-md leading-relaxed">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={retry}
            className="mt-8 font-mono text-xs tracking-[0.2em] uppercase border border-[#111111] text-[#111111] px-8 py-3 hover:bg-[#111111] hover:text-[#F5ECD9] transition-all duration-300"
          >
            Try again
          </button>
        </div>
      )}

      {phase === "report" && report && payload && (
        <Report report={report} answers={payload} onReset={reset} dbStatus={dbStatus} />
      )}

      {phase === "form" && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#FEFCF8] border border-[#111111]/15 divide-y divide-[#111111]/10"
        >
          {/* 1. Name */}
          <div className="p-8 sm:p-10">
            <StepLabel step={1}>What&apos;s your name?</StepLabel>
            <input
              type="text"
              value={answers.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Alex, Sarah…"
              className="mt-5 w-full bg-transparent border border-[#111111]/20 px-4 py-3 text-sm font-mono text-[#111111] placeholder:text-[#4A3B2A]/35 outline-none focus:border-[#111111] transition-colors duration-200"
            />
          </div>

          {/* 2. Topic */}
          <div className="p-8 sm:p-10">
            <StepLabel step={2}>What topic do you want to learn?</StepLabel>
            <input
              type="text"
              value={answers.topic}
              onChange={(e) => update("topic", e.target.value)}
              placeholder="e.g. Machine Learning, Spanish, Guitar…"
              className="mt-5 w-full bg-transparent border border-[#111111]/20 px-4 py-3 text-sm font-mono text-[#111111] placeholder:text-[#4A3B2A]/35 outline-none focus:border-[#111111] transition-colors duration-200"
            />
          </div>

          {/* 3. Skill level */}
          <div className="p-8 sm:p-10">
            <StepLabel step={3}>Current skill level</StepLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update("level", level)}
                  className={`${btnBase} ${answers.level === level ? btnActive : btnIdle}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Learning style */}
          <div className="p-8 sm:p-10">
            <StepLabel step={4}>Preferred learning style</StepLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {STYLES.map((style) => {
                const active = answers.style === style.value;
                return (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => update("style", style.value)}
                    className={`flex items-start gap-4 border p-5 text-left transition-all duration-200 ${
                      active
                        ? "border-[#111111] bg-[#111111]"
                        : "border-[#111111]/20 bg-transparent hover:border-[#111111]"
                    }`}
                  >
                    <span className="shrink-0 mt-0.5 h-3 w-3 flex items-center justify-center">
                      {active ? (
                        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-[#F5ECD9]" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className="block h-3 w-3 border border-[#111111]/25" />
                      )}
                    </span>
                    <span>
                      <span className={`block text-sm font-mono ${active ? "text-[#F5ECD9]" : "text-[#111111]"}`}>
                        {style.value}
                      </span>
                      <span className={`mt-1 block text-xs font-mono leading-relaxed ${active ? "text-[#F5ECD9]/65" : "text-[#4A3B2A]"}`}>
                        {style.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Daily time */}
          <div className="p-8 sm:p-10">
            <StepLabel step={5}>How much time can you dedicate per day?</StepLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => update("time", time)}
                  className={`${btnBase} ${answers.time === time ? btnActive : btnIdle}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Goal */}
          <div className="p-8 sm:p-10">
            <StepLabel step={6}>Your learning goal</StepLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GOALS.map((goal) => {
                const active = answers.goal === goal.value;
                return (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => update("goal", goal.value)}
                    className={`flex items-center gap-3 border px-5 py-4 text-left text-sm font-mono transition-all duration-200 ${
                      active
                        ? "border-[#111111] bg-[#111111] text-[#F5ECD9]"
                        : "border-[#111111]/20 text-[#111111] hover:border-[#111111] bg-transparent"
                    }`}
                  >
                    {goal.value}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Target duration */}
          <div className="p-8 sm:p-10">
            <StepLabel step={7}>Target learning duration</StepLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    update("duration", opt);
                    if (opt !== "Custom") update("customDuration", "");
                  }}
                  className={`${btnBase} ${answers.duration === opt ? btnActive : btnIdle}`}
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
                className="mt-4 w-full bg-transparent border border-[#111111]/20 px-4 py-3 text-sm font-mono text-[#111111] placeholder:text-[#4A3B2A]/35 outline-none focus:border-[#111111] transition-colors duration-200"
              />
            )}
          </div>

          {/* Submit */}
          <div className="p-8 sm:p-10">
            <button
              type="submit"
              disabled={!isComplete}
              className="font-mono text-xs tracking-[0.2em] uppercase border border-[#111111] text-[#111111] px-8 py-4 hover:bg-[#111111] hover:text-[#F5ECD9] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Analyze My Learning DNA →
            </button>
            {!isComplete && (
              <p className="mt-3 font-mono text-xs text-[#4A3B2A]/60">
                Answer all seven questions to continue.
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
