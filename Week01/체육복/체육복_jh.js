// 배열 오름차순 정렬하는 함수
function cmp(x, y) {
    return x - y;
}
function solution(n, lost, reserve) {
    // lost와 reverse의 교집합
    const intersection = lost.filter(x => reserve.indexOf(x) !== -1);
    let answer = 0;
    // lost, reverse 오름차순 정렬
    // 정렬 안 하면 lost: [2, 4], reverse: [3, 1]일 경우 틀림
    // => 이유는 아래에서 확인 가능
    lost.sort(cmp);
    reserve.sort(cmp);
    // 각 lost와 reverse는 본인 값들에서 교집합 뺀 값만 남김 
    lost = lost.filter(x => intersection.indexOf(x) === -1)
    reserve = reserve.filter(x => intersection.indexOf(x) === -1)
    lost.forEach(x => {
        // 앞번호 학생 인덱스 
        const frontIndex = reserve.indexOf(x - 1);
        // 뒷번호 학생 인덱스
        const backIndex = reserve.indexOf(x + 1);
        // 체육복 빌려주는 학생 인덱스
        // 앞번호 학생 체육복 여벌 있으면 앞번호가 빌려주고
        // 아니면 뒷번호 애가 빌려주는데 뒷번호 애도 없으면 아무도 못 빌려줌
        // !! 배열의 앞에서부터 인덱스를 찾기 때문에 오름차순 정렬을 해놔야함
        //    안 그러면 최적의 답이 안 나옴
        const deleteIndex = frontIndex !== -1 ? frontIndex : backIndex;
        // 빌릴 사람 있으면
        if (deleteIndex !== -1) {
            // 체육복 입는 학생 수 증가
            answer++;
            // 체육복 빌려준 애는 여벌 가진 애 배열에서 뺌
            reserve.splice(deleteIndex, 1);
        }
    })
    // 원래 체육복 입을 수 있는 애들 수 더해줌
    answer += n - lost.length;
    return answer;
}