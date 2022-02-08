function solution(rows, columns, queries) {
    // 2차원 배열 생성
    let board = Array.from(Array(rows), () => Array(columns).fill(0));
    let answer = [];
    for(let i=0; i<rows; i++) {
        for (let j = 0; j < columns; j++) {
            // 배열 초기화
            board[i][j] = i * columns + j + 1;
        }
    }
    queries.forEach(query => {
        // x1, y1, x2, y2 선언, 1부터 시작되니까 배열 인덱스에 맞춰서 1 빼줌
        const [firstX, firstY, secondX, secondY] = query.map(x => x - 1);
        // 첫번째 원소 저장 
        const firstData = board[firstX][firstY];
        let minData = firstData;
        // 마지막 지점부터 끌어올려줌
        // 그림으로 설명
        for(let i=firstX; i<secondX; i++) {
            board[i][firstY] = board[i+1][firstY];
            minData = Math.min(minData, board[i][firstY]);
        }
        for(let j=firstY; j<secondY; j++) {
            board[secondX][j] = board[secondX][j+1];
            minData = Math.min(minData, board[secondX][j]);
        }
        for(let i=secondX; i>firstX; i--) {
            board[i][secondY] = board[i-1][secondY];
            minData = Math.min(minData, board[i][secondY]);
        }
        for(let j=secondY; j>firstY+1; j--) {
            board[firstX][j] = board[firstX][j-1];
            minData = Math.min(minData, board[firstX][j]);
        }
        board[firstX][firstY+1] = firstData;
        answer.push(minData);
    });
    return answer;
}