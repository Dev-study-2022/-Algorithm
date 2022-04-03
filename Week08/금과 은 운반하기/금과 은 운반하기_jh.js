/*
    이분탐색 사용
    구해야 할 것은 "가장 빠른 시간"
    "시간"을 기준으로 이분탐색 진행
*/
function solution(a, b, g, s, w, t) {
    const length = g.length;
    // 이분탐색 진행할 시간 범위
    // end => js에서 사용할 수 있는 최대 상수로 지정해놓음
    let start = 0, end = Number.MAX_SAFE_INTEGER;
    // answer 최대상수로 초기화
    let answer = end;
    // start가 end보다 작거나 같을 동안에만 탐색 진행
    while (start <= end) {
        // start와 end의 중간 값
        const mid = Math.floor((start + end) / 2);
        // 현재 시간에 금만 운반했을 때, 은만 운반했을 때, 금+은 같이 운반했을 때
        // 운반되는 양
        // => 모든 경우의 수를 확인
        let gold = 0, silver = 0, sum = 0;
        for (let i = 0; i < length; i++) {
            // 현재 도시의 금, 은, 운반가능량, 편도 시간
            const currentGold = g[i];
            const currentSilver = s[i];
            const currentWeight = w[i];
            const currentTime = t[i];
            // 현재 주어진 시간동안 가능한 현재 도시에서 새 도시로 광물 운반가능한 횟수
            let moveCnt = Math.floor(mid / (currentTime * 2));
            // mid % (currentTime * 2)가 편도 시간 보다 같거나 크다는 것은
            // 한번 더 편도로 움직일 수 있다는 뜻이기에 운반가능 횟수 1 추가
            // => 현재 도시에서 새 도시로 이동하는 횟수가 추가되는 것 
            if(mid % (currentTime * 2) >= currentTime) {
                moveCnt++;
            }
            // 최종적으로 운반할 수 있는 총 운반량을 구함 
            const totalWeight = currentWeight * moveCnt;
            // 현재 도시의 금, 은, 금+은 보유량과 총 운반량을 비교해
            // 최소값을 각 변수에 더해줌
            // => 금, 은, 금+은을 모두 운반했다는 뜻
            gold += Math.min(currentGold, totalWeight);
            silver += Math.min(currentSilver, totalWeight);
            sum += Math.min(currentGold + currentSilver, totalWeight);
        }
        // 모든 도시가 운반한 금, 은, 금+은 양이 기준 값 보다 같거나 크다면
        // 도시를 지을 수 있음 
        if (gold >= a && silver >= b && sum >= a + b) {
            // 더 빠른 시간을 찾기 위해 end 갱신
            // answer 최소값 갱신
            end = mid - 1;
            answer = Math.min(answer, mid);
        }
        // 도시를 지을 수 없다면 시간을 늘림 
        else {
            start = mid + 1;
        }
    }
    
    return answer;
}