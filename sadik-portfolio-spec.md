# Sadik Mondal — Portfolio Design & Build Specification

**Source of truth for: Claude → Stitch → Antigravity**
**Prepared for:** Sadik Mondal · Full-Stack Developer & CS Student · Aliah University, Kolkata

> ⚠️ **Verification note (read before building):** Several facts in the original brief have been corrected against verified sources (RailVista's actual repo, CleanMess's real spec sheet, and BeatMess's actual repo) and one fact was confirmed directly by Sadik. See §0.

---

## 0. Verification Log — What Changed From the Original Brief and Why

Per the content rules in this brief ("never invent technologies, never fabricate stats"), the following were checked against live/public sources before writing this spec:

| Item | Brief said | Verified reality | Action taken |
|---|---|---|---|
| RailVista tech stack | MongoDB, Express.js, React.js, Node.js, Socket.io, Razorpay, JWT | The live repo (`github.com/Sadik47x/railvista`) actually runs **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase/PostgreSQL + Supabase Auth + Row Level Security**, with PostgreSQL stored procedures for atomic booking. No Socket.io, no Razorpay, no MongoDB, no Express are present in the current repo. | Spec below uses the **verified real stack**, not the brief's assumed MERN stack. |
| RailVista scale numbers | "100+ stations, 50+ trains, 30,000+ seats" | Repo README states **100 stations, 50 trains, 577 coaches, 37,620 seats**. | Updated to the exact verified figures. |
| RailVista status | Presented as student project only | Repo README self-labels the repo `Internship Ready` / `Production Grade` / `Fully Verified` and documents a security test suite (RLS + penetration tests, all passing) | Included as genuine engineering evidence — this is unusually strong proof for a student project and should be surfaced, not hidden. |
| CleanMess | Full feature list requested | **Confirmed by Sadik as accurate.** Full spec supplied directly: React 19 (TypeScript) + Vite, Tailwind CSS, Capacitor JS (native Android compilation), Firebase Firestore + Firebase Auth, custom deterministic chore-rotation/backlog engine. | Fully written up in §10 using Sadik's real spec — no placeholders remain. |
| BeatMess | Full feature list requested | Repo confirmed: `github.com/Sadik47x/beatmess-player`. README verifies: **React + Node.js**, a custom single-user music recommendation engine, infinite auto-queue radio, implicit feedback scoring (likes/skips/partial listens/replays), MusicBrainz + Last.fm metadata integration, PWA install support, deployed on Render. | Fully written up in §11 using the verified repo README — no placeholders remain. |
| Class year | Brief said "2nd-year B.Tech CSE student" | **Confirmed by Sadik: 3rd year, 5th semester**, 2024–2028 program. | Spec now uses "3rd-year B.Tech CSE student, 5th semester" throughout. |

Everywhere else in this document, `[ADD VERIFIED INFORMATION]` marks a remaining gap (mainly: screenshots for CleanMess and BeatMess) that must be filled with real material, not invented content.

---

## 1. Executive Design Vision

The portfolio is a calm, typography-led, engineering-first personal site — not a template, not a resume-in-HTML. It should read like a product a careful engineer built for himself: restrained color, confident whitespace, and content that proves capability instead of claiming it.

**One-sentence brief:** *A minimal, fast, dark-capable developer portfolio that leads with three real full-stack projects, told as case studies, backed by verifiable engineering detail (real database design, real security testing, real tech decisions) — built for recruiters who scan in 10 seconds and engineers who read in 10 minutes.*

**Narrative arc (see §43 in the original brief, preserved):**
Identity → Proof (real projects) → Depth (engineering judgment) → Credibility (certs/experience) → Conversion (contact).

---

## 2. Personal Brand Positioning

- **Name:** Sadik Mondal
- **Location:** Kolkata, West Bengal, India
- **Identity:** Full-Stack Developer & Software Engineering Student
- **Education:** B.Tech CSE, Aliah University, Kolkata (2024–2028) — currently 3rd year, 5th semester
- **Headline:** *Hi, I'm Sadik — I build products for the web.*
- **Positioning boundary:** Student building real, deployed, verifiably-working products. Not a senior engineer. Not a startup founder. Not an agency. Every claim on the site must trace to something checkable (a live URL, a repo, a certificate).

**Links (verified):**
- Email: `sadikmondal789@gmail.com`
- GitHub: `https://github.com/Sadik47x`
- LinkedIn: `https://www.linkedin.com/in/sadik-mondal`
- LeetCode: `https://leetcode.com/u/Sadik47x`

> ✅ Confirmed by Sadik: LinkedIn URL is `https://www.linkedin.com/in/sadik-mondal`.

---

## 3. Information Architecture (final, reasoned)

The brief's 11-section structure is sound; one adjustment: **Engineering Philosophy is folded into About** (its own section reads as filler at this content volume — three principles don't sustain a dedicated scroll stop). Final order:

