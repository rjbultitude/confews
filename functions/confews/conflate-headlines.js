const wordHelpers = require('./string-classes');
const { StringUtilities } = wordHelpers;
const { StringArrayUtilities } = wordHelpers;
const strUtil = new StringUtilities();

function filterHeadlines(headlines) {
  // let newHeadlines = new Object();
  let newHeadlinesArr = [];
  const headlinesArr = Object.keys(headlines);
  for (const key of headlinesArr) {
    const val = headlines[key];
    console.log('val', val);
    console.log('key', key);
    if (val !== '' && strUtil.hasBlacklistWords(val) === false) {
      // Object.defineProperty(newHeadlines, key, {value: val, enumerable: true});
      newHeadlinesArr.push(val);
    }
  }
  return newHeadlinesArr;
}

module.exports = function conflateHeadlines(headlines) {
  console.log('headlines', headlines);
  const filteredHeadlines = filterHeadlines(headlines);
  console.log('filteredHeadlines', filteredHeadlines);
  const sunSanit = strUtil.removeNonWordCharsFrmSrtEnd(filteredHeadlines.sunHeadline);
  const strArrUtil = new StringArrayUtilities([sunSanit, ...filteredHeadlines]);
  const allSanit = strArrUtil.sanitiseStrArr().truncateStrArr().arrangeStrArr().strArr.join(' ');
  const capFirst = strUtil.capitaliseFirstLetter(allSanit);
  return capFirst;
}
