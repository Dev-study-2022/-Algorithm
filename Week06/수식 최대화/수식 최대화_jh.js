// 연산 결과 반환
const getCalculationResult = (num1, num2, sign) => {
    let result;
    if(sign === "*") {
        result = parseInt(num1) * parseInt(num2);
    }
    else if(sign === "+") {
        result = parseInt(num1) + parseInt(num2);
    }
    else {
        result = parseInt(num1) - parseInt(num2);
    }
    return result;
}

const solution = (expression) => {
    // expression에서 숫자만 걸러냄
    const numArr = expression.split(/[^0-9]/g).filter(x => x !== '');
    // expression에서 연산자만 걸러냄
    const signArr = expression.split(/[0-9]/g).filter(x => x !== '');
    // 중복 연산자 제거한 배열
    const noDupSignArr = [...new Set(signArr)];
    const noDupSignArrLength = noDupSignArr.length;
    // 연산자 우선순위 조합한 결과를 담을 배열
    const signCombinations = [];
    // 조합에 사용할 방문 표시 배열
    const visited = Array(noDupSignArrLength).fill(false);
    let answer = 0;

    // 조합
    const combination = (currentStr) => {
        if(currentStr.length === noDupSignArrLength) {
            signCombinations.push(currentStr);
            return;
        }
        for(let i = 0; i < noDupSignArrLength; i++) {
            if(!visited[i]) {
                visited[i] = true;
                combination(currentStr + noDupSignArr[i]);
                visited[i] = false;
            }
        }
        return;
    }

    combination("");

    // 우선순위 다르게 했을 때 나올 수 있는 모든 결과 확인
    signCombinations.forEach(signCombination => {
        // signCombination 문자열이므로 배열로 변환
        const signCombinationArr = signCombination.split("");
        const _numArr = [...numArr];
        const _signArr = [...signArr];
        
        signCombinationArr.forEach(currentSign => {
            let index = 0;
            // index가 signArr.length보다 같거나 클 경우에는
            // _signArr의 모든 원소를 확인해봤다는 뜻이므로 종료
            while(index < _signArr.length) {
                // currentSign과 현재 _signArr의 원소가 같다면
                if(_signArr[index] === currentSign) {
                    // 연산 결과
                    const result = getCalculationResult(_numArr[index], _numArr[index + 1], currentSign);
                    // 연산자 제거
                    _signArr.splice(index, 1);
                    // 피연산자들 지우고 연산 결과 배열에 넣음
                    _numArr.splice(index, 2, result);
                }
                // currentSign과 현재 _signArr의 원소 다르면 다음 원소 탐색해야 하므로 index 증가
                else {
                    index++;
                }
            }
        });
        // answer max값으로 갱신
        answer = Math.max(answer, Math.abs(_numArr[0]));
    })

    return answer;
}