1. Navigation (sticky, minimal)
2. Hero
3. Selected Work — CleanMess → BeatMess → RailVista (strict order)
4. About (identity + "how I think" principles combined)
5. Technical Skills
6. Problem Solving / DSA
7. Experience & Certifications (combined — both are short, both are "practical exposure")
8. Education
9. Contact
10. Footer

Resume is a persistent nav CTA, not a section.

---

## 4. Design Personality & Visual Direction

**Feel:** intelligent, calm, confident, quietly ambitious. Premium through restraint — typography, spacing, and rhythm carry the design, not effects.

**Reference influence (not copy):** Linear's calm information density, Vercel's monochrome-plus-one-accent discipline, Stripe's confident section pacing, Apple's product-photography treatment of screenshots.

**Explicitly avoid:** gradients-as-decoration, glowing blobs, floating 3D objects, glassmorphism as a default (fine as a rare accent, not a system), neon/cyberpunk, terminal/code-rain motifs, percentage skill bars, stock photography, particle backgrounds.

---

## 5. Profile Photo Treatment

No photo supplied yet. Spec assumes a professional editorial portrait added later.

- **Placement:** Hero, right-aligned on desktop (60/40 split with headline), stacked below headline on mobile.
- **Treatment:** Desaturate 10–15%, subtle duotone overlay using the accent color at low opacity on shadows only (not a full color wash), 4:5 or 1:1 crop, soft edge vignette — no hard-drop-shadow card, no circular crop (reads as LinkedIn avatar, not editorial).
- **Placeholder system until photo exists:** a solid neutral-surface rectangle at the correct aspect ratio with a centered monogram ("SM") in the display typeface at low opacity — never a generic silhouette icon or stock photo.

---

## 6. Navigation

**Desktop:** Logo mark "SM" or "Sadik" (wordmark, not icon) — Work — About — Skills — Contact — [Resume] as a bordered secondary button, right-aligned. Height ≤ 72px. Background transparent over hero, gains a blurred surface + 1px bottom border after ~80px scroll.

**Mobile:** Logo + a single icon button (not a full hamburger drawer with animation) that opens a lightweight full-screen overlay with 5 large tap targets and the Resume CTA at the bottom. No slide-in panel with staggered link animations — keep it instant.

---

## 7. Hero Section

**Headline:** *Hi, I'm Sadik — I build products for the web.*

**Supporting paragraph (approved direction, refined):**
> I'm a Computer Science student at Aliah University and a full-stack developer who ships. My work spans real-time booking systems, secure authentication, and interactive UI — built with React, Node, and modern cloud infrastructure, and backed by a daily DSA practice.

**CTAs:**
- Primary: **View my work** → scrolls to Selected Work
- Secondary: **Let's connect** → scrolls to Contact
- Tertiary (small, text-link style, not a button): **Resume →**

**Layout:** Two-column on desktop (headline+CTAs left ~55%, portrait right ~45%); single column, photo below text, on mobile. First viewport must contain name, one-line value prop, and one CTA with zero scrolling on a 390px-wide phone.

---

## 8. Hero Motion

- Headline: word-by-word or line-by-line opacity+8px-translateY reveal, ~400ms, staggered ~60ms per line. Runs once on load.
- Portrait: fades/scales in from 98%→100% opacity+scale, slightly after headline.
- CTA buttons: standard hover — background fill transitions 150ms ease.
- No parallax scrubbing tied to scroll on the hero; keep first-viewport motion to load-in only.
- Respect `prefers-reduced-motion: reduce` — disable all transform-based entrance animation, keep opacity-only crossfade at most.

---

## 9. Selected Work — System & Strict Order

Order is non-negotiable: **01 CleanMess → 02 BeatMess → 03 RailVista**. CleanMess gets the largest first-viewport treatment; all three are always visible via normal scroll (no carousel, no "view more" gate hiding any of the three).

**Per-project component (progressive disclosure, in this order):**
1. Project number + name + one-line positioning (immediately visible)
2. Large visual preview (screenshot or placeholder, see §15)
3. Problem → Solution (2–3 sentences each)
4. Key features (short bullet list, 4–7 items max)
5. Tech stack (badges, verified only)
6. One engineering highlight worth a sentence or two of real detail
7. Live Demo button (primary) + GitHub button (secondary, only shown if the linked repo actually has pushed content — an empty repo should not render a GitHub button, since a dead/empty link undermines credibility more than omitting it)

This is a case-study block, not a card — each project gets its own full-width or near-full-width section with room to breathe, not a 3-up grid.

---

## 10. Project 01 — CleanMess (fully verified — supplied directly by Sadik)

