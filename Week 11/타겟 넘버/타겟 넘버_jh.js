// 처음 코드
const solution = (numbers, target) => {
    const length = numbers.length;
    let cnt = 0;

    const dfs = (currentNumber, index) => {
        // 정수들을 모두 확인하지 않고 리턴하게 됨
        if(target === currentNumber) {
            cnt++;
            return;
        }
        if(index === length) {
            return;
        }
        dfs(currentNumber + numbers[index], index + 1);
        dfs(currentNumber - numbers[index], index + 1);
    }

    dfs(0, 0)

    return cnt;
}

const solution = (numbers, target) => {
    const length = numbers.length;
    let cnt = 0;

    const dfs = (currentNumber, index) => {
        // 정수를 모두 확인했고
        if(index === length) {
            // 타겟 넘버가 만들어졌다면 cnt 1 증가
            if(target === currentNumber) {
                cnt++;
            }
            return;
        }
        dfs(currentNumber + numbers[index], index + 1);
        dfs(currentNumber - numbers[index], index + 1);
    }

    dfs(0, 0)

    return cnt;
}
// 과거 코드도 보여주기