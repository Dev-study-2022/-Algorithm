// https://velog.io/@weaxerse/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4Java-92345%EB%B2%88-%EC%82%AC%EB%9D%BC%EC%A7%80%EB%8A%94-%EB%B0%9C%ED%8C%90

const solution = (board, aloc, bloc) => {
    // 상하좌우 이동하기 위한 배열 
    const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const row = board.length;
    const column = board[0].length;
    
    /* 원래는 dfs 풀 때 조건 부분을 함수 안에서 썼었는데
    참고한 코드 보니까 이 부분 함수로 분리하신것 보고
    이게 더 깔끔해서 앞으로는 함수로 분리해야겠다고 생각함 */
    // 주어진 좌표가 보드 칸을 벗어나지 않는지, 해당 좌표가 이동할 수 있는 곳인지 확인
    const isCorrect = (currentX, currentY) => {
        return !(currentX < 0 || currentX >= row || currentY < 0 || currentY >= column || board[currentX][currentY] === 0)
    }
    // firstX, firstY는 이번 차례인 사람의 위치
    // secondX, secondY는 다음 차례인 사람의 위치
    // 가능한 경우를 모두 확인하여 승리 여부와 게임한 횟수를 리턴
    const dfs = (firstX, firstY, secondX, secondY, depth) => {
        let win = false;
        // 승리/졌을 때의 턴 횟수
        let winCount = 25;
        let loseCount = depth;
        // 현재 칸에서 움직일 수 있을 때
        if(board[firstX][firstY] === 1) {
            move.forEach(current => {
                // 이동할 지점
                const nextX = firstX + current[0];
                const nextY = firstY + current[1];
                // 다음 지점으로 이동할 수 있을 때
                if (isCorrect(nextX, nextY)) {
                    // 이동할거니까 현재 발판 사라짐 
                    board[firstX][firstY] = 0;
                    // dfs 호출해서 승리여부와 횟수 리턴받음
                    // 다음 지점으로 이동하고 다음 사람 차례인 경우
                    const result = dfs(secondX, secondY, nextX, nextY, depth + 1);
                    // 한번이라도 이기는 경우가 있으면 이긴걸로 함
                    // result의 결과는 다른 사람 순서일 때의 결과이므로 not연산자 사용
                    win = win || !result[0];
                    // 이겼으면 이기기까지의 횟수 갱신
                    if(!result[0]) {
                        winCount = Math.min(winCount, result[1]);
                    }
                    // 졌으면 지기까지의 횟수 갱신
                    else {
                        loseCount = Math.max(loseCount, result[1]);
                    }
                    // 이동 안했으니까 발판 다시 만들어줌
                    board[firstX][firstY] = 1;
                }
            })
        }
        // 다른 곳으로 이동할 수 없거나 다른 사람을 만났을 경우 리턴
        return [win, win ? winCount : loseCount];
    }
    // 게임 진행 횟수 리턴
    return dfs(aloc[0], aloc[1], bloc[0], bloc[1], 0)[1];
}