- **Live:** https://cleanmess-app.web.app/
- **Repo:** https://github.com/Sadik47x/CleanMess *(currently empty — code to be pushed later; do not link the GitHub button live until the repo has content, or it will read as a broken/empty project to recruiters)*
- **Tagline:** *"4 people. 1 room. Zero excuses. Keep the room clean. Keep the responsibility fair."*

**Problem:**
In shared living spaces — hostels, PGs, flats — chore rotation charts break down the moment someone leaves for the weekend or goes home for a break. Roommates who stay behind absorb an unfair share of the work, absent roommates escape responsibility entirely, and when they return they're either let off the hook or buried under an unmanageable backlog.

**Solution:**
CleanMess is a mobile-responsive task-management web app — compiled into a native Android app via Capacitor — built around a custom **Deterministic Chore Rotation & Backlog Tracking Engine** that keeps chore distribution fair across 4 roommates, even through absences.

**Key features (verified, supplied by Sadik):**
- **Deterministic daily rotation** — chores auto-generate on a calendar rule (Asia/Kolkata IST): sweeping daily, mopping every 2 days, toilet cleaning every 7 days, cycling through roommates in a strict predictable sequence.
- **Absence & coverage system** — when a roommate is marked absent, their chore is auto-rerouted to a present roommate as a "Cover" task, while the original chore is logged as a pending backlog item for the absent roommate — not simply forgiven.
- **Backlog capping (fairness protection)** — even after a long absence, backlog is capped at a one-week equivalent (max 2 sweeping + 1 mopping + 1 toilet-cleaning = 4 pending duties max), so returning roommates never face an impossible pile-up.
- **Backlog clearing & re-integration** — on return, the roommate clears exactly one backlog task per day, is temporarily skipped in the normal rotation while clearing, and automatically rejoins once backlog hits zero.
- **Role-based access** — Manager vs. Roommate roles via Firebase Authentication.

**Tech stack (verified):**
| Layer | Technology |
|---|---|
| Frontend | React 19 (TypeScript) + Vite |
| Styling | Tailwind CSS (mobile-first, card-based UI) |
| Mobile packaging | Capacitor JS (compiles to native Android `.apk`) |
| Backend / DB | Firebase Firestore (real-time NoSQL) |
| Auth | Firebase Authentication (role-based: Manager / Roommate) |
| Dev tooling | Local mock Firebase environment for offline testing |

**Engineering highlight to lead with:** the backlog-capping logic is the most interesting piece — it's a genuine scheduling/fairness algorithm (bounded backlog with priority re-integration), not just a CRUD chore list. This is worth a sentence of real explanation in the case study rather than being buried under a generic feature bullet.

**Still needed before launch:** 3–5 screenshots (dashboard, chore assignment view, absence-marking flow, backlog view) — see capture spec in §15. GitHub button should stay hidden/disabled in the case-study component until the repo is actually pushed (repo exists but is currently empty).

---

## 11. Project 02 — BeatMess (fully verified — from public repo)

- **Live:** https://beatmess-player.onrender.com/
- **Repo:** https://github.com/Sadik47x/beatmess-player
- **Tagline (from live app):** *"Your music, your rules."*
- **README positioning:** *"BeatMess is a premium React + Node.js music streaming player equipped with a custom-engineered, single-user personalized music recommendation engine, dynamic auto-refill queue, and PWA mobile installation support."*

**Problem / solution framing:**
Most music apps either require a huge existing library relationship (Spotify-scale data) or offer no real personalization for a self-hosted, single-user player. BeatMess solves this at small scale: it builds a preference profile from real listening behavior — not just stated genre preferences — and keeps a queue automatically topped up so playback never runs dry.

**Key features (verified from repo README):**
- **Infinite auto-queue radio** — background job fetches new recommended tracks whenever the upcoming buffer drops below 5 tracks, so the queue never runs out.
- **Implicit feedback scoring** — the recommendation engine learns from actual behavior: likes, skips, partial listens, full completions, and consecutive replays all shape the user's taste profile, rather than relying on manual ratings.
- **Metadata tag cache** — queries MusicBrainz and Last.fm through a rate-limited background worker queue, caching tags locally to power content-similarity matching without hammering external APIs.
- **Home-page exclusion logic** — prevents the autoplay queue from re-surfacing songs already shown on the home page rails, avoiding repetitive recommendations.
- **PWA support** — installable directly from a mobile browser on Android and iOS.

**Tech stack (verified):**
| Layer | Technology |
|---|---|
| Frontend | React + TypeScript, Vite |
| Backend | Node.js (`server.js`), deployed via `render.yaml` blueprint |
| Styling | Tailwind CSS |
| External data | MusicBrainz API, Last.fm API (metadata/tag enrichment) |
| Deployment | Render (one-click blueprint deploy) |

