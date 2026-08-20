# Motion & Interaction Addendum — Sadik Mondal Portfolio

**Purpose:** Add to `sadik-portfolio-spec.md` — Antigravity should read both files. This one covers *only* motion/interaction polish. It does not touch layout, content, or color — those stay exactly as defined in the main spec.

**Guiding rule for this whole file:** every effect here should be the kind of thing you *feel* before you *notice*. If a visitor can describe an animation in words ("oh the sections fade up as you scroll"), it's calibrated correctly. If they'd describe it as "whoa, look at that" — cut it. Apple's product pages feel premium because motion clarifies structure and hides nothing; it's never the main event.

Nothing in this file needs a heavy animation library. Everything is doable with CSS + one small utility (or Framer Motion's `whileInView`, if already in the stack) — no GSAP, no Three.js, no scroll-jacking libraries.

---

## 1. The core Apple-vibe technique: scroll-linked reveal, not scroll-jacking

Apple's section transitions are **not** "hijack the scroll and play an animation." They're simpler than they look: each section is a plain, normal-scrolling block, and content *within* it animates in based on scroll position — using the browser's native scroll, not overriding it.

**Implementation: `IntersectionObserver` + CSS transition.**

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// one shared observer, reused everywhere
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // play once, not every scroll pass
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

- `cubic-bezier(0.16, 1, 0.3, 1)` is the "ease-out-expo" curve Apple actually uses — fast start, long soft settle. This one curve, reused everywhere, is most of the "Apple feel."
- Trigger once per element (`unobserve` after firing) — replaying on every scroll-up/scroll-down is the #1 thing that makes a site feel cheap instead of premium.
- Apply `.reveal` to: section headings, the case-study block as a whole (not each bullet individually — see §4), and screenshot frames. Do **not** apply it to every paragraph, every list item, every badge — that's the stagger-cascade trap.

---

## 2. Section-to-section rhythm (the actual "transition" feel)

What reads as "smooth section transitions" on Apple's site is mostly **generous vertical spacing + consistent reveal timing**, not a literal transition effect between sections. Two things do the real work:

- **Breathing room:** §23 of the main spec already sets 96–128px section padding — that's not decorative, it's load-bearing for this effect. Don't let a developer compress it "to fit more above the fold."
- **Snap-adjacent, not snap-locked:** add `scroll-behavior: smooth` at the root level so anchor-link jumps (nav clicks) glide instead of jump-cutting. Do **not** use CSS `scroll-snap-type` on the whole page — that fights natural scrolling and feels janky on trackpads/phones the moment a section is taller than the viewport.

```css
html {
  scroll-behavior: smooth;
}
```

---

## 3. One signature moment, not five small ones

Per the frontend-design principle "spend your boldness in one place" — pick **one** section to carry slightly more motion than the rest, and keep everything else quieter by comparison. For this portfolio, the natural candidate is **the transition into Selected Work** (§9 of the main spec), since that's the "proof" beat of the narrative arc.

**Suggested signature moment:** as the visitor scrolls from Hero into Selected Work, the RailVista/CleanMess/BeatMess screenshots (or placeholder frames) scale in from 96%→100% opacity+scale as they cross the reveal threshold, slightly slower (0.9s vs the standard 0.7s) than other reveals — just enough to feel like the "main event" of the page without being a gimmick. Every other section reveal stays at the standard 0.7s timing from §1.

---

## 4. Micro-interactions — the essential list only

These are the ones worth building. Anything not on this list, skip.

| Element | Effect | Notes |
|---|---|---|
| Nav bar | Background/blur fades in after ~80px scroll | Already in main spec §6 — reconfirmed here as essential |
| Buttons | Background/border transition, 150ms ease | Standard, no bounce |
| Project screenshot | Hover: scale 1.00→1.02 + shadow lift, 200ms | Only on devices with hover capability — skip on touch (`@media (hover: hover)`) |
| Nav links / text links | Underline animates width 0→100% on hover | Replaces default underline, don't stack both |
| Case-study section | Whole block reveals as one unit (§1), **not** each bullet separately | Staggering every bullet point is the single most common thing that makes a portfolio feel AI-generated — resist it |
| Certificate lightbox | Fade + scale-up open (0.25s), fade + scale-down close | Keep it fast — a slow modal open feels laggy, not premium |

**Explicitly do not build:** cursor-follow effects, magnetic buttons, text-splitting/letter-by-letter reveals, scroll-jacked full-page-per-section pinning, parallax on more than one element, confetti/particle bursts on any interaction, animated gradient backgrounds, tilt-on-mouse-move cards.

---

## 5. Page-load sequence (hero only — already scoped in main spec §8, restated for completeness)

- Headline reveals line-by-line, ~60ms stagger between lines, using the same ease-out-expo curve from §1.
- Portrait fades/scales in (98%→100%) slightly after the headline finishes.
- CTA buttons appear with the headline, no separate delay — don't make visitors wait for buttons to become clickable.
- Total sequence should complete in well under 1 second. If it feels slow when you watch it, it is slow.

---

## 6. Reduced motion — non-negotiable, five lines of CSS

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: opacity 0.3s ease !important;
    transform: none !important;
  }
  html { scroll-behavior: auto; }
}
```

This turns every transform-based reveal into a simple opacity fade and disables smooth-scroll — nothing breaks, nothing pops in abruptly, and it satisfies §27 of the main spec.

---

## 7. Build order for Antigravity (keep it small)

1. Wire the shared `IntersectionObserver` + `.reveal` class from §1 — apply to section headings and case-study blocks only.
2. Add `scroll-behavior: smooth` + nav scroll-blur (already spec'd in main doc).
3. Add the four micro-interactions in §4's table.
4. Add the one signature moment in §3 to the Hero→Selected Work transition only.
5. Add the reduced-motion override in §6 last, and verify it actually disables the transforms (toggle it in dev tools and confirm).

That's the entire motion system. Five steps, no new dependencies, nothing that needs a design tool to preview — it should take a fraction of the time the visual build itself takes.
