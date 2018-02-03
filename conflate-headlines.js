function firstThree(str) {
    return str.split(' ').slice(0, 3).join(' ');
}

module.exports = function conflateHeadlines(str1, str2, str3) {
    const conflated = `${firstThree(str1)} ${firstThree(str2)} ${firstThree(str3)}`.toLowerCase();
    const noPunctuation = conflated.replace(/\'|\"|\(|\)|\‘/g, '');
    const noBreaking = noPunctuation.replace(/breaking/g, '');
    return noBreaking;
}