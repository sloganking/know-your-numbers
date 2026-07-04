# Index — Know Your Numbers

The navigation layer for this repo: what's here, which STIs are covered, and every source cited (what it establishes, and whether it's a per-act rate, per-partnership rate, or something else). Start here when maintaining or auditing the project. For the rules that govern content, see [`.cursorrules`](.cursorrules); for how to work in the repo, see [`AGENTS.md`](AGENTS.md); for data-interpretation history, see [`corrections.md`](corrections.md).

> **Keep this current.** When you add/remove/repoint a source or add an STI, update the relevant table here in the same change.

---

## File map

| File | What it is |
|------|-----------|
| `index.html` | The page — hero, mission, calculator UI, STI data cards, methodology sections. |
| `app.js` | Calculator logic, chart rendering, citation/derivation display, `STI_DATA` (the per-act rates the calculator uses), and the data-quality validation layer. |
| `sources.js` | **The source database** — each source's verbatim quote, `#:~:text=` link, and derivation. The heart of the project. |
| `sources-backup.js` | Verified corroborating/backup sources not displayed on the site. |
| `sources-research.js` | Working notes / staging for sources under research (not loaded by the site). |
| `test-sources.js` | **Citation verification** — checks every quote still exists on its page. `node test-sources.js` (add `--include-backup`). |
| `test-consistency.js` | Consistency check across `STI_DATA` (runs the validation layer in `app.js`). `node test-consistency.js`. |
| `corrections.md` | **Methodology corrections log** — data issues found and resolved, plus dead-link repairs. |
| `ambiguity.md` | Notes on ambiguous/underspecified data. |
| `preventatives-to-research.md` | Backlog of preventatives/topics to add. |
| `styles.css` | Styling. |
| `.cursorrules` | **The citation law.** Governs everything. |
| `AGENTS.md` | How to maintain the repo (schema + workflows + changelog). |
| `index.md` | This file — content index / navigation layer. |
| `README.md` | Public-facing project description. |

---

## STI catalog (in the calculator)

Six STIs are live in the calculator (`STI_DATA` in `app.js`), all `verified: true`. Per-act rates are directional: **M→F** (male-to-female) and **F→M** (female-to-male).

| STI | Rate basis | M→F per act | F→M per act | Data quality | Primary rate source | Condom eff. | Preventatives modeled |
|-----|-----------|-------------|-------------|--------------|---------------------|-------------|-----------------------|
| **HIV** | Direct per-act | 0.08% | 0.04% | direct | `hiv_cdc_risk_estimates` | 80% | Daily PrEP (~99%), ART/U=U (100%), Apretude/cabotegravir, Sunlenca/lenacapavir |
| **Herpes (HSV-2)** | Derived per-act (from Corey 2004, 3.6% over 8 mo) | 0.053% | 0.053% | M→F direct; **F→M inferred** (uses M→F) | `hsv2_per_act_derived` | 96% M→F / 65% F→M | Daily valacyclovir (~47%) |
| **HPV** | Derived per-act (from person-month incidence) | 0.41% | 0.66% | direct | `hpv_hitch_2021` | 70% | HPV vaccine / Gardasil 9 (88%) |
| **Chlamydia** | Per-act range 6–16.7%, midpoint | 11.4% | 11.4% | **undifferentiated** (no direction split) | `chlamydia_ncbi_per_act` | 60% | DoxyPEP (~88%, MSM/TGW) |
| **Gonorrhea** | Direct per-act | 50% | 20% | direct | `gonorrhea_kirkcaldy_2019` | 90% | DoxyPEP (~55%, MSM/TGW) |
| **Syphilis** | Per-act >20% (early syphilis) | 20% | 20% | **undifferentiated** (no direction split) | `syphilis_ashm_per_act` | 60.5% | DoxyPEP (~87%, MSM/TGW) |

**Data-quality flags** (surfaced in the UI with a ⚠ badge): `direct` = source measured this direction; `undifferentiated` = source gives one number applied to both directions; `inferred` = no data for that direction, opposite direction used as estimate.

### Sourced but not yet in the calculator

These have verified sources in `sources.js` but no `STI_DATA` entry (candidates for future calculator STIs): **Hepatitis B** (chronic-by-age, condom, vaccine), **Hepatitis C** (sexual transmission negligible), **Trichomoniasis** (per-act unquantified, prevalence, condom, HIV-risk).

---

## Source catalog

