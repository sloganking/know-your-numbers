# AGENTS.md — How to Maintain This Repo (read this first)

You are an AI maintaining **Know Your Numbers**, a public, evidence-based STI transmission-risk calculator. Every number is sourced to a quote, every calculation is shown, every citation is verifiable. This file is your schema: it tells you the repo's structure, the non-negotiable rules, and the workflows for ingesting sources, answering questions, and health-checking. Read it before doing substantive work.

> **This is a PUBLIC repo on a public GitHub account.** Never add personal information, psychology, life story, private strategy, or anything about the author beyond what belongs on a public health-data project. No personal narrative log (see Changelog below). If you're unsure whether something is public-safe, leave it out.

---

## The prime directive (from `.cursorrules` — never break it)

**Every piece of information used in a calculation or derivation MUST be explicitly present in the quoted source text shown to the user.** No implicit AI knowledge, no unstated assumptions. If a claim isn't in the quote, either add context to the quote or mark it as an **inference** (⚠️) or **assumption** (⚠️). Never use a per-partnership rate as a per-act rate — if you can't derive per-act, set `value: null` ("Data not available" is honest). Full rules and the pre-commit checklist live in [`.cursorrules`](.cursorrules) — that file governs; this one routes.

## The model (borrowed from the LLM-wiki pattern, adapted)

Three layers, same spirit as a maintained wiki:

1. **Raw sources = the quoted studies inside `sources.js`** (and `sources-backup.js`). These are the source of truth — peer-reviewed studies and public-health orgs, each with an exact verbatim quote + a `#:~:text=` fragment that highlights it on the source page. Treat quotes as immutable facts; you transcribe, you don't paraphrase.
2. **The derived layer = the calculator** (`app.js` renders derivations/chart from `sources.js`) plus the methodology docs (`corrections.md`, `ambiguity.md`). This is where sourced numbers become shown math. You own keeping this consistent with the sources.
3. **The schema = this file + `.cursorrules`.** How it's structured and how you work. Co-evolve it with the author when conventions change.

## File map

| File | What it is |
|------|-----------|
| `index.html` | The page — hero, mission, calculator UI, STI data, methodology sections. |
| `app.js` | Calculator logic, chart rendering, citation/derivation display. |
| `sources.js` | **The source database** — each STI's per-act rates with verbatim quotes, derivations, and highlighted source links. The heart of the project. |
| `sources-backup.js` | Backup sources — verified but not displayed. |
| `test-sources.js` | **Automated verification** — checks every quote still exists on its linked source page. `node test-sources.js` (add `--include-backup`). |
| `test-consistency.js` | Consistency checks across sources/derivations. |
| `corrections.md` | **Methodology corrections log** — data-interpretation issues found and resolved (e.g. HSV-2 shedding-rate vs overall-rate; the 54× error). Append here when a number changes and why. |
| `ambiguity.md` | Notes on ambiguous/underspecified data. |
| `preventatives-to-research.md` | Backlog of preventatives/topics to add. |
| `styles.css` | Styling. |
| `.cursorrules` | **The citation law.** Governs everything. |
| `README.md` | Public-facing project description. |

## Operations

**Ingest a new source.** Find the study → extract the exact quote (with enough surrounding context to stand alone) → add to `sources.js` with the `#:~:text=` fragment (highlight as much of the quote as possible; use multiple `&text=` for omissions marked `...`) → wire the derivation (every variable used, per-act discipline, inferences/assumptions flagged ⚠️) → **run `node test-sources.js` until it passes** → if a number changed, append a dated note to `corrections.md` → add a line to the Changelog below.

**Query / answer.** Read `sources.js` for the relevant STI, answer from the quoted text only, cite. Good analyses that should persist (a new comparison, a methodology note) get filed into `corrections.md` or `ambiguity.md`, not lost in chat.

**Lint / health-check.** Run `node test-sources.js` (and `--include-backup`). Look for: dead source links, quotes that no longer match the page, per-partnership rates masquerading as per-act, unused variables, missing `#:~:text=` fragments, contradictions between `sources.js` and `corrections.md`.

## Integrity on session start (the freshness habit)

This repo has automated verification but no session hook yet. **On starting substantive work, run `node test-sources.js --include-backup` first** and report what's stale before editing — this repo sat unedited for ~5 months, so some source pages may have moved or changed. If it's worth automating, propose a session-start check (mirroring how sibling repos run a freshness script on launch). Never trust the displayed numbers as verified until the test passes.

## Changelog (technical only — NOT a personal log)

Append-only, one line per substantive change, newest on top. Format: `## [YYYY-MM-DD] <what changed>`. Record **data/source/code changes only** — added/updated/removed sources, fixed derivations, dead-link repairs, methodology corrections. **No personal narrative, no author story** (that's what makes it safe for a public repo). If a longer methodology explanation is needed, it goes in `corrections.md`.

## [2026-07-03] Added `index.md` — content index / navigation layer
- Created `index.md`: current file map, catalog of all 6 calculator STIs (rates, data-quality, primary source, condom eff., preventatives), and a full catalog of every source (50 in `sources.js` + 1 in `sources-backup.js`) grouped by STI/topic with measurement basis (per-act vs per-partnership vs incidence vs lifetime vs effectiveness) and auto/manual verification status.

## [2026-07-03] Health-check repairs after 5-month gap: fixed 2 broken citations
- Replaced dead `chlamydia_asymptomatic` source (Finnish `yths.fi`, site reorganized) with the ECDC chlamydia factsheet, which states the same asymptomatic-rate fact verbatim; updated the tooltip in `index.html`. Details in `corrections.md`.
- Marked `hpv_obgyn_high_estimate` (Contemporary OB/GYN) as `manuallyVerified` — the site returns HTTP 403 to automated requests but the quote is live on the page. Details in `corrections.md`.
- `node test-sources.js` and `node test-sources.js --include-backup` now pass with 0 errors; `node test-consistency.js` passes clean.

## Commit discipline

**Never run `git commit` or push.** The author makes all commits. Make your edits, run the tests, report what you changed, and let the author commit.

## First tasks for the next AI (suggested order)

1. **Health check.** `node test-sources.js --include-backup` — report which of the ~18–20 sources pass/fail after the 5-month gap. Fix dead links / moved quotes; log fixes in `corrections.md` + the Changelog.
2. **Build `index.md`** — a content index: the file map above (keep current) + a catalog of every STI covered and every source cited (study, year, what it establishes, per-act vs per-partnership). This is the navigation layer for future maintenance.
3. **Consider a `CONTRIBUTING.md`** — surface the citation bar for outside PRs (the `.cursorrules` essentials + "run the test suite").
4. Only then ingest new sources / add STIs from `preventatives-to-research.md`.

---

*Created July 3, 2026, to make this repo AI-maintainable at production grade — the scheme adapted from the LLM-wiki pattern used in the author's other repos. Keep this file current as conventions evolve.*
