function solution(s) {
    // key: 숫자 영단어, value: 숫자를 가지는 객체 생성
    const number = { "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9};
    // s에 key가 포함되어 있으면 key는 value로 변경
    for(const key in number) {
        // 변수를 정규식 조건에 넣기 위해서 RegExp 객체 생성
        const condition = new RegExp(key, "g");
        // 영단어가 포함되어 있으면 숫자로 변경
        s = s.replace(condition, number[key]);
    }
    return Number(s);
}

// 다른 사람 풀이 (아주 신박..)
function solution(s) {
    // 객체가 아닌 배열을 만듬, numbers[i] = i 영단어
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var answer = s;
    for(let i=0; i< numbers.length; i++) {
        // 현재 영단어를 기준으로 문자열을 쪼갠 뒤 현재 숫자로 또 문자열을 합쳐줌
        // one3seven => ["", "3seven"] => "13seven"
        let arr = answer.split(numbers[i]);
        answer = arr.join(i);
    }

    return Number(answer);
}