/*
    처음에는 정렬해서 풀려고 했음
    ex) 소모 피로도 낮은순, 최소 피로도 낮은순 정렬 요런식으로
    근데 보다 보니 던전 최대 개수가 작아서 완탐이라는걸 알게 됨
*/
// 처음 풀이
function solution(k, dungeons) {
    const length = dungeons.length;
    const visited = Array(length).fill(false);
    let answer = 0;

    const dfs = (currentK, cnt) => {
        for(let i = 0; i < length; i++) {
            // 아직 방문하지 않은 던전이면
            if(!visited[i]) {
                // 방문 표시
                visited[i] = true;
                // 던전의 최소 피로도가 현재 피로도보다 크면
                if(currentK < dungeons[i][0]) {
                    // 최대 던전 수 갱신하고
                    answer = Math.max(answer, cnt);
                    // 방문 표시 없앰 - 추후 또 방문해야하므로
                    visited[i] = false;
                    continue;
                }
                dfs(currentK - dungeons[i][1], cnt + 1);
                // 방문 표시 없앰 - 다시 방문해야하니까
                visited[i] = false;
            }
        }
        // 최대 던전 수 갱신
        answer = Math.max(answer, cnt);
        return;
    }

    combination(k, 0);

    return answer;
}

// 두번째 풀이
function solution(k, dungeons) {
    const length = dungeons.length;
    const visited = Array(length).fill(false);
    let answer = 0;
    let temp = 0;

    const combination = (currentK, cnt) => {
        for(let i = 0; i < length; i++) {
            // 던전의 최소 피로도가 현재 피로도보다 작거나 같을때만 방문표시
            // 방문 못하는 경우면 아예 들어가보지도 않음 당연한거지~
            if(!visited[i] && currentK >= dungeons[i][0]) {
                visited[i] = true;
                combination(currentK - dungeons[i][1], cnt + 1);
                visited[i] = false;
            }
        }
        answer = Math.max(answer, cnt);
        return;
    }

    combination(k, 0);

    return answer;
}