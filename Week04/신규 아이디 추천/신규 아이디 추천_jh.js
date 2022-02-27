function solution(new_id) {
    let answer = new_id.toLowerCase() // 소문자로 변환
                 .replace(/[^a-z0-9-_.]/g, "") // 알파벳 소문자, 숫자 -, _, . 빼고 다 제거 
                 .replace(/\.{2,}/g, ".") // .이 2번 이상 나오면 . 하나로 바꿈
                 .replace(/^\.|\.$/, "") // .처음이나 끝에 있으면 제거
                 .replace(/^$/, "a") // 공백이면 "a" 넣음
                 .substr(0, 15) // 0~15까지 자름 
                 .replace(/\.$/, ""); // . 끝에 있으면 제거
    let length = answer.length;
    // answer 길이가 2자 이하면 answer 길이가 3자 될 때까지 마지막 문자 반복
    answer += length <= 2 ? answer[length - 1].repeat(3 - length) : "";
    return answer;
}