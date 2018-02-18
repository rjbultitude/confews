'use strict';

class StringUtilities {
    constructor(sr) {
        this.conjunctionsRegX = new RegExp('^[and|but|if|either|neither|nor|as|that|for]');
    }
    removeNonWordCharsFrmSrtEnd(str) {
        return str.replace(/$\W^\W/, '').toLowerCase();
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
            return str.replace(/\'|\"|\(|\)|breaking/g, '');
        });
        return this;
    }
    truncateStrArr() {
        this.strArr = this.strArr.map((str) => {
            const wordsCommaStop = this.strUtil.wordsUntilCommaStop(str);
            if (wordsCommaStop) {
                console.log('wordsCommaStop', wordsCommaStop);
                return wordsCommaStop;
            }
            return this.strUtil.firstThreeWords(str);
        });
        return this;
    }
    arrangeStrArr() {
        const newArr = [];
        this.strArr.forEach((str, i) => {
            if (this.strUtil.endsWithConjunction(str)) {
                newArr[0] = str;
            }
            newArr[i] = str;
        });
        this.strArr = newArr;
        return this;
    }
}

module.exports = {
    StringUtilities,
    StringArrayUtilities,
}