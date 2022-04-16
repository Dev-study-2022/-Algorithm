// 현재 영역 안에 있는 숫자가 모두 같은지 확인하는 함수
const isSameNumber = (arr, startX, startY, length) => {
    const endX = startX + length;
    const endY = startY + length;
    let arrTotal = 0;
    for(let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
            // 영역 안의 있는 원소들 모두 더함
            arrTotal += arr[i][j];
        }
    }
    // 원소합이 0이거나 영역 크기와 같으면 숫자가 모두 같은 것
    return arrTotal === 0 || arrTotal === Math.pow(length, 2);
}

const solution = (arr) => {
    let zeroCnt = 0, oneCnt = 0;
    // 영역을 4등분으로 나누며 확인
    const dfs = (arr, startX, startY, length) => {
        // 영역이 한 칸 밖에 안 남았거나 영역 안의 숫자가 모두 같을 경우 
        if (length === 1 || isSameNumber(arr, startX, startY, length)) {
            // 영역의 시작점의 원소가 0이면 0 카운트 증가, 1이면 1 카운트 증가
            arr[startX][startY] === 0 ? zeroCnt++ : oneCnt++;
            return;
        }
        // 영역을 4등분함
        dfs(arr, startX, startY, length / 2);
        dfs(arr, startX, startY + length / 2, length / 2);
        dfs(arr, startX + length / 2, startY, length / 2);
        dfs(arr, startX + length / 2, startY + length / 2, length / 2);
    }   
    dfs(arr, 0, 0, arr.length);
    
    return [zeroCnt, oneCnt];
}