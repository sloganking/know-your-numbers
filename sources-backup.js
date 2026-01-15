/**
 * BACKUP/ALTERNATIVE SOURCES DATABASE
 * 
 * This file contains verified sources that we're not currently using on the website,
 * but which provide corroborating data or serve as backups if primary sources break.
 * 
 * These sources are still verified by the test suite to ensure quotes remain accurate.
 * 
 * Run `node test-sources.js --include-backup` to test these sources as well.
 */

const BACKUP_SOURCES = {
    // ===========================================
    // CORROBORATING / ALTERNATIVE SOURCES
    // ===========================================
    
    // Currently empty - we'll add sources here when we find alternatives
    // that we don't want to use as primary but want to keep for reference
    
    // EXAMPLE STRUCTURE:
    // hiv_alternative_study: {
    //     id: 'hiv_alternative_study',
    //     name: 'Alternative Study Name',
    //     url: 'https://example.com',
    //     quote: 'Exact quote from the source',
    //     verifiedDate: '2025-01-14',
    //     type: 'abstract',
    //     primarySourceId: 'hiv_cdc_risk_estimates', // Which primary source this backs up
    //     notes: 'Why this is a backup rather than primary'
    // }
};

// Export for use in browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BACKUP_SOURCES };
} else {
    window.BACKUP_SOURCES = BACKUP_SOURCES;
}
