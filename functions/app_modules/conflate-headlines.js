const wordHelpers = require('./string-classes');
const { StringUtilities } = wordHelpers;
const { StringArrayUtilities } = wordHelpers;

module.exports = function conflateHeadlines(headlines) {
    const strUtil = new StringUtilities();
    const sunSanit = strUtil.removeNonWordCharsFrmSrtEnd(headlines.sunHeadline);
    const strArrUtil = new StringArrayUtilities([sunSanit, headlines.starHeadline, headlines.guardianHeadline]);
    const allSanit = strArrUtil.sanitiseStrArr().truncateStrArr().arrangeStrArr().strArr.join(' ');
    const capFirst = strUtil.capitaliseFirstLetter(allSanit);
    return capFirst;
}