**Engineering highlight to lead with:** the implicit-feedback recommendation engine is the standout piece — most student music-player projects stop at "play a song." BeatMess infers taste from behavior signals (skip rate, replay count, partial-listen ratio) rather than requiring explicit ratings, which is a genuinely non-trivial recommendation-systems problem worth a real sentence of explanation in the case study.

**Still needed before launch:** 3–5 screenshots (player UI, home page rails, queue/library view) — see capture spec in §15.

---

## 12. Project 03 — RailVista (fully verified from public repo)

- **Live:** https://railvista-self.vercel.app/
- **Repo:** https://github.com/Sadik47x/railvista
- **Positioning:** *India's next-generation railway reservation platform featuring visual coach layouts, smart seat selection, and a secure transactional booking engine.* — independent project, not affiliated with official railway authorities.

**Problem (verified from repo):**
Traditional railway booking flows suffer from slow client-side search, "blind" seat selection with no visibility into physical seat location, race-condition double-bookings on concurrent requests, and weak server-side authorization that risks exposing other users' bookings.

**Solution (verified):**
A full-stack, responsive booking engine with millisecond search (down from minutes), physically-modeled coach/seat layouts, atomic seat allocation via PostgreSQL transactions, and Supabase Row Level Security enforcing per-user data isolation at the database layer.

**Key features (verified):**
- Train search with intermediate-station routing
- Interactive visual seat map (Lower/Middle/Upper/Side Lower/Side Upper berths shown, not just class names)
- Multi-passenger booking form
- Fare breakdown with taxes and convenience fees
- Digital ticket / boarding pass generation
- "My Bookings" dashboard with cancellation
- Admin dashboard with live operational stats
- Server-side 10-digit PNR generation
- Fully responsive across breakpoints

**Verified tech stack:**
| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase / PostgreSQL |
| Auth | Supabase Auth (cookie-based sessions, JWT claims) |
| Security | Row Level Security (RLS), UUID v4 keys |
| Deployment | Vercel |

**Engineering highlights (all verified, genuinely strong — lead with these):**
- **Concurrency safety:** a partial unique index on `seat_reservations(seat_id, journey_date) WHERE reservation_status = 'confirmed'` prevents double-booking at the database level, not just in application logic.
- **Security testing:** an automated RLS/penetration test suite (`test-rls.ts`, `test-penetration.ts`) verifying that one user cannot read, modify, or cancel another user's booking, and that direct ID/URL manipulation fails safely. All documented test cases pass.
- **Performance:** search execution moved from client-side filtering to a PostgreSQL stored procedure (`get_train_schedules()`), eliminating N+1 queries and cutting search time from minutes to sub-second.
- **Scale of seed data:** 100 real Indian stations, 50 trains (including Vande Bharat/Rajdhani/Express categories), 577 coaches, 37,620 individual seats — a genuinely large modeled dataset for a student project.

This is the strongest, most verifiable project of the three and should carry real engineering-depth copy rather than being compressed to match CleanMess/BeatMess's current placeholder state.

**Screenshots available in repo** (`/screenshots/`): homepage, search results, seat selection, digital ticket, admin dashboard — use these directly.

---

## 13. About Section

**Theme:** *I learn best by building.*

**Draft copy:**
> I'm a Computer Science student at Aliah University, and most of what I know about engineering came from finishing things — not from finishing a course. I build full-stack products end to end: UI, API, database, deployment. I care about what's happening underneath the interface — how a query performs under load, how auth actually keeps data private, how a seat reservation stays correct when two people click "book" at the same time. Alongside building, I practice data structures and algorithms daily, because the two skills sharpen each other: DSA teaches you to reason about correctness and cost; shipping teaches you to reason about tradeoffs and users.

**How I think (folded in, 3 short lines, not a poster):**
- **Build** — I turn ideas into working software, not slide decks.
- **Understand** — APIs, databases, state, and performance are where the real engineering lives.
- **Improve** — Code and understanding both get revised, not written once.

---

## 14. Technical Skills

No percentage bars. Group by role, not by proficiency claim.

**Languages:** C++ · JavaScript (ES6+) · Python · HTML5 · CSS3

**Frontend:** React.js · Next.js · Responsive Design · Component Architecture

**Backend:** Node.js · Express.js · RESTful APIs · JWT Authentication · Socket.io

**Databases:** MongoDB · MongoDB Atlas · Mongoose · PostgreSQL · Supabase

**Tools & Platforms:** Git · GitHub · VS Code · Postman · Vercel · Render · npm

**CS Fundamentals:** Data Structures & Algorithms · OOP · Recursion · Trees · Linked Lists · Arrays

> Note: PostgreSQL/Supabase were added to this list on the strength of the verified RailVista stack (§12) — they weren't in the brief's original skills list but are now demonstrably in use.

