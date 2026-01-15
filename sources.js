/**
 * SOURCE DATABASE
 * 
 * Every number on this site must have a source with:
 * - url: Link to the source
 * - quote: Exact text from the source that supports the number
 * - verifiedDate: When we last ran the test suite and verified this quote exists
 * - type: 'webpage' | 'pdf' | 'abstract' (affects testability)
 * - isDerived: true if we calculated this from source data (not a direct quote)
 * - derivation: (if isDerived) explanation of how we got the number from the source
 * 
 * IMPORTANT: Run `node test-sources.js` periodically to verify links still work
 * and quotes still exist on the pages.
 */

const SOURCES = {
    // ===========================================
    // HIV SOURCES - VERIFIED ✓
    // ===========================================
    
    hiv_cdc_risk_estimates: {
        id: 'hiv_cdc_risk_estimates',
        name: 'CDC HIV Risk and Prevention Estimates',
        url: 'https://www.cdc.gov/hivpartners/php/riskandprevention/index.html',
        // Each part separated by ... must exist on the page
        quote: 'Risk per 10,000 exposures ... Receptive penile-vaginal intercourse ... 8 ... Insertive penile-vaginal intercourse ... 4',
        verifiedDate: '2025-01-14',
        type: 'webpage',
        notes: 'VERIFIED ✓ - From the Sexual transmission risk table on the CDC page.'
    }
    
    // ===========================================
    // ALL OTHER SOURCES REMOVED
    // They were not verified and contained incorrect data.
    // Sources will be added back one-by-one as they are properly verified.
    // ===========================================
};

// Export for use in browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SOURCES };
} else {
    window.SOURCES = SOURCES;
}
