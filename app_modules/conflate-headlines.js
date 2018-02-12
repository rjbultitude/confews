const wordHelpers = require('./string-utilities');

module.exports = function conflateHeadlines(headlines) {
    const sunSanit = wordHelpers.removeNonWordCharsFrmSrtEnd(headlines.sunHeadline);
    const allSanit = wordHelpers.sanitiseStrsArr([sunSanit, headlines.starHeadline, headlines.guardianHeadline]);
    const allTrunc = wordHelpers.truncateStrsArr(allSanit);
    const orderedStr = wordHelpers.arrangeStrsArr(allTrunc).join(' ');
    const capFirst = wordHelpers.capitaliseFirstLetter(orderedStr);
    return capFirst;
}