Presentation: three or four labeled clusters ("Build with," "Think with," "Ship with") rendered as plain typographic groups with small tech-name chips — no bars, no numbers.

---

## 15. Problem Solving / DSA

**Framing line:** *Beyond the UI, I care about how things work.*

**Verified content (per brief, from resume — treat as user-supplied fact, not independently verified by this spec):**
- 100+ problems solved across LeetCode and GeeksforGeeks
- Coverage: arrays, strings, trees, linked lists, recursion, dynamic programming
- Completed Apna College's C++ & DSA course, 2025
- Exposure to heaps, graphs, tries, segment trees
- Maintains a daily coding streak

**Presentation:** short paragraph + a link-out button to LeetCode profile. Do not fabricate a live-stats widget unless a reliable API/embed is confirmed working — a broken or fake-looking stats widget undermines credibility more than having none.

---

## 16. Experience & Certifications

**VaultofCodes — Web Development Internship**
1-month internship, started 05/08/2025. Present as a short internship, not a full-time role.

**Forage — Tata Cybersecurity Analyst Job Simulation**
Completed July 11, 2025. Tasks: IAM fundamentals, IAM strategy assessment, custom IAM solution design, platform integration. **Explicitly label this "Job Simulation," never "employment" or "role."**

**Certifications:**
- C++ & Data Structures and Algorithms — Apna College, 2025
- Frontend Web Development — Udemy, in progress
- Cybersecurity Analyst Job Simulation — Forage, July 2025
- Web Development Internship — VaultofCodes, August 2025

**Presentation:** a simple horizontal timeline or stacked list, each item opening a lightbox with the certificate image on click. No verification codes or student ID numbers displayed publicly.

---

## 17. Education

**Aliah University** — B.Tech, Computer Science & Engineering, 2024–2028
**Ramakrishna Mission Vidyapith, Purulia** — Higher Secondary (Science), 87%, 2021–2023

Relevant coursework: DSA · OOP · DBMS · Operating Systems · Computer Networks · Discrete Mathematics

Keep to a compact two-entry block; give it less visual weight than the Projects section.

---

## 18. Resume

Persistent nav-bar button, "Resume," opening/downloading a PDF in a new tab. No dedicated homepage section.

---

## 19. Contact

**Headline:** *Have a project, opportunity, or problem worth solving?*
**Supporting line:** One sentence — e.g., "I'm looking for internships and opportunities to build. Reach out — I read everything."
**Primary CTA:** **Let's talk** → `mailto:sadikmondal789@gmail.com`
**Also shown:** LinkedIn, GitHub, LeetCode as icon+label rows.
No custom contact form unless a real backend/email service is wired up — a fake-looking form that silently fails is worse than a mailto link.

---

## 20. Footer

Sadik Mondal — Full-Stack Developer & Software Engineering Student
Social icons: GitHub · LinkedIn · LeetCode · Email
© [year] Sadik Mondal. Small closing line, e.g., "Built with React, shipped with intent."

---

## 21. Typography System

- **Primary (display + body):** A modern variable grotesque — e.g., Inter or Geist (both free, both read as "serious developer tool" without looking like a template default). Pick one and use its full weight range instead of mixing two families.
- **Optional secondary (code/mono accents only — tech badges, PNR-style numbers, small labels):** JetBrains Mono or Geist Mono, sparingly.
- **Scale (desktop → mobile):**
  - Display / Hero H1: 64–72px → 36–40px, tight leading (1.05–1.1), tracking -0.02em
  - H2 (section headers): 40–48px → 28–32px
  - H3 (project names): 28–32px → 22–24px
  - Body: 18px → 16px, leading 1.6
  - Caption/meta: 13–14px, leading 1.4, slightly increased tracking (0.02em) if uppercase

---

## 22. Color System

