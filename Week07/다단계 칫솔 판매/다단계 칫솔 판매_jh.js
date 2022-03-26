function solution(enroll, referral, seller, amount) {
    // "판매원": "추천인"
    const referralList = {};
    // "판매원": 이익금
    const profitList = {};
    const answer = [];

    referral.forEach((person, index) => {
        // 추천인이 있으면 referralList에 판매원(key)과 추천인(value)을 넣어줌
        if(person !== "-") {
            referralList[enroll[index]] = person;
        }
        // 판매원의 이익금은 0으로 초기화
        profitList[enroll[index]] = 0;
    })

    seller.forEach((person, index) => {
        // 이익금
        let profit = amount[index] * 100;
        // 현재 이익을 분배해야 하는 판매원
        // (피라미드를 타고 올라가며 이익 분배하기 위한 변수)
        let currentPerson = person;
        while(true) {
            // 분배할 이익금
            const distributionProfit = Math.floor(profit * 0.1);
            // 분배할 이익금이 1원 미만이면 남은 이익금 다 가지고 반복문 종료
            if(distributionProfit < 1) {
                profitList[currentPerson] += profit;
                break;
            }
            // 분배하고 남은 이익금 가짐
            profitList[currentPerson] += profit - distributionProfit;
            // 현재 판매원에게 추천인이 있으면
            if(referralList.hasOwnProperty(currentPerson)) {
                // 다음에 이익을 분배할 판매원은 현재 판매원의 추천인
                currentPerson = referralList[currentPerson];
                // 이익금은 분배한 이익금으로 변경
                profit = distributionProfit;
            }
            // 추천인이 없으면 반복문 종료
            else {
                break;
            }
        }
    })
    // 이익금만 answer 배열에 추가
    for(const name in profitList) {
        answer.push(profitList[name]);
    }

    return answer;
}