Every source in `sources.js` (50) and `sources-backup.js` (1). "Basis" = what kind of number it establishes. "Verify" = **auto** (fetched and checked by `test-sources.js`) or **manual** (`manuallyVerified: true` — site blocks bots, table data, or otherwise not auto-fetchable; quote confirmed by a human/crawler).

### HIV
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `hiv_cdc_risk_estimates` | CDC HIV Risk and Prevention Estimates | Per-act (8 / 4 per 10,000 exposures) — **calculator rate** | auto |
| `hiv_boily_2009_meta` | Boily et al. 2009 (Lancet) | Per-act meta-analysis (0.08% / 0.04%) — corroborates CDC | auto |
| `hiv_prep_effectiveness` | CDC — PrEP Effectiveness | Preventative effectiveness (~99%) | auto |
| `hiv_viral_suppression` | CDC — Viral Suppression (U=U) | Preventative effectiveness (100%) | auto |
| `hiv_condom_effectiveness` | CDC — Condom Effectiveness for HIV | Condom effectiveness (80%) | auto |
| `hiv_window_period_cdc` | CDC — HIV Testing Window Periods | Testing window (10–90 days by test) | auto |

### Herpes (HSV-2)
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `hsv2_per_act_derived` | HSV-2 Per-Act Rate (derived from Corey 2004) | Derived per-act (0.053%) — **calculator rate** | auto |
| `hsv2_corey_2004` | Corey et al. 2004 (NEJM) | Per-partnership (3.6% over 8 mo) + valacyclovir ~47% reduction | auto |
| `hsv2_magaret_2016` | Magaret et al. 2016 (Clin Infect Dis) | Per-act **during shedding only** (2.85%) — NOT used as overall rate (see `corrections.md`) | auto |
| `hsv2_condom_effectiveness` | Martin et al. 2009 | Condom effectiveness (96% M→F / 65% F→M), from Table 1 | manual (table data) |
| `hsv2_cdc_asymptomatic` | CDC STD Treatment Guidelines — Herpes | Asymptomatic/transmission context | auto |
| `hsv_window_cdc` | CDC — Herpes Testing | Testing window (up to 16 weeks, antibody) | auto |
| `hsv_no_routine_screening_cdc` | CDC — Herpes Screening | Not in routine STI panels | auto |

### HPV
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `hpv_hitch_2021` | Malagón et al. 2021 (HITCH cohort) | Per-month incidence → derived per-act (0.41% / 0.66%) — **calculator rate** | auto |
| `hpv_burchell_2013` | Burchell et al. 2013 | Per-month incidence (corroborating) | auto |
| `hpv_obgyn_high_estimate` | Contemporary OB/GYN | Per-act high estimate (40%, simulation) — **defined but not displayed**; kept as high-bound context | manual (HTTP 403 to bots) |
| `hpv_lifetime_chesson` | Chesson et al. 2014 | **Lifetime** probability (not per-act) | auto |
| `hpv_condom_effectiveness` | MDedge (condom HPV study) | Condom effectiveness (70%) | auto |
| `hpv_testing_cdc` | CDC — About Genital HPV | No general HPV status test | auto |
| `hpv_vaccine_cdc_impact` | CDC — HPV Vaccination Impact | Vaccine effectiveness (88%) | manual |

### Chlamydia
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `chlamydia_ncbi_per_act` | NCBI Book NBK261441 | Per-act (6–16.7%) — **calculator rate** | auto |
| `chlamydia_price_2021` | Price et al. 2021 (BMJ STI) | **Per-partnership** (not per-act) — do not use as per-act | auto |
| `chlamydia_asymptomatic` | ECDC — Chlamydia Factsheet | Asymptomatic rate (≥70% women / 50% men) — *repointed from dead Finnish source 2026-07-03* | auto |
| `chlamydia_condom_effectiveness` | Crosby et al. 2004 (JAMA Pediatrics) | Condom effectiveness (60%) | manual (JAMA/Cloudflare) |
| `chlamydia_gonorrhea_window_nhs` | NHS Sexual Health Oxfordshire | Testing window (2 weeks) | auto |

### Gonorrhea
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `gonorrhea_kirkcaldy_2019` | Kirkcaldy et al. 2019 (Sex Health) | Direct per-act (50% / 20%) — **calculator rate** | auto |
| `gonorrhea_resistance` | Kirkcaldy et al. 2019 | Antibiotic resistance context | auto |
| `gonorrhea_ncbi_book` | NCBI Book NBK261441 | Per-partnership + per-act relation (2× chlamydia) | auto |
| `gonorrhea_condom_effectiveness` | Crosby et al. 2004 (JAMA Pediatrics) | Condom effectiveness (90%) | manual (JAMA/Cloudflare) |
| *(window)* | shares `chlamydia_gonorrhea_window_nhs` | Testing window (2 weeks) | auto |

