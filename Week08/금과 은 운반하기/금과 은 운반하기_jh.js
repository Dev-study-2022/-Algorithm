function solution(a, b, g, s, w, t) {
    const length = g.length;
    let answer = 10e5 * 4 * 10e9;
    let start = 0, end = answer;

    while(start <= end) {
        const mid = Math.floor((start + end) / 2);
        let gold = 0, silver = 0, sum = 0;
        for(let i = 0; i < length; i++) {
            const currentGold = g[i];
            const currentSilver = s[i];
            const currentWeight = w[i];
            const currentTime = t[i];
            let moveCnt = Math.floor(mid / (currentTime * 2));

            if(mid % (currentTime * 2) >= currentTime) {
                moveCnt++;
            }

            const totalWeight = currentWeight * moveCnt;

            gold += currentGold < totalWeight ? currentGold : currentWeight * moveCnt;
            silver += currentSilver < totalWeight ? currentSilver : currentSilver * moveCnt;
            sum += currentGold + currentSilver < totalWeight ? currentGold + currentSilver : totalWeight;
        }

        if(gold >= a && silver >= b && sum >= a + b) {
            end = mid - 1;
            answer = Math.min(answer, mid);
        }
        else {
            start = mid + 1;
        }
    }

    return answer;
}