**Default mode:** Light, high-contrast, one restrained accent — evaluated as the better default for a recruiter-facing, screenshot-heavy portfolio (screenshots of RailVista's UI and any future CleanMess/BeatMess screenshots will read cleanly against light surfaces). Offer dark mode as a toggle, not the default.

**Light mode:**
- Background: `#FAFAF9` (warm off-white, not pure white)
- Surface (cards): `#FFFFFF`
- Primary text: `#111111`
- Secondary text: `#5B5B5B`
- Border: `#E5E5E3`
- Accent: one restrained color — recommend a deep indigo/blue (`#3452FF`-family) for links/CTAs; a muted violet echoing BeatMess's `#8b5cf6` is a nice subtle nod but shouldn't dominate the whole site's identity.

**Dark mode (toggle):**
- Background: `#0B0B0D`
- Surface: `#141416`
- Primary text: `#F5F5F4`
- Secondary text: `#9B9B9B`
- Border: `#242426`
- Accent: same hue as light mode, lightened for contrast (`#6C7CFF`-family)

Avoid pure black backgrounds (reads as "dark theme default," not "premium") and avoid neon-saturated accents.

---

## 23. Spacing System

8px base unit. Section vertical padding: 96–128px desktop, 56–72px mobile. Content max-width: 1120–1200px, with generous side gutters (min 24px mobile, 5vw+ desktop). Project case-study blocks get their own larger internal rhythm (48px+ between sub-elements) to signal "this is the important part."

---

## 24. Component System

Navbar · Button (primary/secondary/ghost) · SectionHeading · ProjectCaseStudy (the reusable project block from §9) · TechBadge · SocialLink · CertificateCard + Modal/Lightbox · Timeline · SkillGroup · Footer · ImagePreview/ScreenshotFrame (device-frame-style container for project screenshots).

States to define per interactive component: default, hover, focus-visible (visible outline, not just color change), active, disabled where relevant.

---

## 25. Micro-interactions

- Button hover: background/border transition, 150ms
- Project screenshot hover: subtle scale (1.00→1.02) + shadow lift, 200ms
- Link underline: animate width 0→100% on hover, not just color change
- Section entrance: single fade+8px-rise on first scroll into view, no stagger cascades beyond the hero
- Nav: background/blur transition on scroll threshold

Every animation must be removable via `prefers-reduced-motion` without breaking layout.

---

## 26. Responsive Rules

| Breakpoint | Behavior |
|---|---|
| 360–430px (mobile) | Single column throughout; hero stacks text-then-photo; project case studies stack visual-then-copy; nav collapses to icon+overlay |
| Tablet (~768px) | Hero may stay stacked or go two-column depending on content length; project screenshots can go two-up for secondary images |
| Laptop (1024–1440px) | Full two-column hero; project sections get generous side margins |
| Large desktop / ultrawide (1440px+) | Content stays capped at max-width (§23); do not stretch text lines full-bleed — cap body copy at ~65–75 characters per line |

Typography scales per §21; buttons keep a minimum 44px tap target on touch devices.

---

## 27. Accessibility

- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, proper heading hierarchy H1→H2→H3, no skipped levels)
- Full keyboard navigability; visible focus rings (not `outline: none` without replacement)
- Color contrast: body text ≥ 4.5:1, large text ≥ 3:1 in both light and dark modes
- All images (screenshots, portrait) get descriptive alt text — not filenames
- External links (GitHub, demo, LinkedIn) get `aria-label` clarifying destination and open in a new tab with `rel="noopener"`
- `prefers-reduced-motion` respected everywhere per §25
- Certificate lightbox/modal is keyboard-dismissible (Esc) and traps focus while open

---

## 28. SEO

- **Title:** Sadik Mondal — Full-Stack Developer & Software Engineering Student
- **Meta description:** ~150–160 chars, e.g., "Full-stack developer and CS student building real products — React, Next.js, Node, and PostgreSQL. See CleanMess, BeatMess, and RailVista."
- Open Graph + Twitter card metadata using the hero portrait or a generated OG image
- Favicon (SM monogram, matches wordmark)
- `sitemap.xml`, `robots.txt`
- Canonical URL (placeholder until domain is finalized)
- No keyword stuffing; structured data optional (Person schema) if implementing with Next.js

---

## 29. Performance

- Next.js `<Image>` (or equivalent) for all screenshots — responsive `srcset`, lazy-loaded below the fold
- Self-hosted, subset, `font-display: swap` for the chosen typeface
- No animation library beyond CSS transitions / minimal Framer Motion for the handful of entrance animations — avoid heavy 3D/particle libraries entirely (the brief already rules these out visually; this reinforces it technically)
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 on mobile
- Static generation for all portfolio pages (no client-side data fetching needed — content is static)

---

## 30. Recommended Tech Stack

**Recommendation: Next.js + TypeScript + Tailwind CSS**, matching the stack Sadik already used for RailVista — meaning code, conventions, and even some components (screenshot frames, badges) can realistically be reused between the RailVista project and the portfolio itself. Deploy on Vercel.

This is deliberately the same stack as one of his own showcased projects — a subtle, honest signal of consistency rather than over-engineering. A personal portfolio does not need a CMS, a database, or a backend; it should be a fully static Next.js site.

---

## STITCH DESIGN INSTRUCTIONS

*Use this section directly as the design-generation brief.*

**Visual direction:** Minimal, premium, typography-led developer portfolio. Light mode default (warm off-white `#FAFAF9` background, near-black `#111111` text, one restrained indigo accent `#3452FF`), with an optional dark-mode variant (`#0B0B0D` background, `#F5F5F4` text, lightened accent `#6C7CFF`). Primary typeface: a modern grotesque (Inter/Geist-class) at the scale defined in §21. No gradients, no glassmorphism, no 3D, no particle effects, no skill-percentage bars.

