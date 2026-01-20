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

## Pending Investigations

*Add items here when you notice potential data issues that need research:*

- [ ] (none currently)

---

## Change Log

| Date | STI | Change | Reason |
|------|-----|--------|--------|
| 2026-01-20 | HSV-2 | Changed per-act rate from 2.85% to 0.053% | Was using shedding-only rate; now using overall average derived from Corey 2004 |

