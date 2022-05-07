/*
    한 선수의 정확한 순위를 알기 위해선
    해당 선수가 모든 선수들과 연결되어 있어야 한다.
    연결 여부를 확인하기 위해서 하나의 정점에서 모든 정점까지의
    최단 경로를 구하는 플로이드 와샬 알고리즘을 사용한다.
*/
const solution = (n, results) => {
    // 정점 간의 연결 관계를 저장하는 이차원 배열, 초기값을 2로 설정
    const graph = Array.from(Array(n), () => Array(n).fill(2));
    let answer = 0;
   
    results.forEach(result => {
        const [winner, loser] = result.map(x => x - 1);
        // graph[i][j]가 1이면 i가 j를 이겼다는 뜻,
        // graph[i][j]가 -1이면 i는 j한테 졌다는 뜻
        // 승패 여부를 배열에 저장한다.
        graph[winner][loser] = 1;
        graph[loser][winner] = -1;
    })
    // 플로이드 와샬 구현 부분
    for(let k = 0; k < n; k++) {
        for(let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // 해당 원소값이 초기값일 경우
                if (graph[i][j] === 2) {
                    // i가 k를 이겼고 k가 j를 이겼을 경우에는
                    // i가 j를 이겼다는 논리가 성립되므로
                    // 승리 표시함
                    if(graph[i][k] === 1  && graph[k][j] === 1) {
                        graph[i][j] = 1;
                    }
                    // i가 k한테 졌고 k가 j한테 졌을 경우에는
                    // i가 j한테 졌다는 논리가 성립되므로
                    // 패배 표시함
                    if(graph[i][k] === -1  && graph[k][j] === -1) {
                        graph[i][j] = -1;
                    }
                }
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        // 선수 순위 메길 수 있는지 확인하는 boolean 변수
        let accurate = true;
        for (let j = 0; j < n; j++) {
            // 다른 선수들 끼리의 경기 결과인데 승패 여부가 표시 안 되어 있으면
            if (i !== j && graph[i][j] === 2) {
                // 해당 선수 순위 못 메김
                accurate = false;
            }
        }
        // 선수 순위 메길 수 있으면 answer 증가
        if(accurate) {
            answer++;
        }
    }
    
    return answer;
}