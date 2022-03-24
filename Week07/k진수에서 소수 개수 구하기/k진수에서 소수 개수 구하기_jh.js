// 소수 판별하는 함수
const isPrime = (n) => {
    for(let i = 2; i <= Math.sqrt(n); i++) {
        // 처음에 i를 2로 써놓고 왜 틀리지..?잉잉..함..ㅋ
        if(n % i === 0) {
            return false;
        }
    }
    return true;
}

const solution = (n, k) => {
    // 나머지를 담을 배열
    const remainArr = [];
    // 숫자 담을 배열
    let numberArr;
    let answer = 0;
    // n을 k진수로 바꿔줌
    while(n > 0) {
        // 추후 split 사용하기 위해 나머지는 문자열로 넣어줌
        remainArr.unshift((n % k).toString());
        n = Math.floor(n / k);
    }
    // remainArr을 하나의 문자열로 만든 상태에서 연속으로 있는 0을 기준으로 문자열 자름
    numberArr = [...remainArr.join("").split(/0{1,}/g)];
    
    numberArr.forEach(x => {
        const num = parseInt(x);
        // num이 1보다 크고 소수일 때 answer 증가
        if(num > 1 && isPrime(num)) {
            answer++;
        }
    })

    return answer;
}