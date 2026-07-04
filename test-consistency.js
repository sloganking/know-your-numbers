/**
 * STI DATA CONSISTENCY TEST
 *
 * Usage: node test-consistency.js
 */

const { STI_DATA_VALIDATION } = require('./app.js');

const errors = STI_DATA_VALIDATION?.errors || [];
const warnings = STI_DATA_VALIDATION?.warnings || [];

console.log(`Consistency check: ${errors.length} error(s), ${warnings.length} warning(s).`);

if (warnings.length > 0) {
    console.warn('\nWarnings:');
    warnings.forEach(warning => console.warn(`- ${warning}`));
}

if (errors.length > 0) {
    console.error('\nErrors:');
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
}
