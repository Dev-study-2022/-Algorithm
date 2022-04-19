function solution(gems) {
    // 보석 개수
    const gemsKinds = new Set(gems).size;
    // "key":"value" 형태의 자료구조 => "보석":"보석 인덱스"
    const gemsMap = new Map();
    // [보석 시작 인덱스, 종료 인덱스] 저장
    const gemsLength = [];

    gems.forEach((gem, index) => {
        // map에 저장된 gem 제거
        // => 더 짧은 구간을 찾아야 하기 때문에 인덱스를 계속 갱신해줘야 함
        gemsMap.delete(gem);
        // 보석이랑 보석인덱스 추가
        gemsMap.set(gem, index);
        // map에 보석 다 저장됐으면
        if(gemsMap.size === gemsKinds) {
            // gemsMap의 첫번째 원소의 인덱스값과 현재 인덱스를 배열 형태로 넣어줌
            // -> 인덱스는 +1 해줌
            // (구간 시작 지점, 구간 끝 지점)
            gemsLength.push([gemsMap.values().next().value + 1, index + 1]);
        }
    })
    // 짧은 구간 순으로 정렬, 짧은 구간이 여러개면 시작지점이 작은 순으로 정렬
    gemsLength.sort((a, b) => {
        if(a[1] - a[0] === b[1] - b[0]) {
            return a[0] - b[0];
        }
        else {
            return (a[1] - a[0]) - (b[1] - b[0]);
        }
    })

    return gemsLength[0];
}