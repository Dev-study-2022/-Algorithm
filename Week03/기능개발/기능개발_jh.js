// 처음 코드
function solution(progresses, speeds) {
    // 각 기능이 완료되기까지의 기간을 저장한 배열
    const completionPeriod = progresses
        .map((progress, index) => {
            const quot = Math.floor((100 - progress) / speeds[index]);
            const remainder = (100 - progress) % speeds[index];
            return remainder === 0 ? quot : quot + 1;
        });
    const answer = [];
    let endIndex = 0;
    // 각 기간을 확인하면서
    // 현재 기능보다 작업이 오래 걸리는 기능의 인덱스를 찾음
    // => 해당 인덱스가 배포 가능한 기능 개수
    // 배포가 된 기능들은 배열에서 제외함
    while(completionPeriod.length !== 0) {
        endIndex = completionPeriod.findIndex(x => x > completionPeriod[0]);
        // 작업이 오래 걸리는 기능을 찾지 못했을 경우에는
        // 남은 작업이 모두 배포 가능하다는 뜻이기에
        // endIndex에 현재 배열 길이를 대입
        if(endIndex === -1) {
            endIndex = completionPeriod.length;
        }
        // 배포 가능 기능 개수 push
        answer.push(endIndex);
        // 배포 한 기능들은 제거
        completionPeriod.splice(0, endIndex);
    }
    return answer;
}

// 다른 사람 코드 참고해서 수정
function solution(progresses, speeds) {
    const answer = [];
    let maxTime = 0;
    progresses.forEach((progress, index) => {
        const quot = Math.floor((100 - progress) / speeds[index]);
        const remainder = (100 - progress) % speeds[index];
        const currentTime = remainder === 0 ? quot : quot + 1;
        // 현재 작업 시간이 지금까지의 최대 작업 시간보다 크다면
        if(maxTime < currentTime) {
            // answer 배열에 1 추가
            answer.push(1);
            // maxTime 변경
            maxTime = currentTime;
        }
        // 작으면
        else {
            // 마지막 원소 1 증가시킴
            // => 같이 배포 가능한 기능이라는 뜻이니까
            answer[answer.length - 1]++;
        }
    })
    return answer;
}