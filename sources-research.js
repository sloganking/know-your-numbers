/**
 * RESEARCH SOURCES - UNVERIFIED
 * 
 * These are potential sources from ChatGPT Deep Research (January 2026)
 * They need to be verified before adding to sources.js
 * 
 * STATUS KEY:
 * - 🔴 UNVERIFIED: Not yet tested
 * - 🟡 TESTING: Being verified
 * - 🟢 VERIFIED: Passed test, ready to add to sources.js
 * - ⚫ REJECTED: Quote not found or source invalid
 * - ⏭️ DUPLICATE: Already have this in sources.js
 * - ⏸️ LOW PRIORITY: Nice to have but not critical
 */

const RESEARCH_SOURCES = {
    // ===========================================
    // HIV - NEW SOURCES TO VERIFY
    // ===========================================
    
    // ⏭️ DUPLICATE - We already have this (hiv_boily_2009_meta)
    hiv_pmc_2014_per_act: {
        status: '⏭️ DUPLICATE',
        notes: 'We already have this as hiv_boily_2009_meta with same data',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6195215/',
        quote: 'Risk for other sexual exposures were 4 (95% CI 1–14) for insertive penile–vaginal intercourse, 8 (95% CI 6–11) for receptive penile–vaginal intercourse, per 10,000 exposures.',
    },
    
    // 🔴 NEW - Could add for extra confirmation
    hiv_cdc_2021_mmwr: {
        status: '🔴 UNVERIFIED',
        priority: 'LOW',
        notes: 'Good backup source but we already have CDC data',
        url: 'https://www.cdc.gov/mmwr/volumes/70/rr/rr7004a1.htm',
        quote: 'In consensual sex, the per-act risk for HIV transmission from vaginal intercourse is 0.08%, and for receptive anal intercourse, 1.38%.',
    },
    
    // 🟢 VERIFIED - Added as hiv_prep_effectiveness (found on hivpartners page)
    hiv_prep_efficacy_cdc: {
        status: '🟢 VERIFIED',
        priority: 'HIGH',
        notes: 'ADDED - ~99% efficacy from CDC hivpartners page',
        url: 'https://www.cdc.gov/hivpartners/php/riskandprevention/index.html',
        quote: 'the risk of acquiring HIV is reduced by about 99% among MSM',
    },
    
    // 🔴 NEW - MEDIUM PRIORITY - PEP effectiveness
    hiv_pep_cdc: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'Emergency prevention info - old URL redirects',
        url: 'https://www.cdc.gov/hiv/basics/pep/about-pep.html',
        quote: 'PEP… can prevent HIV infection when started within 72 hours after a possible exposure.',
    },
    
    // 🟢 VERIFIED - Added as hiv_viral_suppression (found on hivpartners page)
    hiv_undetectable_cdc: {
        status: '🟢 VERIFIED',
        priority: 'HIGH',
        notes: 'ADDED - U=U 100% effectiveness from CDC hivpartners page',
        url: 'https://www.cdc.gov/hivpartners/php/riskandprevention/index.html',
        quote: 'no risk of sexual transmission. This translates to an effectiveness estimate of 100%',
    },
    
    // ===========================================
    // HSV-2 - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🟢 VERIFIED - Added to sources.js as hsv2_magaret_2016
    hsv2_magaret_2016_per_act: {
        status: '🟢 VERIFIED',
        priority: 'HIGH',
        notes: 'ADDED - Direct M→F per-act rate: 2.85%',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26578538/',
        quote: 'The highest rate of transmission was from men to women: 28.5 transmissions per 1000 unprotected sex acts. We found that condoms were differentially protective against HSV-2 transmission by sex; condom use reduced per-act risk of transmission from men to women by 96% ... and marginally from women to men by 65%',
        derivation: 'M→F = 28.5/1000 = 2.85% per act',
    },
    
    // ⏭️ DUPLICATE - We already have this (hsv2_corey_2004)
    hsv2_corey_nejm_2004: {
        status: '⏭️ DUPLICATE',
        notes: 'We already have this as hsv2_corey_2004',
        url: 'https://pubmed.ncbi.nlm.nih.gov/14702423/',
        quote: 'Overall, acquisition of HSV-2 was observed in 14 of the susceptible partners who received valacyclovir (1.9 percent), as compared with 27 (3.6 percent) who received placebo (hazard ratio, 0.52… P=0.04).',
    },
    
    // 🟢 VERIFIED - Added to sources.js as hsv2_cdc_asymptomatic
    hsv2_cdc_asymptomatic: {
        status: '🟢 VERIFIED',
        priority: 'MEDIUM',
        notes: 'ADDED - Most herpes transmitted while asymptomatic',
        url: 'https://www.cdc.gov/std/treatment-guidelines/herpes.htm',
        quote: 'The majority of persons infected with HSV-2 have not had the condition diagnosed, many of whom have mild or unrecognized infections but shed virus intermittently in the anogenital area. Consequently, most genital herpes infections are transmitted by persons unaware that they have the infection or who are asymptomatic when transmission occurs.',
    },
    
    // ===========================================
    // HPV - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🔴 NEW - MEDIUM - High per-act rate claim (40%!)
    hpv_obgyn_per_act: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'Claims 40% per-act - much higher than our HITCH data!',
        url: 'https://www.contemporaryobgyn.net/view/hpv-answering-your-worried-patientss-questions',
        quote: 'HPV transmissibility is comparable to bacterial rather than viral STIs… the rate of HPV per‑act transmission probability is much higher than HIV or HSV-2, both of which carry a probability of one in 1,000 acts. The median per‑act transmissibility of HPV… is 40% per coital act. Moreover, the likelihood of male-to-female transmission reaches 100% with only 11 sexual encounters.',
    },
    
    // 🔴 NEW - LOW - Vaccine efficacy
    hpv_vaccine_cdc: {
        status: '🔴 UNVERIFIED',
        priority: 'LOW',
        notes: 'Good context for profiles',
        url: 'https://www.cdc.gov/hpv/parents/vaccine.html',
        quote: 'All three vaccines include HPV genotypes 16 and 18, which account for about 70% of cervical cancer cases worldwide… The nonavalent (9-valent) vaccine covers five additional high-risk types and prevents about 90% of cervical cancers.',
    },
    
    // ===========================================
    // CHLAMYDIA - NEW SOURCES TO VERIFY
    // ===========================================
    
    // ⏭️ DUPLICATE - We already have this (chlamydia_ncbi_per_act)
    chlamydia_ncbi_book_9_5: {
        status: '⏭️ DUPLICATE',
        notes: 'We already have NCBI book source',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK261441/',
        quote: 'We… found that the transmission probability per episode of heterosexual intercourse is 9.5% (IQR 6.0–16.7%).',
    },
    
    // 🔴 NEW - LOW - Gender differences context
    chlamydia_std_uw_gender: {
        status: '🔴 UNVERIFIED',
        priority: 'LOW',
        notes: 'Context only - no hard numbers',
        url: 'https://www.std.uw.edu',
        quote: 'Chlamydia trachomatis is highly transmissible via sexual contact… Sexual transmission rates per sex act are thought to be slightly higher from men to women than from women to men, but given the number of asymptomatic carriers… estimates remain imprecise.',
    },
    
    // 🟢 VERIFIED - Added to sources.js as chlamydia_asymptomatic
    chlamydia_asymptomatic: {
        status: '🟢 VERIFIED',
        priority: 'MEDIUM',
        notes: 'ADDED - 50% men, 70% women asymptomatic',
        url: 'https://www.yths.fi/en/health-information-resource/chlamydia/',
        quote: 'Chlamydia is often symptomless: about 50% of men and 70% of women have no symptoms.',
    },
    
    // ===========================================
    // GONORRHEA - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🟢 VERIFIED - Added to sources.js as gonorrhea_kirkcaldy_2019
    gonorrhea_kirkcaldy_2019: {
        status: '🟢 VERIFIED',
        priority: 'HIGH',
        notes: 'ADDED - Direct per-act rates: M→F 50%, F→M 20%',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7064409/',
        quote: 'N. gonorrhoeae is fairly easily transmitted: the estimated probability of penile-to-vaginal transmission is approximately 50% per sex act, and of vaginal-to-penile transmission is approximately 20% per act.',
    },
    
    // 🟢 VERIFIED - Added as gonorrhea_resistance
    gonorrhea_resistance_2019: {
        status: '🟢 VERIFIED',
        priority: 'LOW',
        notes: 'ADDED - Antibiotic resistance concern',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7064409/',
        quote: 'successively acquired antimicrobial resistance to each antimicrobial agent used and recommended for treatment ... The confluence of emerging resistance to cephalosporins and macrolides',
    },
    
    // ===========================================
    // SYPHILIS - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🔴 NEW - MEDIUM - More specific rate (26-30%)
    syphilis_per_act_refined: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'More specific than our >20% - gives 26-30% range',
        url: null,  // Deep Research compiled from multiple sources
        quote: 'The probability of transmission per sexual contact in early syphilis is estimated at 26–30%. This drops near zero in late latent syphilis.',
        warning: 'NO SINGLE SOURCE - compiled from WHO/medical texts',
    },
    
    // 🔴 NEW - LOW - Resurgence stats (context)
    syphilis_resurgence_2023: {
        status: '🔴 UNVERIFIED',
        priority: 'LOW',
        notes: 'Good context but not for calculator',
        url: 'https://pmc.gov',  // Incomplete URL
        quote: 'Primary and secondary syphilis rates increased from 2.1 per 100,000 in 2001 to 17.6 per 100,000 in 2021...',
    },
    
    // ===========================================
    // HEPATITIS B - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🔴 NEW - MEDIUM - Per-act transmission estimate
    hepb_per_act: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'Deep Research compiled estimate - needs verification',
        url: null,  // Compiled from Pink Book / OSHA
        quote: 'The risk of HBV transmission through sexual contact is significant: estimates suggest 20-30% risk of transmission to susceptible partners over the course of a relationship, though per-act risk is lower than for HBV blood exposures.',
        warning: 'NO SINGLE SOURCE - needs primary source',
    },
    
    // 🔴 NEW - MEDIUM - Symptom rate
    hepb_symptom_rate_cdc: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'We show 50% asymptomatic but need source',
        url: 'https://www.cdc.gov/hepatitis/hbv/bfaq.htm',
        quote: 'Children <10% symptomatic. Approximately 30–50% of adults with acute HBV will show symptoms.',
    },
    
    // 🔴 NEW - MEDIUM - Chronic prevalence US
    hepb_chronic_us_hhs: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'For quick facts',
        url: 'https://www.hhs.gov/hepatitis/learn-about-viral-hepatitis/hepatitis-b-basics/index.html',
        quote: 'In the United States, an estimated 880,000 to 1.89 million people are chronically infected with HBV.',
    },
    
    // 🔴 NEW - MEDIUM - Chronic progression by age
    hepb_chronic_by_age_cdc: {
        status: '🔴 UNVERIFIED',
        priority: 'MEDIUM',
        notes: 'Important - explains why adults rarely get chronic',
        url: 'https://www.cdc.gov/hepatitis/hbv/hbvfaq.htm',
        quote: 'Risk for chronic infection is related to age at infection: approximately 90% of infected infants become chronically infected, compared with 2–6% of adults.',
    },
    
    // ===========================================
    // TRICHOMONIASIS - NEW SOURCES TO VERIFY
    // ===========================================
    
    // 🟢 VERIFIED - Added to sources.js as trich_hiv_risk
    trich_hiv_risk_cdc: {
        status: '🟢 VERIFIED',
        priority: 'MEDIUM',
        notes: 'ADDED - 1.5x HIV acquisition risk',
        url: 'https://www.cdc.gov/std/treatment-guidelines/trichomoniasis.htm',
        quote: 'T. vaginalis infection is associated with a 1.5-fold increased risk for HIV acquisition and is associated with an increase in HIV vaginal shedding, which is reduced with T. vaginalis treatment.',
    },
    
    // 🔴 NEW - LOW - Treatment cure rate
    trich_treatment_cure: {
        status: '🔴 UNVERIFIED',
        priority: 'LOW',
        notes: 'Nice to have for profiles',
        url: 'https://emedicine.medscape.com/article/230617-treatment',
        quote: 'With recommended dosages, the expected cure rate of trichomoniasis is 95%.',
    },
};

// Export for reference
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RESEARCH_SOURCES };
}
