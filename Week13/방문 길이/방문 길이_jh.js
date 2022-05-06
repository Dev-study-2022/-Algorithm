const solution = (dirs) => {
    // 상하좌우 이동하는데 사용할 변수들 담은 배열
    const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    // `시작x시작y`, `끝x끝y`를 각각 숫자로 변환한 뒤
    // "최소값"을 key로 지정, "최댓값"을 value로 넣는데
    // 배열 형태로 넣음
    const visited = {};
    const dirsLength = dirs.length;
    // 처음 시작 위치는 (0, 0) => (5, 5) 로 수정
    let previousLocation = [5, 5];
    let answer = 0;
    // 현재 좌표가 좌표평면 경계 내에 있는지 확인
    const isCorrect = (currentLocation) => {
        const [currentX, currentY] = currentLocation;
        return !(currentX < 0 || currentX > 10 || currentY < 0 || currentY > 10);
    }
    // 이전 좌표에서 상하좌우로 이동했을 때의 현재 좌표를 얻는 함수
    const getCurrentLocation = (previousLocation, dir) => {
        const [previousX, previousY] = previousLocation;
        let currentX, currentY;
        if(dir === "U") {
            currentX = previousX + direction[0][0];
            currentY = previousY + direction[0][1];
        }
        else if(dir === "R") {
            currentX = previousX + direction[1][0];
            currentY = previousY + direction[1][1];
        }
        else if(dir === "D") {
            currentX = previousX + direction[2][0];
            currentY = previousY + direction[2][1];
        }
        else {
            currentX = previousX + direction[3][0];
            currentY = previousY + direction[3][1];
        }
        return [currentX, currentY]
    }

    for(let i = 0; i < dirsLength; i++) {
        // 현재 좌표
        const currentLocation = getCurrentLocation(previousLocation, dirs[i]);
        // 이전 좌표를 문자열로 변경하고 그걸 또 숫자로 변환함
        const preivousLocationJoinNum = parseInt(previousLocation.join(""));
        // 현재 좌표를 숫자로 변환한 값, 좌표 최대, 최소값
        let currentLocationJoinNum, maxJoinNum, minJoinNum;
        // 현재 좌표가 좌표 경계를 벗어난다면 continue
        if(!isCorrect(currentLocation)) {
            continue;
        }

        currentLocationJoinNum = parseInt(currentLocation.join(""));

        maxJoinNum = Math.max(preivousLocationJoinNum, currentLocationJoinNum);
        minJoinNum = Math.min(preivousLocationJoinNum, currentLocationJoinNum);
        // visited의 key는 이전 좌표, 현재 좌표의 최소값
        // minJoinNum이 이미 key로 등록되어 있을 경우
        if(visited.hasOwnProperty(minJoinNum)) {
            // 아직 이전좌표 - 현재좌표 길을 캐릭터가 걷지 않았다면
            if(visited[minJoinNum].indexOf(maxJoinNum) === -1) {
                // maxJoinNum을 추가
                visited[minJoinNum].push(maxJoinNum);
                answer++;
            }
        } // minJoinNum과 연결된 길을 처음 걸어본다면
        else {
            // maxJoinNum을 배열 형태로 넣어줌
            visited[minJoinNum] = [maxJoinNum];
            answer++;
        }
        // 이전 좌표는 현재 좌표로 갱신
        previousLocation = currentLocation
    }

    return answer;
}