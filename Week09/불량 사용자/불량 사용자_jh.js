// 응모자 아이디와 불량 사용자 아이디가 일치하는지 확인
const isSame = (user_id, banned_id) => {
    // 불량 사용자 아이디에서 *을 .으로 바꿔줌
    // 정규식에서 .은 모든 문자와 일치함
    // ex) ba..ed => babbed, bavved와 일치
    banned_id = banned_id.replace(/\*/g, ".");
    // 정규식 객체 생성 -> banned_id 앞뒤로 아무것도 없는지 확인
    // ex) \^는 앞자리, \$는 끝자리
    const regex = RegExp("\^" + banned_id + "\$");
    // 정규식 패턴 일치 여부 반환
    return regex.test(user_id);
}

const solution = (user_id, banned_id) => {
    // 가능한 경우의 수를 저장하는 배열
    const combinationList = [];
    let answer;
    const dfs = (user_id, banned_id, currentIdList) => {
        const userIdLength = user_id.length;
        // banned_id가 없다는 것은 모든 경우를 확인해 봤다는 것
        if(banned_id.length === 0) {
            // 현재까지 모은 불량사용자와 일치하는 사용자 아이디 배열 push
            combinationList.push(currentIdList);
            return;
        }
        for(let i = 0; i < userIdLength; i++) {
            // 현재 사용자 아이디와 불량사용자 아이디가 일치하는지 확인
            // banned_id는 계속 slice하기 때문에 첫번째 원소를 확인하면 됨
            if(isSame(user_id[i], banned_id[0])) {
                // user_id와 banned_id는 현재 id를 제외한 id들을 넘김,
                // 불량사용자와 일치하는 아이디 배열 넘김
                dfs([...user_id.slice(0, i), ...user_id.slice(i + 1)]
                    , banned_id.slice(1), [...currentIdList, user_id[i]]);
            }
        }
        return;
    }
    // 복사된 배열과 원본 배열이 같은 주소를 참조하지 않도록 slice로 깊은 복사를 해서 넘겨줌
    dfs(user_id.slice(), banned_id.slice(), [])
    // 그냥 조합을 만들면 [frodo, crodo], [crodo, frodo]가 다른 값으로 취급됨
    // 배열을 사전순으로 정렬하고 문자열로 만들어서 중복값을 제거
    // 중복값이 제거된 set의 사이즈가 정답
    answer = new Set(combinationList.map(list => list.sort().join())).size;

    return answer;
}