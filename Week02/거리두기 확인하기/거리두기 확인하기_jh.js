// 거리뒀는지 확인
function bfs(place, [firstX, firstY]) {
    // 탐색을 진행할 위치를 저장하는 큐 (x, y, 이동거리)
    const queue = [[firstX, firstY, 0]];
    // 방문 표시 배열
    const visited = Array.from(Array(5), () => Array(5).fill(false));
    // 상하좌우 이동하기 위한 배열
    const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    // 탐색 시작 위치는 방문 표시해줌
    visited[firstX][firstY] = true;
    while(queue.length !== 0) {
        const [currentX, currentY, currentCnt] = queue.shift();
        for(let i = 0; i < 4; i++) {
            const nextX = currentX + move[i][0];
            const nextY = currentY + move[i][1];
            const nextCnt = currentCnt + 1;
            // 다음에 이동할 위치가 대기실을 벗어나거나 ||
            // 이미 방문한 적이 있거나 ||
            // 파티션이 있는 곳이라면 탐색하지 않음
            if(nextX < 0 || nextX >= 5 || nextY < 0 || nextY >= 5 
               || visited[nextX][nextY] || place[nextX][nextY] === 'X') {
                continue;
            }
            // 다음에 이동할 거리가 2 이하일 때
            if(nextCnt <= 2) {
                // 그곳에 사람이 있다면 거리두기 안 지킨 거니까 0 리턴
                if(place[nextX][nextY] === 'P') {
                    return 0;
                }
                // 사람 없으면 계속 탐색해야 하기 때문에 큐에 정보 넣어줌
                queue.push([nextX, nextY, nextCnt]);
                // 방문 표시해줌
                visited[nextX][nextY] = true;
            }
        }
    }
    return 1;
}

function solution(places) {
    const answer = [];
    places.forEach((place) => {
        // 대기실 구조를 저장할 배열
        const tempPlace = []
        // 사람들의 위치를 담을 배열
        const peopleLocation = []
        let peopleLocationLength;
        place.forEach((row, rowIndex) => {
            // 문자열을 배열로 만듬
            const splitRow = row.split("")
            // 사람 위치
            let peopleIndex = splitRow.indexOf("P");
            // 배열로 만든 대기실 구조를 한 행씩 넣어줌 
            tempPlace.push(splitRow)
            // 사람들의 위치를 계속 찾아서 배열에 넣어줌
            while(peopleIndex !== -1) {
                peopleLocation.push([rowIndex, peopleIndex])
                peopleIndex = splitRow.indexOf("P", peopleIndex + 1)
            }
        })
        peopleLocationLength = peopleLocation.length;
        // 대기실에 사람이 없으면 모두 거리두기를 지킨 것이므로 1 넣어줌
        if(peopleLocationLength === 0) {
            answer.push(1)
        }
        else {
            let result = 1;
            // 대기실 내 모든 사람들이 거리두기 지켰는지 확인하기 위해
            // 한 명씩 bfs 돌려봄
            for(let i = 0; i < peopleLocationLength; i++) {
                result = bfs(tempPlace, peopleLocation[i]);
                // 거리두기 안 지켰으면 반복문 즉시 종료
                if(result === 0) {
                    break;
                }
            }
             answer.push(result);
        }
    })
    return answer;
}