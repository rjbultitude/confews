const StringArrayUtilities = require('./string-array-utilities');
const strUtil = require('./string-utilities');

function filterHeadlines(headlines) {
  // let newHeadlines = new Object();
  let newHeadlinesArr = [];
  const headlinesArr = Object.keys(headlines);
  for (const key of headlinesArr) {
    const val = headlines[key];
    if (val !== '' && strUtil.hasBlacklistWords(val) === false) {
      // Object.defineProperty(newHeadlines, key, {value: val, enumerable: true});
      newHeadlinesArr.push(val);
    }
  }
  return newHeadlinesArr;
}

module.exports = function conflateHeadlines(headlines) {
  console.log('headlines', headlines);
  // Converting from Object to Array
  // Removing empty or offensive headlines
  const filteredHeadlines = filterHeadlines(headlines);
  const strArrUtil = new StringArrayUtilities([...filteredHeadlines]);
  const nHeadline = strArrUtil
    .rmNonWordCharsHeadlines()
    .sanitiseStrArr()
    .truncateStrArr()
    .arrangeStrArr()
    .joinStr()
    .finalStr;
  const nHeadlineNoConjEnd = strUtil.rmConjunctionFromEnd(nHeadline);
  const capFirst = strUtil.capitaliseFirstLetter(nHeadlineNoConjEnd);
  return capFirst;
}
