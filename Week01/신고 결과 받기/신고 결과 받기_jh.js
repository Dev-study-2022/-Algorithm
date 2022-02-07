function solution(id_list, report, k) {
    // 신고 정보 저장하는 객체
    // "신고당한 아이디": ["신고한 아이디1", "신고한 아이디2"]
    const reportInfo = {}
    // 메일 받은 횟수 저장, 아이디 갯수 만큼 배열 만들고 초기값은 0으로 채움 
    const answer = new Array(id_list.length).fill(0);
    
    report.forEach(info => {
        // info: "muzi frodo" => reportID: muzi, reportedID: frodo
        const [reportID, reportedID] = info.split(" ");
        // reportInfo에 이미 reportedID 키 값이 있다면
        if (reportedID in reportInfo) {
            // reportID가 reportedID를 처음 신고한건지 확인
            if(reportInfo[reportedID].indexOf(reportID) === -1) {
                reportInfo[reportedID].push(reportID);
            }
        }
        // reportInfo에 reportedID 키 값이 없으면 
        else {
            // value는 배열로 넣어줌
            reportInfo[reportedID] = [reportID]
        }
    })
    // key는 신고당한 아이디
    for (const key in reportInfo) {
        // key를 신고한 아이디 리스트
        const userList = reportInfo[key];
        // key를 신고한 아이디가 k개 이상이면
        if (userList.length >= k) {
            userList.forEach(user => {
                // key를 신고한 아이디 메일 받은 횟수 1 증가시킴
                answer[id_list.indexOf(user)]++;
            })
        }
    }
    
    return answer;
}

function solution(id_list, report, k) {
    const reportInfo = {}
    const answer = new Array(id_list.length).fill(0);
    // set을 사용해서 유저의 동일 신고 건수를 한건으로 만들어줌
    // ["muzi frodo", "muzi frodo", "muzi frodo"]
    // => ['muzi frodo']
    // 위 코드에서 "reportID가 reportedID를 처음 신고한건지 확인" 하는 조건을 
    // 생략해도 됨. 그리고 if-else를 삼항연산자로 변경해줌
    [...new Set(report)].forEach(info => {
        const [reportID, reportedID] = info.split(" ");
        reportedID in reportInfo ? reportInfo[reportedID].push(reportID) : reportInfo[reportedID] = [reportID]
    })
    
    for(const key in reportInfo) {
        const userList = reportInfo[key];
        if(userList.length >= k) {
            userList.forEach(user => {
                answer[id_list.indexOf(user)]++;
            })
        }
    }
    
    return answer;
}