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
  'child abuse',
  'cancer-stricken'
];

const conjunctionsRegX = new RegExp('^[and|but|if|either|neither|nor|as|that|for|yet|so|before|after|although|because]');

function hasBlacklistWords(str) {
  for (let index = 0; index < blacklist.length; index++) {
    if (str.indexOf(blacklist[index]) >= 0) {
    return true;
    }
  }
  return false;
}

function removeNonWordCharsFrmSrtEnd(str) {
  if (str) {
    return str.replace(/$\W^\W/, '').toLowerCase();
  } else {
    console.warn('removeNonWordCharsFrmSrtEnd - no string arg');
    return '';
  }
}

function endsWithConjunction(str) {
  const strAsArr = str.split(' ');
  const lastItem = strAsArr[strAsArr.length - 1];
  return conjunctionsRegX.test(lastItem);
}

function wordsUntilBreak(str) {
  const stringWithBreak = str.split(/[,|.|:|;]/);
  if (stringWithBreak.length > 1) {
      return stringWithBreak[0];
  }
  return false;
}

function firstThreeWords(str) {
  return str.split(' ').slice(0, 3).join(' ');
}

function capitaliseFirstLetter(str) {
  const strArr = str.split('');
  const newStrArr = strArr.map((letter, i) => {
    if (i === 0) {
    return letter.toUpperCase();
    }
    return letter;
  });
  return newStrArr.join('');
}

function rmConjunctionFromEnd(str) {
  if (typeof str !== 'string') {
    console.log('str arg is not a string');
    throw TypeError;
  }
  const sentenceArr = str.split(' ');
  const lastItem = sentenceArr[sentenceArr.length - 1];
  if (endsWithConjunction(lastItem)) {
    sentenceArr.pop();
  }
  return sentenceArr.join(' ');
}

module.exports = {
  hasBlacklistWords,
  removeNonWordCharsFrmSrtEnd,
  endsWithConjunction,
  wordsUntilBreak,
  firstThreeWords,
  capitaliseFirstLetter,
  rmConjunctionFromEnd,
}
