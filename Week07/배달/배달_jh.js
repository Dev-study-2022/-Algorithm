// 다익스트라 알고리즘
// 시작점에서 다른 지점까지의 최단 거리를 구한다
const dijkstra = (N, time, start) => {
    // 우선순위 큐
    const pq = [];
    // 시작점에서 다른 지점까지의 최단 거리를 저장할 배열
    // 음식 배달 가능한 시간이 500000이하라고 했으므로 초기값은 5000001로 설정
    const distance = Array(N + 1).fill(5000001);
    // 시작점에서 시작점까지의 거리는 0
    distance[start] = 0;
    // 시작점과 시작점의 최단 거리 우선순위 큐에 넣음
    pq.push([start, distance[start]]);

    while(pq.length !== 0) {
        const [currentLocation, currentDistance] = pq.shift();
        const length = time[currentLocation].length;
        // 현재 거리가 현재 지점까지의 최단 거리보다 클 경우
        // 탐색할 필요가 없으므로 넘어감
        if(currentDistance > distance[currentLocation]) {
            continue;
        }
        // 현재 지점에서 갈 수 있는 모든 지점을 확인
        for(let i = 0; i < length; i++) {
            const [nextLocation, nextDistance] = time[currentLocation][i];
            // currentLocation에서 nextLocation으로 이동했을 때의 누적 거리
            const newDistance = nextDistance + currentDistance;
            // newDistance가 현재 저장된 nextLocation까지의 최단 거리보다 작을 경우
            if(newDistance < distance[nextLocation]) {
                // nextLocation까지의 최단 거리 갱신
                distance[nextLocation] = newDistance;
                // 이어서 탐색하기 위해 우선순위큐에 넣어줌
                pq.push([nextLocation, newDistance]);
            }
        }
        // 우선순위큐 정렬
        pq.sort((a, b) => {
            return a[1] - b[1];
        })
    }

    return distance;
}

function solution(N, road, K) {
    const time = Array.from(Array(N + 1), () => []);
    let distance;
    let answer = 0;
    // time 배열에 도로 정보들을 넣어줌
    road.forEach(x => {
        const [_start, _end, _distance] = x;
        // 마을은 양방향으로 연결되어 있으므로 시작점, 끝점 둘다 push해줌
        time[_start].push([_end, _distance]);
        time[_end].push([_start, _distance]);
    })
    // 최단 거리
    distance = [...dijkstra(N, time, 1)];
    // 배달 가능한 마을의 개수 계산
    answer = distance.filter(x => x <= K).length

    return answer;
}