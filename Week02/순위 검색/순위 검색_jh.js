// info를 객체로 변환
// 조건 문자열이 key, 점수 배열이 value
// "java backend junior pizza 150" => "javabackendjuniorpizza" : [150, ...]
const getObjectInfo = (info) => {
    const objectInfo = {};
    info.forEach(x => {
        const arr = x.split(" ");
        // 점수는 배열에서 제거하면서 score에 저장
        const score = Number(arr.pop());
        // 배열을 문자열로 변경해서 key에 저장
        const key = arr.join("");
        // 기존에 키 값이 있으면 배열에 push, 없으면 새로 생성
        objectInfo[key] ? objectInfo[key].push(score) : objectInfo[key] = [score];
    })
    // value 내 점수는 오름차순 시킴
    // 처음에는 sort()만 해놔서 안됐었음!!!!!!!!!!!!!!!!!!!!
    // js는 숫자형 데이터를 비교하는건데도 10, 2 있으면 10 < 2로 인식
    // 숫자를 정렬해줄 때는 의식적으로 항상 정렬 함수를 구현해주자
    for(const key in objectInfo) {
        objectInfo[key].sort((a, b) => a - b);
    }
    return objectInfo;
}
// 이진 탐색, 재귀로 작성
const binarySearch = (info, start, end, score) => {
    if(start > end) {
        return start;
    }
    const mid = Math.floor((start + end) / 2);
    if(info[mid] === score) {
        return mid;
    }
    else if(info[mid] < score) {
        return binarySearch(info, mid + 1, end, score);
    }
    else {
        return binarySearch(info, start, mid - 1, score);
    }
}
// 조건에 맞는 지원자 명수 구함
const getCount = (info, query, queryScore) => {
           // 1. query의 원소들이 모두 포함되어 있는 key들을 모음 => 조건에 부합한다
           // 2. queryScore보다 높은 점수를 받은 지원자들의 합을 구해서 리턴
    return Object.keys(info).filter(key => 
                query.every(x => key.includes(x))
            ).reduce((total, key) => 
                // 이진탐색으로 queryScore가 들어갈 인덱스를 찾음 
                // (queryScore와 일치하는 값이 있는 인덱스 or 최초로 queryScore보다 큰 값 있는 인덱스) 
                // 배열 길이에서 고놈 인덱스를 빼면 queryScore보다 큰 놈들의 개수가 나오지
                total + info[key].length - binarySearch(info[key], 0, info[key].length, queryScore)
            , 0);
}

function solution(info, query) {
    const objectInfo = getObjectInfo(info);
    const answer = [];
    query.forEach(queryValue => {
        // query 전처리 =>" and ", " ", "-" 기준으로 split 한 후에 "" 값 제거
        const splitQueryValue = queryValue.split(/ and | |-/i).filter(x => x !== "");
        const queryScore = splitQueryValue.pop();
        answer.push(getCount(objectInfo, splitQueryValue, queryScore));
    })
    return answer;
}