**Page structure, top to bottom:**
1. **Nav** — wordmark left, 5 links + Resume button right (desktop); icon-triggered full-screen overlay on mobile. Transparent-to-blurred-surface on scroll.
2. **Hero** — two-column desktop (55/45 text/photo split), single column mobile (text then photo). H1 "Hi, I'm Sadik — I build products for the web," supporting paragraph (§7), Primary+Secondary CTA buttons, small tertiary Resume text-link. Photo placeholder: neutral rectangle, 4:5 or 1:1, centered "SM" monogram.
3. **Selected Work** — three full-width (or near-full-width) case-study blocks in strict order CleanMess → BeatMess → RailVista, each following the 7-part structure in §9. CleanMess visually largest/first (content is fully verified in §10 — the deterministic rotation/backlog engine is real and specific, use it). BeatMess content is fully verified in §11 — lead with the implicit-feedback recommendation engine. RailVista block should be the most content-rich of the three since it has the most verified engineering depth (§12) — include the tech-stack table, the 4 engineering highlights, and reference to the 5 available screenshots. All three now have real copy; only CleanMess and BeatMess still need real screenshots (use the placeholder frame from §15 until supplied).
4. **About** — single column, ~500px-wide reading column, body copy from §13, followed by the 3-line "how I think" list styled as a simple horizontal or stacked set of short labeled statements (not icon-heavy cards).
5. **Skills** — 3–4 labeled clusters (§14) as plain typographic groups with small chip-style tech tags, no bars/percentages.
6. **DSA** — short paragraph + LeetCode link-out button, framed under "Beyond the UI, I care about how things work."
7. **Experience & Certifications** — compact timeline (VaultofCodes → Forage → certs), each item opens a lightbox on click.
8. **Education** — two-entry compact block, visually quieter than Projects.
9. **Contact** — centered, short headline+subhead, primary "Let's talk" mailto button, three social rows below.
10. **Footer** — name, role line, social icons, copyright, one closing line.

**Component visuals:** buttons are pill or slightly-rounded rectangles with 150ms hover transitions; project screenshots sit inside a subtle device-style frame (thin border, soft shadow, rounded corners ~12px) — not a raw browser-chrome mockup, not a floating-3D tilt. Tech badges are small pill chips with a hairline border, no background fill in light mode.

**Motion intent:** load-in fade+rise on hero text (staggered by line) and portrait; scroll-triggered single fade+rise per section (no stagger cascades beyond hero); button/link hover transitions only elsewhere. All motion disabled under reduced-motion.

**Image requirements:** Hero portrait (4:5 or 1:1, placeholder until supplied). RailVista: use the 5 repo screenshots (homepage, search, seat-selection, ticket, admin-dashboard) at 16:9 desktop crops with 9:16 or 4:5 mobile equivalents (see §15 capture spec below for CleanMess/BeatMess once supplied). Favicon: "SM" monogram matching wordmark.

---

## ANTIGRAVITY IMPLEMENTATION INSTRUCTIONS

*Turn the Stitch design into a real, deployed Next.js site — reproduce the design; do not redesign it.*

### Recommended folder structure
```
/app
  /page.tsx                 → home (all sections, single page)
  /layout.tsx                → root layout, fonts, metadata
  /globals.css                → Tailwind base + CSS variables (color tokens from §22)
/components
  Nav.tsx
  Hero.tsx
  ProjectCaseStudy.tsx        → reusable, takes a Project data object
  About.tsx
  Skills.tsx
  DsaSection.tsx
  ExperienceTimeline.tsx
  CertificateModal.tsx
  Education.tsx
  Contact.tsx
  Footer.tsx
  ui/
    Button.tsx
    TechBadge.tsx
    ScreenshotFrame.tsx
    SectionHeading.tsx
/data
  projects.ts                 → CleanMess, BeatMess, RailVista objects (see model below)
  skills.ts
  experience.ts
  certifications.ts
/public
  /images/projects/{cleanmess,beatmess,railvista}/...
  /images/hero-portrait.jpg   → placeholder until supplied
  /resume.pdf
  favicon.ico
```

### Project data model
```ts
type Project = {
  slug: string;
  order: 1 | 2 | 3;
  name: string;
  tagline: string;
  liveUrl: string;
  githubUrl?: string; // omit or leave undefined until the repo has real pushed content — component should hide the GitHub button entirely when absent
  problem: string;
  solution: string;
  features: string[];
  techStack: { layer: string; technology: string }[];
  highlights: string[];
  screenshots: { src: string; alt: string }[];
  verified: boolean; // false = render with placeholder visual system, flag internally
};
```
Populate all three projects fully now — CleanMess from §10, BeatMess from §11, RailVista from §12 (`verified: true` for all three). Only the `screenshots` array for CleanMess and BeatMess should point at the placeholder frame from §15 until real screenshots are supplied — everything else (problem, solution, features, tech stack, highlights) is real content and should ship as-is.

