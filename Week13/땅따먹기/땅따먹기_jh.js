// 처음에 dfs로 구현, 제출하니까 모든 테케를 틀림
const solution = (land) => {
    const rowLength = land.length;
    const visitedColumn = Array(4).fill(false);
    let answer = 0;

    const dfs = (currentRow, total) => {
        if (currentRow === rowLength) {
            answer = Math.max(answer, total);
            return;
        }
        for (let j = 0; j < 4; j++) {
            if (!visitedColumn[j]) {
                visitedColumn[j] = true;
                dfs(currentRow + 1, total + land[currentRow][j]);
                visitedColumn[j] = false;
            }
        }
    }

    dfs(0, 0);

    return answer;
}

/*
    열을 연속해서 밟을 수 없다..!!
    나는 특정 열을 한번 밟으면 해당 열을 다시는 못 밟는다고 이해했었음..
    연속해서라는 말을 못 봄 바보다..!!
    하긴..행이 십만개까지 있을 수 있는데 어떻게 열을 한번씩만 밟아...
    그래서 dp로 풀었다잉..
*/
const solution = (land) => {
    const rowLength = land.length;
    const dp = Array.from(Array(rowLength), () => Array(4).fill(0));
    let answer = 0;
    // 1행의 최대값은 land 1행이랑 값이 같음
    for (let j = 0; j < 4; j++) {
        dp[0][j] = land[0][j];
    }

    for (let i = 1; i < rowLength; i++) {
        // 연속으로 같은 열을 밟을 수 없기 때문에
        // 윗행의 dp 값에서 현재 열을 제외한 값들 중 최댓값과 land 값을 더한 놈으로 값을 변경해줌
        dp[i][0] = Math.max(dp[i - 1][1], Math.max(dp[i - 1][2], dp[i - 1][3])) + land[i][0];
        dp[i][1] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][2], dp[i - 1][3])) + land[i][1];
        dp[i][2] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][1], dp[i - 1][3])) + land[i][2];
        dp[i][3] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][1], dp[i - 1][2])) + land[i][3];
    }
    // 마지막 행의 dp 값 중 최대값을 answer에 대입
    for (let j = 0; j < 4; j++) {
        answer = Math.max(answer, dp[rowLength - 1][j]);
    }

    return answer;
}