// 집합 원소 길이가 짧은 것부터 보면 됨
// 집합 원소 1개면 튜플에 무조건 들어감
// 집합 원소 2개면 앞에서 들어간 것 말고 다른 놈이 튜플에 들어감
// ... 
function solution(s) {
    const answer = [];
    const length = s.length;
    // [["2"], ["2", "1"], ["2", "1", "3"]] 형태로 변환
    const arr = s.substr(2, length - 4)
                 .split("},{")
                 .map(x => x.split(","));
    // 집합 길이 짧은것부터 정렬
    arr.sort((a, b) => {
      return a.length - b.length;  
    })
    
    arr.forEach(x => {
        x.forEach(y => {
            // answer에 y가 없으면 튜플 원소에 포함되는 것이므로
            // answer에 추가하고 반복문 탈출
            if(answer.indexOf(Number(y)) === -1) {
                answer.push(Number(y));
                return false;
            }
        })
    })
    
    return answer;
}