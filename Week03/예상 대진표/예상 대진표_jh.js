// 처음 풀이 - 몇몇 테케 틀림
// 틀린 케이스 (a=4, b=5)
const getNextNum = (x) => {
    const quot = Math.floor(x / 2);
    return x % 2 === 0 ? quot : quot + 1;
}

const solution = (n,a,b) => {
    let round = 1;
    
    while(Math.abs(a - b) !== 1) {
        a = getNextNum(a);
        b = getNextNum(b);
        round++;
    }

    return round;
}

// 두번째 풀이
const getQuat = (x) => {
    return Math.floor(x / 2);
}

const getNextNum = (x) => {
    const quot = getQuat(x);
    return x % 2 === 0 ? quot : quot + 1;
}
// a, b 차이가 1이고 a, b를 2로 나눈 몫이 다른 경우에만 겨루는 거니까
// 이 조건을 추가해줌
const isMeet = (a, b) => {
    return getQuat(a) !== getQuat(b) && Math.abs(a - b) === 1; 
}

const solution = (n,a,b) => {
    let round = 1;
    
    while(!isMeet(a, b)) {
        a = getNextNum(a);
        b = getNextNum(b);
        round++;
    }

    return round;
}

// 다른 사람 풀이
const solution = (n,a,b) => {
    let round = 0;
    while(a !== b) {
        round++;
        // 깔끔하게 ceil(무조건 소수점 올림)을 사용하면
        // 홀/짝 안 나눠도 되고 isMeet 함수에서 추가한 조건
        // 확인 안 해봐도 됨
        a = Math.ceil(a / 2);
        b = Math.ceil(b / 2);
    }
    return round;
}