// 위, 아래, 오른쪽 방향으로 가며 숫자를 채워나감
function solution(n) {
    const answer = [];
    const triangle = new Array(n);
    // 위쪽, 아래쪽, 오른쪽으로 이동할 때 사용할 x, y 인덱스
    let up_x = n - 2, up_y = n - 2, down_x = 0, down_y = 0, right_x = n - 1, right_y = 1;
    // 방향을 체크하는 변수, 배열 채울 때 사용할 숫자 변수
    // 방향 순서는 아래 -> 오른쪽 -> 위
    let direction = 0, num = 1;
    
    for(let i = 0; i < n; i++) {
        triangle[i] = new Array(i + 1);
    }
    
    for (let k = n; k >= 1; k--) {
        // 방향 체크
        let temp = direction % 3;
        switch (temp) {
            // 아래로 이동
            case 0:
                // 아래로 이동하며 숫자 채움
                for(let i = down_x; i <= down_x + k - 1; i++) {
                    triangle[i][down_y] = num++;
                }
                // 다음 x 시작 인덱스는 현재 인덱스에서 2를 더하면 됨
                down_x += 2;
                down_y++;
                break;
            // 오른쪽으로 이동
            case 1:
                // 오른쪽으로 이동하며 숫자 채움 
                for(let j = right_y; j <= right_y + k - 1; j++) {
                    triangle[right_x][j] = num++;
                }
                right_x--;
                right_y++;
                break;
            // 위로 이동
            case 2:
                // 위로 이동하며 숫자 채움
                let j = up_y;
                for(let i = up_x; i >= up_x - k + 1; i--) {
                        triangle[i][j--] = num++;
                }
                up_x--;
                up_y -= 2;
        }
        direction++;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= i; j++) {
            answer.push(triangle[i][j]);
        }
    }
    
    return answer;
}

// 다른 사람의 기깔나는 풀이
function solution(n) {
    let a = Array(n).fill().map((_, i) => Array(i + 1).fill())
    let row = -1
    let col = 0
    let fill = 0
    for (let i = n; i > 0; i -= 3) {
      a[++row][col] = ++fill
      for (let j = 0; j < i - 1; j++) a[++row][col] = ++fill
      for (let j = 0; j < i - 1; j++) a[row][++col] = ++fill
      for (let j = 0; j < i - 2; j++) a[--row][--col] = ++fill
    }
    return a.flat()
  }