'use strict';

// Blacklist
const blacklist = [
  'terror',
  'terrorist',
  'terrorism',
  'rape',
  'raped',
  'suicide',
  'bomb',
  'bomber',
  'shot',
  'shoot',
  'shooting',
  'child abuse'
];

class StringUtilities {
  constructor(sr) {
      this.conjunctionsRegX = new RegExp('^[and|but|if|either|neither|nor|as|that|for]');
  }
  hasBlacklistWords(str) {
    for (let index = 0; index < blacklist.length; index++) {
      if (str.indexOf(blacklist[index]) >= 0) {
        return true;
      }
    }
    return false;
  }
  removeNonWordCharsFrmSrtEnd(str) {
    if (str) {
      return str.replace(/$\W^\W/, '').toLowerCase();
    } else {
      console.warn('removeNonWordCharsFrmSrtEnd - no string');
      return '';
    }
  }
  endsWithConjunction(str) {
    return str.match(this.conjunctionsRegX);
  }
  removeConjunction(str) {
    return str.replace(this.conjunctionsRegX);
  }
  wordsUntilCommaStop(str) {
    const stringWithCommaStop = str.split(/[,|.]/);
    if (stringWithCommaStop.length > 1) {
      return stringWithCommaStop[0];
    }
    return false;
  }
  firstThreeWords(str) {
    return str.split(' ').slice(0, 3).join(' ');
  }
  capitaliseFirstLetter(str) {
    const strArr = str.split('');
    const newStrArr = strArr.map((letter, i) => {
      if (i === 0) {
        console.log(letter.toUpperCase());
        return letter.toUpperCase();
      }
      return letter;
    });
    return newStrArr.join('');
  }
}

class StringArrayUtilities {
  constructor(strArr) {
    this.strArr = strArr;
    this.strUtil = new StringUtilities;
  }
  sanitiseStrArr() {
    this.strArr = this.strArr.map((str) => {
        return str.replace(/\'|\"|\(|\)|\:|breaking|BREAKING/g, '');
    });
    return this;
  }
  truncateStrArr() {
    this.strArr = this.strArr.map((str) => {
        const wordsCommaStop = this.strUtil.wordsUntilCommaStop(str);
        if (wordsCommaStop) {
            return wordsCommaStop;
        }
        return this.strUtil.firstThreeWords(str);
    });
    return this;
  }
  arrangeStrArr() {
    const newArr = [];
    this.strArr.forEach((str, i, strArr) => {
        if (this.strUtil.endsWithConjunction(str)) {
            let theSlice = strArr[i];
            newArr.unshift(theSlice);
        } else {
            newArr.push(str);
        }
    });
    this.strArr = newArr.map((str) => str);
    console.log('this.strArr', this.strArr);
    return this;
  }
}

module.exports = {
    StringUtilities,
    StringArrayUtilities,
}
