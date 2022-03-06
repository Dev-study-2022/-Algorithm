// 대부분의 테케에서 터짐
// 제한사항 안 보고 품..
function solution(n, left, right) {
    const arr = Array.from(Array(n), () => Array(n).fill(0));
    const answer = [];
    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= i; j++) {
            arr[i][j] = i + 1;
        }
        for(let j = i + 1; j < n; j++) {
            arr[i][j] = j + 1;
        }
    }
    return answer.concat(...arr).slice(left, right + 1);
}

/*
    1. n의 최댓값이 워낙 크니 이중 반복문을 돌리는 것 자체가 무리라는 생각이 들었음
    2. 애초에 2차원이 아닌 1차원 배열을 만들고 left ~ right까지만 만들도록 함
    3. 규칙을 찾아서 반복문 한 개만 사용해서 값 구함 => 사진 추가해둠
*/
function solution(n, left, right) {
    const answer = [];
    for(let k = left; k <= right; k++) {
        const row = Math.floor(k / n);
        const column = k % n;
        if(row >= column) {
            answer.push(row + 1);
        }
        else {
            answer.push(column + 1);
        }
    }
    return answer;
}