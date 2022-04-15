const convertBinaryNumber = (number) => {
    const quotArr = [];
    while(number > 0) {
        quotArr.unshift(number % 2);
        number = Math.floor(number / 2);
    }
    return quotArr.join("");
}
const solution = (s) => {
    let convertCnt = 0, deleteCnt = 0;
    let cnt = 3;
    while(s !== "1") {
        let beforeLength = s.length;
        s = s.replace(/0/g, "");
        deleteCnt += beforeLength - s.length;
        s = convertBinaryNumber(s.length);
        convertCnt++;
    }
    return [convertCnt, deleteCnt];
}