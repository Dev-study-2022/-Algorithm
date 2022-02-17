// 에라토스테네스의 체 이론 적용
function solution(n) {
    // n + 1 길이만큼 배열 생성 => [0, 1, 2, 3, ..., n]
    // a[i] = i
    let arr = Array(n + 1).fill().map((x, index) => index);
    let result = 0;
    // i는 2부터 확인해서 i의 배수들은 0으로 변경
    for(let i = 2; i <= n; i++) {
        if(arr[i] === 0) {
            continue;
        }
        for(let j = i * 2; j <= n; j += i) {
            arr[j] = 0
        }
    }
    // 0이 아닌 놈들의 길이 -- 배열 생성할 때 0이 들어가서 1 빼줌
    result = arr.filter(x => x !== 0).length - 1;
    return result;
}