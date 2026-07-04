# Data Corrections & Methodology Notes

This document records data interpretation issues we've encountered and resolved. Use this when evaluating new statistics to understand why we have the numbers we have, and whether new data should change them.

---

## Table of Contents
1. [HSV-2: Shedding Rate vs Overall Rate](#hsv-2-shedding-rate-vs-overall-rate)
2. [General Principles](#general-principles)

---

## HSV-2: Shedding Rate vs Overall Rate

**Date:** 2026-01-20  
**Issue:** Calculator was dramatically overestimating HSV-2 transmission risk

### The Problem

We had two sources with very different per-act rates:

| Source | Per-Act Rate | What It Measures |
|--------|-------------|------------------|
| Magaret 2016 | **2.85%** | Transmission per act **during viral shedding episodes only** |
| Corey 2004 (derived) | **0.053%** | Transmission per act **averaged over all days** (shedding + non-shedding) |

The Magaret rate is **54× higher** because HSV-2 only sheds asymptomatically ~10-20% of days. The Magaret study specifically measured transmission during those high-risk shedding periods.

### Why This Matters

Using the wrong rate produced wildly inaccurate predictions:

```
Over 8 months (69 acts at 2x/week):
  Using Magaret 2.85%:  86.4% cumulative risk  ← WRONG
  Using Corey 0.053%:    3.6% cumulative risk  ← CORRECT
  
Corey study actually observed: 3.6%
```

### The Fix

We now use the **Corey-derived rate (0.053%)** because:
1. It represents the overall per-act probability a user would experience
2. It correctly reproduces the study's observed 8-month transmission rate
3. It's what someone would experience in a real relationship (not just during shedding)

### How to Evaluate Future HSV-2 Data

If you find a new HSV-2 transmission study:

1. **Check what it measured**: Was it during shedding/outbreaks only, or overall?
2. **Back-calculate**: Does the per-act rate reproduce the study's observed outcomes?
3. **Consider the use case**: Users want to know overall risk, not just risk during high-shedding periods

**Keep Magaret 2016 in sources.js** — it's valid data, just for a different question ("what's the risk when the infected partner is actively shedding?"). We might use it for a "during outbreak" scenario someday.

---

## General Principles

### Per-Act vs Per-Study-Period Reductions

When a study says "X% reduction in transmission":

1. **Determine the timeframe**: Is this per-act, per-year, per-study-period?
2. **Apply at the same level**: A per-act reduction should be applied to per-act rates
3. **Verify by back-calculation**: Does applying your interpretation reproduce the study's results?

**Example — Valacyclovir 47% reduction:**
- Corey study observed: 3.6% → 1.9% over 8 months
- That's a 47% reduction in the 8-month outcome
- Since we derived per-act rates from the same study, applying 47% per-act is consistent
- Verification: `1 - (1 - 0.00053×0.53)^69 = 1.9%` ✓

### Per-Act vs Per-Partnership Rates

Some studies report **per-partnership** transmission (probability of transmission over entire relationship). This is NOT the same as per-act.

**Converting per-partnership to per-act** (if you must):
```
per_act = 1 - (1 - per_partnership)^(1/estimated_acts)
```

⚠️ This requires assuming a number of sex acts, which introduces uncertainty. Document any assumptions clearly.

### When Two Sources Disagree

If Source A says 2% and Source B says 0.05%:

1. **Check methodology**: What exactly did each study measure?
2. **Check population**: Different populations can have different rates
3. **Check conditions**: During outbreaks? With treatment? Specific viral load?
4. **Prefer the one that matches your use case**: We want overall risk for typical users

Don't just pick the "more recent" study — it might be measuring something different.

---

## Citation URLs Must Keep Text Fragments

**Date:** 2026-01-20  
**Issue:** Removed required `#:~:text=` fragments from citation URLs in `sources.js`

### The Problem

Two citation URLs were changed to base URLs without text fragments:
- CDC HPV vaccination impact page
- WHO hepatitis B fact sheet

This violates the repository rule that **every citation URL must include a text fragment** to highlight the exact quoted text on the source page.

### The Fix

Reverted both URLs to include their full `#:~:text=` fragments:
- `https://www.cdc.gov/hpv/vaccination-impact/index.html#:~:text=...`
- `https://www.who.int/news-room/fact-sheets/detail/hepatitis-b#:~:text=...`

### Rule

**Never remove text fragments from citation URLs.**  
If a URL already contains a fragment, keep it and add the quote-based fragment via the generator when rendering. The stored URL must retain its `#:~:text=` fragment at all times.

---

## Dead-Link Repair: Chlamydia Asymptomatic Source (Finnish → ECDC)

**Date:** 2026-07-03  
**Issue:** After a ~5-month gap, `node test-sources.js` reported the `chlamydia_asymptomatic` source as an error ("Invalid URL")

### The Problem

The source `chlamydia_asymptomatic` linked to the Finnish Student Health Service (`yths.fi`), which reorganized its site; the chlamydia page (and its quoted text) is no longer reachable. This source is displayed in `index.html` as a supporting education fact ("~70% of women and 50% of men have no symptoms") but is **not** used in any transmission-risk calculation.

### The Fix

Replaced it in-place (kept the `chlamydia_asymptomatic` key so the `data-source` reference in `index.html` still resolves) with the **ECDC chlamydia factsheet**, which states the same fact verbatim and is a higher-authority source:

> "At least 70% of genital C. trachomatis infections in women and 50% in men are asymptomatic at the time of diagnosis"

- New URL: `https://www.ecdc.europa.eu/en/chlamydia/facts` (with `#:~:text=` fragment)
- Updated the tooltip in `index.html` to match.
- Not a duplicate of any existing source (no other source covers asymptomatic rates).
- `node test-sources.js` now passes for this source.

---

## Bot-Blocked Source Marked Manually Verified: Contemporary OB/GYN (HPV)

**Date:** 2026-07-03  
**Issue:** `hpv_obgyn_high_estimate` reported an HTTP 403 error in the automated test

### The Problem

`contemporaryobgyn.net` returns HTTP 403 to automated requests (bot protection), so the test could not fetch the page — but the quoted text ("...transmissibility of HPV ... is 40% per coital act") is still live on the page. This is the same situation as the JAMA / CDC / WHO / PubMed sources already flagged `manuallyVerified`. Note: this source is defined but **not currently displayed** anywhere in the UI.

### The Fix

Confirmed the quote is live on the page, then added `manuallyVerified: true` with a `manualVerificationNote` explaining the 403, matching the existing convention. The test now skips automated fetch for it (⊘ MANUALLY VERIFIED) instead of erroring.

---

## Page/Data Consistency Fixes (index.html vs calculator)

**Date:** 2026-07-03  
**Issue:** The static STI Profiles page contradicted the calculator and itself in several spots

### Fixes

1. **Gonorrhea rates** — the STI Profiles card showed **22.8% (both directions)** derived from `gonorrhea_ncbi_book` (2× chlamydia), while the calculator (`STI_DATA`) uses the direct per-act measurements from Kirkcaldy et al. 2019 (`gonorrhea_kirkcaldy_2019`): **50% M→F, 20% F→M**. Repointed the card to Kirkcaldy so the page and calculator agree, and updated the rate note. (`gonorrhea_ncbi_book` remains in `sources.js` as the per-partnership/relation source.)
2. **Hero stat** — "20 Studies Cited" was stale (there are 50 sources in `sources.js`). Updated to "50 Sources Cited" and fixed broken indentation on that stat card.
3. **Methodology worked example** — used 12.5% for chlamydia while the site's rate is 11.4%. Updated the example to `calculateCumulativeRisk(0.114, 8)` → 0.620 (62.0%).

No source quotes changed; `node test-sources.js` and `node test-consistency.js` still pass.

---

## Pending Investigations

*Add items here when you notice potential data issues that need research:*

- [ ] (none currently)

---

## Change Log

| Date | STI | Change | Reason |
|------|-----|--------|--------|
| 2026-01-20 | HSV-2 | Changed per-act rate from 2.85% to 0.053% | Was using shedding-only rate; now using overall average derived from Corey 2004 |
| 2026-01-20 | N/A | Restored text fragments in citation URLs | Repository policy requires `#:~:text=` on all citation URLs |
| 2026-07-03 | Chlamydia | Replaced dead `yths.fi` asymptomatic source with ECDC factsheet | Finnish site reorganized; ECDC states same fact verbatim and is higher-authority |
| 2026-07-03 | HPV | Marked Contemporary OB/GYN source `manuallyVerified` | Site returns HTTP 403 to bots; quote confirmed live on page |