### Syphilis
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `syphilis_ashm_per_act` | ASHM Contact Tracing Guidelines | Per-act (>20%, early syphilis) — **calculator rate** | auto |
| `syphilis_schober_1983` | Schober et al. 1983 | **Per-partnership** (not per-act) | auto |
| `syphilis_condom_effectiveness` | PMC review (PMC4660551) | Condom effectiveness (50–71%) | manual |
| `syphilis_window_nhs` | NHS Sexual Health Oxfordshire | Testing window (4 weeks) | auto |
| `syphilis_msm_per_act_pmc` *(backup)* | Gray et al. (cited in PMC5973824) | Per-act MSM anal/oral (0.5–1.4%) — backup context, not on site | auto (`--include-backup`) |

### Hepatitis B (not yet a calculator STI)
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `hepb_chronic_by_age` | CDC Hepatitis B Clinical Overview | Chronic-infection risk by age (90% infants / 5% adults) | auto |
| `hepb_condom_effectiveness` | PMC review (PMC4660551) | Condom effectiveness (>90%) | manual |
| `hepb_vaccine_who` | WHO — Hepatitis B | Vaccine effectiveness (98–100%) | manual |

### Hepatitis C (not yet a calculator STI)
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `hepc_sexual_negligible` | AIDSmap (2013) | Sexual transmission negligible (~0.07%/yr, 1 in 190,000 acts) | auto |

### Trichomoniasis (not yet a calculator STI)
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `trich_ashm_per_act` | ASHM Contact Tracing | Per-act **unquantified** (`value: null`) | auto |
| `trich_cdc_prevalence` | CDC STI Treatment Guidelines | US prevalence (2.1% F / 0.5% M) | auto |
| `trich_cdc_asymptomatic` | CDC STI Treatment Guidelines | Asymptomatic rate (70–85%) | auto |
| `trich_who_global` | WHO Fact Sheet | Global incidence (156M/yr) | auto |
| `trich_hiv_risk` | CDC STI Treatment Guidelines | HIV-acquisition risk (1.5×) | auto |
| `trich_condom_effectiveness` | PMC review (PMC4660551) | Condom effectiveness (~30%, controversial) | manual |
| `trich_ashm_testing` | ASHM Contact Tracing | No established window period; NAAT | auto |

### DoxyPEP (post-exposure prophylaxis — bacterial STIs)
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `doxypep_nejm_2023` | NEJM — DoxyPEP Trial (Luetkemeyer 2023) | Effectiveness (~66% overall; ~88% chlamydia, ~87% syphilis, ~55% gonorrhea) | manual |
| `doxypep_cdc_2024_recommendation` | CDC MMWR 2024 | Recommended population (MSM/TGW, STI in past 12 mo) | auto |
| `doxypep_cdc_2024_other_populations` | CDC MMWR 2024 | Limited data for other populations | auto |
| `doxypep_cdc_2024_ciswomen_trial` | CDC MMWR 2024 | No significant reduction in cisgender-women trial (adherence) | auto |

### Injectable HIV PrEP
| ID | Source | Basis | Verify |
|----|--------|-------|--------|
| `cabotegravir_hptn083` | NEJM — Cabotegravir HPTN 083 | Effectiveness vs oral PrEP (HR 0.34) | manual |
| `lenacapavir_purpose1` | NEJM — Lenacapavir PURPOSE 1 | Effectiveness (100% in women's trial) | manual |

---

## Measurement-basis legend

- **Per-act** — probability of transmission from a single sex act. This is what the calculator needs.
- **Per-partnership** — probability over an entire relationship. NOT interchangeable with per-act (`chlamydia_price_2021`, `syphilis_schober_1983`). See `corrections.md`.
- **Per-month / per-person-month incidence** — rate over time; converted to per-act only with an assumed act frequency (documented in the derivation).
- **Lifetime** — cumulative lifetime probability (`hpv_lifetime_chesson`).
- **Effectiveness** — relative risk reduction for a condom, vaccine, or medication.
- **Prevalence / incidence / window / recommendation** — supporting context, not transmission probabilities.
