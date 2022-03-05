function solution(grid) {
    const row = grid.length;
    const column = grid[0].length
    const visited = Array.from(Array(row), () =>
        Array.from(Array(column), () => Array(4).fill(false))
    );
    const direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const leftDirectionIndex = [2, 3, 1, 0];
    const rightDirectionIndex = [3, 2, 0, 1];
    const answer = [];

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            for(let k = 0; k < 4; k++) {
                if(visited[i][j][k]) {
                    continue;
                }
                let currentX = i, currentY = j, currentDirection = k, cnt = 1;
                visited[currentX][currentY][currentDirection] = true;
                while(true) {
                    switch(grid[currentX][currentY]) {
                        case 'L':
                            currentDirection = leftDirectionIndex[currentDirection];
                            break;
                        case 'R':
                            currentDirection = rightDirectionIndex[currentDirection];
                            break;
                    }
                    currentX += direction[currentDirection][0];
                    currentY += direction[currentDirection][1];
                    if(currentX < 0) {
                        currentX = row - 1;
                    }
                    if(currentX >= row) {
                        currentX = 0;
                    }
                    if(currentY < 0) {
                        currentY = column - 1;
                    }
                    if(currentY >= column) {
                        currentY = 0;
                    }
                    if(visited[currentX][currentY][currentDirection]) {
                        answer.push(cnt);
                        break;
                    }
                    visited[currentX][currentY][currentDirection] = true;
                    cnt++;
                }
            }
        }
    }

    answer.sort((a, b) => a - b);

    return answer;
}