### Responsive implementation
Tailwind breakpoints mapped to §26: default (mobile) → `md:` (~768px, tablet) → `lg:` (~1024px, laptop) → `xl:`/`2xl:` (large desktop, capped content width via a `max-w-[1200px] mx-auto` wrapper).

### Animation implementation
CSS transitions for hover states; a minimal `IntersectionObserver`-based fade-in utility (or lightweight Framer Motion `whileInView`) for section entrances. Wrap all transform-based animation in a check against `window.matchMedia('(prefers-reduced-motion: reduce)')`.

### SEO implementation
Next.js `generateMetadata` in `layout.tsx` for title/description/OG/Twitter (§28). `sitemap.ts` and `robots.ts` route handlers (Next.js App Router convention). Person structured data (JSON-LD) optional, in `layout.tsx`.

### Accessibility implementation
Use semantic landmarks (`<nav>`, `<main>`, `<footer>`), one `<h1>` (hero), sequential `<h2>`/`<h3>` per section. Focus-visible styles via Tailwind's `focus-visible:` variant, not `focus:`. Certificate lightbox: use a proper dialog pattern (native `<dialog>` or a11y-audited library) with focus trap and Esc-to-close.

### Performance implementation
`next/image` for all screenshots and the portrait, `next/font` for the chosen typeface (self-hosted, `display: swap`). No client components beyond what's needed for the mobile nav overlay, the certificate lightbox, and reduced-motion-aware animation — everything else stays a server component.

### Deployment
Vercel, connected to the GitHub repo. No environment variables required (fully static site; the resume is a static PDF in `/public`, contact is a `mailto:` link — no backend/env config needed).

### Testing / QA checklist
- [ ] Lighthouse ≥ 90/95/95/100 (Perf/A11y/BP/SEO) on mobile
- [ ] Keyboard-only pass: can reach and activate every interactive element, including the certificate lightbox
- [ ] `prefers-reduced-motion` verified in browser dev tools — all transform animation disabled
- [ ] All three project sections render correctly with placeholder data (CleanMess/BeatMess) and real data (RailVista)
- [ ] Screenshots load responsively at all breakpoints in §26, no layout shift (define explicit width/height or aspect-ratio)
- [ ] External links open in new tab with `rel="noopener noreferrer"` and have descriptive `aria-label`s
- [ ] Dark-mode toggle (if implemented) persists via `localStorage` or system-preference detection, and all color tokens from §22 are used (no hardcoded hex outside the token file)
- [ ] Resume PDF link works and opens/downloads correctly
- [ ] Mailto contact link opens the visitor's mail client with the correct address pre-filled

---

## Asset Checklist

- [ ] Hero portrait (professional, editorial-toned) — currently missing
- [x] CleanMess: feature list + tech stack confirmed — [ ] screenshots still needed, [ ] repo link still needed
- [x] BeatMess: feature list + tech stack + repo verified — [ ] screenshots still needed
- [ ] RailVista: screenshots already available in repo (`/screenshots/`) — ready to use
- [ ] Resume PDF (current version)
- [ ] Certificate images: Apna College C++/DSA, Udemy Frontend (if completed), Forage Cybersecurity, VaultofCodes Internship
- [ ] Favicon / "SM" wordmark mark

## Content Checklist

- [x] Class year confirmed: 3rd year, 5th semester
- [x] LinkedIn URL confirmed: https://www.linkedin.com/in/sadik-mondal
- [x] CleanMess problem/solution/features/stack — confirmed by Sadik, written up in §10
- [x] BeatMess problem/solution/features/stack — verified from repo README, written up in §11
- [ ] Confirm whether RailVista's "Internship Ready / Production Grade" self-labeling should appear verbatim on the public site or be softened
- [ ] CleanMess and BeatMess GitHub repo links, if public (CleanMess repo exists at github.com/Sadik47x/CleanMess but is currently empty — hide the GitHub button until code is pushed; BeatMess confirmed live at github.com/Sadik47x/beatmess-player)

## Launch Checklist

- [ ] All Testing/QA items above pass
- [ ] Real content replaces every `[ADD VERIFIED INFORMATION]` marker in this document
- [ ] Domain connected, canonical URL updated in metadata
- [ ] OG image renders correctly when the URL is shared in Slack/LinkedIn/Twitter
- [ ] Final proofread pass on all copy for the banned-phrase list in the original brief (§39: no "passionate developer," "tech enthusiast," etc.)
