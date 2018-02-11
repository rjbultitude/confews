module.exports = {
    conjunctionsRegX: new RegExp('^[and|but|if|either|neither|nor|as|that]'),
    sanitiseSun: function sanitiseSun(sunHeadline) {
        const noPunctStartEnd = sunHeadline.replace(/$\W^\W/, '');
        return sunHeadline.toLowerCase();
    },
    sanitiseHeadlines: function sanitiseHeadlines(headlines) {
        return headlines.map((headline) => {
            return headline.replace(/\'|\"|\(|\)|breaking/g, '');
        });
    },
    endsWithConjunction: function endsWithConjunction(str) {
        return str.match(this.conjunctionsRegX);
    },
    removeConjunction: function removeConjunction(str) {
        return str.replace(this.conjunctionsRegX);
    },
    wordsUntilCommaStop: function wordsUntilCommaStop(str) {
        const stringWithCommaStop = str.split(',|.')[0];
        if (stringWithCommaStop.length > 1) {
            return stringWithCommaStop;
        }
        return false;
    },
    firstThreeWords: function firstThreeWords(str) {
        return str.split(' ').slice(0, 3).join(' ');
    },
    truncateStrings: function truncateStrings(strs) {
        return strs.map((str) => {
            const wordsCommaStop = this.wordsUntilCommaStop(str);
            console.log('wordsCommaStop', wordsCommaStop);
            if (wordsCommaStop) {
                return wordsCommaStop;
            }
            return firstThreeWords(str);
        });
    },
    arrangeStrs: function arrangeStrs(strArr) {
        return strArr.map((str) => {
            if (endsWithConjunction(str)) {
                return str;
            }
            return str;
        });
    },
};
