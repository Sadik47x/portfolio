# AI Integration Addendum — Sadik Mondal Portfolio

**Purpose:** Add to the other two spec files (`sadik-portfolio-spec.md`, `sadik-portfolio-motion-addendum.md`) — Antigravity should read all three. This one covers *only* AI integration.

**Guiding rule for this whole file:** AI on a portfolio is a credibility risk before it's a credibility boost. A chatbot that hallucinates a skill you don't have, or answers a random question about the weather, undermines the exact thing the portfolio is trying to prove — that you build careful, production-grade software. So the bar here isn't "does this look impressive," it's "does this work correctly every single time, and does it actually help a recruiter." One well-built feature clears that bar. A pile of AI gimmicks doesn't.

---

## 1. The one feature worth building: "Ask about Sadik" — a grounded Q&A widget

**What it is:** A small chat widget (bottom-right corner, collapsed by default, opens on click) where a recruiter can ask direct questions — *"Does he know PostgreSQL?", "What was his internship?", "Has he built anything with authentication?"* — and get an accurate answer pulled strictly from your real portfolio content, instead of scrolling to find it themselves.

**Why this one, specifically:**
- It solves a real problem: recruiters skim for 10 seconds (your own spec's §40 says this explicitly) — a Q&A widget answers their specific question faster than scrolling ever could.
- It's honest by construction if you build it right (see §2 — grounding is the whole design, not an afterthought).
- It's a legitimate engineering demonstration in its own right: API integration, prompt design, and grounding/guardrails are real skills, and they're directly relevant to the AI-engineering direction you're already building toward (RAG, LLM APIs). A recruiter who digs into *how* it works sees another real project, not just a feature.
- It's buildable in an evening, not a sprint — no vector database, no fine-tuning, no infrastructure beyond one serverless function.

---

## 2. Grounding — the part that matters most

The single biggest risk is the widget inventing an answer. The fix isn't a clever prompt — it's **hard-constraining what the model is allowed to know.**

**Approach: stuff your real content into the system prompt, verbatim, and instruct the model to only use it.**

Since your portfolio's total factual content (projects, skills, experience, education) is small — a few hundred lines — you don't need retrieval/embeddings/a vector DB at all. Just paste the whole thing into the system prompt every time. This is simpler, cheaper, and *more* reliable than RAG for a dataset this size — RAG earns its complexity at thousands of documents, not a dozen facts about one person.

**System prompt shape (send this from your serverless function, never exposed to the client):**

```
You are answering questions on behalf of Sadik Mondal's portfolio website,
for recruiters and visitors. Answer ONLY using the facts below. Do not
speculate, estimate, or add anything not explicitly stated here.

If a question asks about something not covered below (unlisted skills,
future plans not mentioned, personal opinions, salary expectations,
anything you're unsure of), say so plainly and suggest they email Sadik
directly at sadikmondal789@gmail.com. Never guess.

Keep answers short — 2-4 sentences. Write like a knowledgeable colleague,
not a marketing bot.

=== VERIFIED FACTS ===
[paste in: education, skills list, all 3 project descriptions with real
tech stacks, VaultofCodes internship, Forage job simulation, certifications
— i.e., the same verified content already in the main portfolio spec]
=== END FACTS ===
```

**This system prompt is the entire "database."** Update it in one place (a single `portfolio-context.ts` file, see §4) whenever your real info changes — CleanMess/BeatMess screenshots land, a new project ships, GATE prep updates, etc. There's no separate content pipeline to keep in sync.

---

## 3. Model choice — $0/month, genuinely free tiers (not "free trial credits that expire")

This is short-answer Q&A over a small, fixed context — it does not need a paid or frontier model. Two providers have free tiers that are actually usable long-term at portfolio-level traffic (a handful of recruiter visits a day, nowhere near their limits):

| Provider | Free tier | Notes |
|---|---|---|
| **Groq** (recommended) | Generous daily free request quota on Llama 3.1/3.3 8B and similar open models, no credit card required to start | Extremely fast inference (it's their whole selling point), simple API, most straightforward free option for this use case |
| **Google Gemini API** | Free tier on Gemini Flash models with daily request limits, no credit card required | Slightly more setup (Google Cloud project), also a solid free option |

**Recommendation: Groq**, using a small open model like `llama-3.1-8b-instant`. It's more than capable of "answer this question using only the facts I gave you, in 3 sentences" — this task doesn't need a large model, it needs a model that follows a constrained system prompt, which small models do fine. No credit card, no trial period that runs out, no surprise bill — the free tier is the permanent tier for a workload this small.

**If you'd rather have zero external dependency at all** (no API key, no third-party service, no internet call, literally $0 and zero risk of any provider changing their free-tier terms later), see §3a below — a no-LLM alternative that's arguably the *more* realistic choice for a live-forever portfolio.

### 3a. The zero-dependency alternative: no LLM, just smart search

Instead of calling any AI API, the widget can do **keyword/fuzzy search over a fixed set of Q&A pairs you write yourself** (e.g., using [Fuse.js](https://www.fusejs.io/), a small free client-side fuzzy-search library — no backend, no API key, no server call at all).

- You write ~15-20 real Q&A pairs once (*"What's your tech stack?" → your real answer, "Tell me about RailVista" → your real case-study summary*, etc.), stored as a static JSON file.
- The widget fuzzy-matches the visitor's typed question against your question list and shows the closest pre-written answer, or a "not sure — email me" fallback if nothing matches well.
- **Zero hallucination risk by construction** — every possible answer was written by you, so there's nothing for an LLM to get wrong, because there's no LLM.
- **Zero recurring cost or maintenance**, forever — no API key to rotate, no provider free-tier terms to watch, no rate-limit tuning.

This is a completely legitimate choice, not a lesser one — for a fixed, small set of facts about one person, a well-designed search-over-FAQ often serves the visitor just as well as a chat model, with none of the operational risk. If you want the "I integrated an LLM API" skill demonstration for your own portfolio-of-skills reasons, go with Groq (§3, §4). If you just want the recruiter-facing feature to work reliably forever with the least moving parts, build §3a instead. Both are reasonable; pick one, don't build both.

---

## 4. Implementation — fits your existing Next.js stack, no new infrastructure

Since the main spec already recommends Next.js + Vercel (§30 of the main spec), this slots in as one API route — no separate backend, no new hosting, no database.

```
/app
  /api
    /ask/route.ts        → serverless function, calls Groq's free API server-side
/data
  portfolio-context.ts    → single source of truth: the "VERIFIED FACTS" block from §2
/components
  AskWidget.tsx            → chat bubble UI, client component
```

**`/app/api/ask/route.ts` (sketch, using Groq's free tier — OpenAI-compatible API shape):**
```ts
import { portfolioContext } from '@/data/portfolio-context';

export async function POST(req: Request) {
  const { question } = await req.json();

  // basic guardrails before even calling the API
  if (!question || question.length > 300) {
    return Response.json({ error: 'Invalid question' }, { status: 400 });
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // server-side only, never in client bundle
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 300,
      messages: [
        { role: 'system', content: portfolioContext },
        { role: 'user', content: question },
      ],
    }),
  });

  const data = await response.json();
  return Response.json({ answer: data.choices[0].message.content });
}
```

Get a free Groq API key at `console.groq.com` — no credit card needed. Store it as `GROQ_API_KEY` in Vercel's environment variables (never commit it to the repo).

**If you go the zero-dependency route instead (§3a),** there's no API route at all — `AskWidget.tsx` imports the static Q&A JSON directly and runs Fuse.js search entirely in the browser. Simpler folder structure:
```
/data
  faq-data.json           → your written Q&A pairs
/components
  AskWidget.tsx             → imports faq-data.json, runs Fuse.js search client-side
```
No `/api/ask` route, no environment variable, no server cost, ever.

**Essential guardrails to actually implement, not skip (applies to the Groq/LLM route — §3a's static search needs none of this, which is part of its appeal):**
- **Rate limiting** — cap requests per IP (e.g., 10/hour) so the free-tier quota can't be drained by a bot or abuse and lock out real visitors for the rest of the day. A simple in-memory or Vercel KV counter is enough at this scale.
- **API key server-side only** — lives in an environment variable, is read only inside the API route, and is never sent to or bundled into client-side code.
- **Input length cap** — reject absurdly long input before it reaches the API (shown above).
- **Graceful failure** — if the API call fails, times out, or hits the free-tier's daily cap, the widget should show a plain fallback ("Something went wrong — feel free to email me directly") instead of a spinner that hangs forever or a raw error. This matters more on a free tier than a paid one — you will occasionally hit limits, and the widget should degrade politely, not break.

**`AskWidget.tsx`:** a standard chat-bubble pattern — collapsed pill in the bottom-right that expands into a small panel with a text input, a scrollable message list, and 3-4 clickable suggested questions to reduce the "blank box, what do I even ask" hesitation (e.g., *"What's his tech stack?", "Tell me about RailVista", "Is he available for internships?"*).

---

## 5. What NOT to build

Each of these was considered and cut, with the reasoning, so you don't have to re-litigate them later:

| Idea | Why it's cut |
|---|---|
| Voice mode / avatar | Solves no problem a recruiter has; pure novelty; real engineering effort for zero credibility gain. |
| Full RAG with a vector database | Total content is a few hundred lines — embeddings/retrieval infrastructure is solving a scale problem you don't have. Adds a real point of failure for no accuracy benefit over just pasting the facts into the system prompt (§2). |
| AI-generated project descriptions/bios | Directly conflicts with the whole portfolio's premise — every other spec file in this set is built around *not* inventing or embellishing content. An AI-written bio is the same failure mode with extra steps. |
| Autonomous agent that emails Sadik / books calls on the visitor's behalf | Real liability (sending emails or taking actions on your behalf without a human check) for a feature recruiters didn't ask for. A plain "email me" link does this job with zero risk. |
| AI resume tailoring / "generate a cover letter about Sadik" tool | Scope creep — this is a tool for the *visitor's* job search, not a demonstration of *your* engineering. Off-brief. |
| Chatbot with no grounding (just a general-purpose assistant wearing your name) | The exact hallucination risk §2 is designed to prevent. Never ship an ungrounded version of this, even as a "quick MVP" — a bot that confidently invents a skill you don't have is worse than no bot at all. |
| Making the widget the default/most prominent element on the page | It's a helpful utility, not the main event — keep it a small, collapsed corner element per §4's UI note, consistent with the "premium through restraint" direction in the main spec. |

---

## 6. Where this fits in the existing narrative

Per the main spec's recruiter journey (§43): Identity → Proof → Depth → Credibility → Conversion. This widget is best framed as part of **Conversion** — it's not a fourth project to showcase, it's a tool that makes the existing three projects and your skills easier to query. Don't give it its own hero section or nav item; a small persistent corner widget available site-wide (as described in §4) is the right level of prominence — present everywhere, demanding attention nowhere.

---

## 7. Build order

**If building the Groq/LLM version (§3, §4):**
1. Get a free Groq API key at `console.groq.com`, add it to Vercel as `GROQ_API_KEY`.
2. Write `portfolio-context.ts` with your real verified facts (reuse the content already written in the main spec's project/skills/experience sections — don't rewrite it).
3. Build the API route with the guardrails in §4 (rate limit, key handling, input cap, graceful failure) — build these in from the start, not as a later pass.
4. Build `AskWidget.tsx` — collapsed pill → expanding panel, suggested-question chips, message list.
5. Test the grounding deliberately: ask it something *not* in your facts (e.g., "does he know Rust?") and confirm it says it doesn't know, rather than guessing. This is the one test that actually matters before shipping.
6. Add the rate-limit and error-fallback paths to your QA checklist alongside the ones already in the main spec.

**If building the zero-dependency version (§3a) instead:**
1. Write 15-20 real Q&A pairs as `faq-data.json` (question + your real written answer).
2. Add `fuse.js` (`npm install fuse.js` — free, MIT-licensed, no account needed).
3. Build `AskWidget.tsx` — same UI shell, but search runs client-side against the JSON instead of calling an API.
4. Test with a handful of *unmatched* questions (e.g., "does he know Rust?") to confirm the no-match fallback ("not sure — email me") triggers correctly instead of returning an irrelevant closest match.
5. No rate limiting, no API key, no server cost to add to the QA checklist — that's the point.
