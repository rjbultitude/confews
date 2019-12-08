const strUtil = require('./string-utilities');

module.exports = class StringArrayUtilities {
  constructor(strArr) {
    this.strArr = strArr;
    this.finalStr = '';
  }
  sanitiseStrArr() {
    this.strArr = this.strArr.map((str) => {
        return str.replace(/\'|\"|\(|\)|\:|breaking|BREAKING/g, '');
    });
    return this;
  }
  truncateStrArr() {
    this.strArr = this.strArr.map((str) => {
        const wordsCommaStop = strUtil.wordsUntilBreak(str);
        if (wordsCommaStop) {
            return wordsCommaStop;
        }
        return strUtil.firstThreeWords(str);
    });
    return this;
  }
  rmNonWordCharsHeadlines() {
    this.strArr = this.strArr.map((headline) => {
      return strUtil.removeNonWordCharsFrmSrtEnd(headline);
    });
    return this;
  }
  arrangeStrArr() {
    const newArr = [];
    this.strArr.forEach((str, i, strArr) => {
        if (strUtil.endsWithConjunction(str)) {
            let theSlice = strArr[i];
            newArr.unshift(theSlice);
        } else {
            newArr.push(str);
        }
    });
    this.strArr = newArr.map((str) => str);
    return this;
  }
  joinStr() {
    this.finalStr = this.strArr.join(' ');
    return this;
  }
}
