import Anthropic from "@anthropic-ai/sdk";

// The shape the client UI renders. Claude is constrained to return exactly this
// via structured outputs, so the existing Report component needs no changes.
const REPORT_SCHEMA = {
  type: "json_schema",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      title: {
        type: "string",
        description: "A short, evocative Learning personality title, e.g. 'The Visual Architect'.",
      },
      tagline: {
        type: "string",
        description: "One sentence capturing how this learner thinks.",
      },
      strengths: {
        type: "array",
        items: { type: "string" },
        description: "3-4 specific strengths grounded in the learner's answers.",
      },
      weaknesses: {
        type: "array",
        items: { type: "string" },
        description: "2-3 honest areas to focus on / watch out for.",
      },
      method: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string", description: "A named, recommended study method." },
          detail: { type: "string", description: "1-2 sentences explaining how to apply it." },
        },
        required: ["name", "detail"],
      },
      strategy: {
        type: "array",
        items: { type: "string" },
        description: "4-5 ordered, personalized study strategy steps. Each step must be phased to a concrete milestone within the student's target duration (e.g. 'In your first two weeks…', 'By month 2…'). Reference the topic, level, daily time, goal, and duration throughout.",
      },
    },
    required: ["title", "tagline", "strengths", "weaknesses", "method", "strategy"],
  },
};

const REQUIRED_FIELDS = ["name", "topic", "level", "style", "time", "goal", "duration"];

function buildPrompt(answers) {
  return [
    "You are AdaptIQ, an AI that builds a student's personalized \"Learning DNA\" profile.",
    `The student's name is ${answers.name}. Address them by name where it feels natural.`,
    "Based on the assessment answers below, produce a Learning DNA report.",
    "Be specific and personal: reference the learner's actual topic, level, available time, goal, and timeline.",
    `The strategy steps must be concretely phased to fit within ${answers.duration} — break the timeline into`,
    "logical milestones (e.g. 'In the first two weeks…', 'By month 2…') so the student can see exactly",
    "how to progress from start to goal within the time they have available.",
    "Keep every field concise and encouraging but honest.",
    "",
    "Assessment answers:",
    `- Student name: ${answers.name}`,
    `- Topic they want to learn: ${answers.topic}`,
    `- Current skill level: ${answers.level}`,
    `- Preferred learning style: ${answers.style}`,
    `- Time available per day: ${answers.time}`,
    `- Learning goal: ${answers.goal}`,
    `- Target learning duration: ${answers.duration}`,
  ].join("\n");
}

export async function POST(request) {
  // Parse and validate the request body.
  let answers;
  try {
    answers = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter(
    (field) => typeof answers?.[field] !== "string" || answers[field].trim() === ""
  );
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required answers: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server is missing ANTHROPIC_API_KEY. Add it to .env.local and restart." },
      { status: 500 }
    );
  }

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2000,
      thinking: { type: "adaptive" },
      output_config: { format: REPORT_SCHEMA },
      messages: [{ role: "user", content: buildPrompt(answers) }],
    });

    // With structured outputs the model returns a single JSON text block.
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock) {
      return Response.json(
        { error: "The model did not return a report. Please try again." },
        { status: 502 }
      );
    }

    const report = JSON.parse(textBlock.text);
    return Response.json({ report });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return Response.json({ error: "Invalid ANTHROPIC_API_KEY." }, { status: 500 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "Rate limited. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      return Response.json(
        { error: `AI service error (${error.status ?? "unknown"}). Please try again.` },
        { status: 502 }
      );
    }
    return Response.json(
      { error: "Something went wrong generating your report." },
      { status: 500 }
    );
  }
}
