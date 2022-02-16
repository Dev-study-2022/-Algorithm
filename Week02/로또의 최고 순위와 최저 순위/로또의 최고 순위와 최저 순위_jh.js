function solution(lottos, win_nums) {
    // 맞춘 개수에 따른 등수 
    // rank[6] = 1 => 6개 맞추면 1등 
    const rank = [6, 6, 5, 4, 3, 2, 1];
    // 현재 로또 번호와 당첨 번호 일치 개수 
    const currentLength = lottos.filter(x => win_nums.indexOf(x) !== -1).length;
    // 0 개수
    const zeroLength = lottos.filter(x => x === 0).length;
    // 최고 -> 0이 다 다른 당첨번호랑 같을 때 (현재 로또 번호 제외)
    // 최저 -> 지금 현재
    return [rank[currentLength + zeroLength], rank[currentLength]];
}