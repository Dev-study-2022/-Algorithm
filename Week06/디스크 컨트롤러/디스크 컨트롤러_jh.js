function solution(jobs) {
    const length = jobs.length;
    const priority = [];
    let jobStartTime = 0;
    let answer = 0;
    // 먼저 들어온 순으로 정렬
    jobs.sort((a, b) => {
        if(a[0] === b[0]) {
            return parseInt(a[1]) - parseInt(b[1]);
        }
        else {
            return parseInt(a[0]) - parseInt(b[0]);
        }
    });

    while (jobs.length !== 0) {
        // 작업이 아무것도 실행되지 않고 있으면
        // jobs 맨 앞에거 실행
        jobStartTime = jobs[0][0];
        priority.push(jobs.shift());
        while(priority.length !== 0) {
            const [jobRequestTime, jobRunTime] = priority.shift();
            // 현재 진행되고 있는 작업이 끝난 후에 진행되는 작업 인덱스 찾음
            let index = jobs.findIndex(job => job[0] > jobStartTime + jobRunTime);
            // 현재 작업보다 늦게 시작되는게 없으면 index를 job배열 length로 변경
            // => 뒤에 남은 작업들 다 넣어줄려고
            if (index === -1) {
                index = jobs.length;
            }
            // 배열에 작업들 넣어줌
            priority.push(...jobs.slice(0, index));
            jobs.splice(0, index);
            // 각 작업의 대기시간 + 작업시간 answer에 더함
            answer += (jobStartTime - jobRequestTime) + jobRunTime;
            // 작업 시작 시간 갱신
            jobStartTime += jobRunTime;
            // 작업시간 짧은 순으로 정렬
            priority.sort((a, b) => {
                return parseInt(a[1]) - parseInt(b[1]);
            })
        }
    }
    answer /= length;
    return Math.floor(answer);
}
