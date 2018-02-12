'use strict';

module.exports = {
    str: '',
    conjunctionsRegX: new RegExp('^[and|but|if|either|neither|nor|as|that]'),
    truncateStrsArr: function truncateStrsArr(strsArr) {
        return strsArr.map((str) => {
            const wordsCommaStop = this.wordsUntilCommaStop(str);
            console.log('wordsCommaStop', wordsCommaStop);
            if (wordsCommaStop) {
                return wordsCommaStop;
            }
            return this.firstThreeWords(str);
        });
    },
    arrangeStrsArr: function arrangeStrsArr(strsArr) {
        return strsArr.map((str) => {
            if (this.endsWithConjunction(str)) {
                return str;
            }
            return str;
        });
    },
    sanitiseStrsArr: function sanitiseStrsArr(strsArr) {
        return strsArr.map((str) => {
            return str.replace(/\'|\"|\(|\)|breaking/g, '');
        });
    },
    removeNonWordCharsFrmSrtEnd: function removeNonWordCharsFrmSrtEnd(str) {
        const noPunctStartEnd = str.replace(/$\W^\W/, '');
        return str.toLowerCase();
    },
    endsWithConjunction: function endsWithConjunction(str) {
        return str.match(this.conjunctionsRegX);
    },
    removeConjunction: function removeConjunction(str) {
        return str.replace(this.conjunctionsRegX);
    },
    wordsUntilCommaStop: function wordsUntilCommaStop(str) {
        const stringWithCommaStop = str.split(/[,|.]/);
        if (stringWithCommaStop.length > 1) {
            return stringWithCommaStop[0];
        }
        return false;
    },
    firstThreeWords: function firstThreeWords(str) {
        return str.split(' ').slice(0, 3).join(' ');
    },
    capitaliseFirstLetter: function capitaliseFirstLetter(str) {
        const strArr = str.split('');
        const newStrArr = strArr.map((letter, i) => {
            if (i === 0) {
                console.log(letter.toUpperCase());
                return letter.toUpperCase();
            }
            return letter;
        });
        return newStrArr.join('');
    },
};
