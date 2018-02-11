const wordHelpers = require('./word-helpers');

module.exports = function conflateHeadlines(headlines) {
    const sunSanit = wordHelpers.sanitiseSun(headlines.sunHeadline);
    const allSanit = wordHelpers.sanitiseHeadlines([sunSanit, headlines.starHeadline, headlines.guardianHeadline]);
    const allTrunc = wordHelpers.truncateStrings(allSanit);
    const conflated = `${allTrunc[0]} ${allTrunc[1]} ${allTrunc[2]}`;
    return conflated;
}