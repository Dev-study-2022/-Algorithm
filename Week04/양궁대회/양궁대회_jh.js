// 배열을 복사할 때는 arr1 = [...arr2]라고 하기 정말 제발 꼭!!^^
// 함수에서 리턴한 배열값을 새 배열에 대입해야 할 때도
// return [...arr]이라고 하기 꼭!!!!^^*** 제발제발 꼭 제발제발!!^^

/*
    1. 라이언이 대회를 진행했을 때 가능한 결과를 모두 확인할 것
    2. 라이언이 화살을 다 쐈을 때 어피치와 라이언의 점수 차가 제일 큰 경우를 구함
    3. 가장 큰 점수 차가 나는 경우가 여러개이면 낮은 점수를 많이 맞힌 경우를 구함
 */

// 어피치와 라이언의 점수 차를 구하는 함수
const getTotalDiffrence = (shootAppeach, shootRyan) => {
    // 어피치가 쏜 화살 갯수가 라이언이 쏜 것보다 크거나 같고
    // 쏜 화살 갯수가 0이 아닐 때의 점수들을 더해줌
    const appeachTotalScore = shootAppeach.reduce((total, current, index) => 
                                                 total + (current >= shootRyan[index] && current !== 0 ? (10 - index) : 0), 0);
    // 라이언이 어피치보다 화살을 많이 쐈을 때의 점수들을 합함
    const ryanTotalScore = shootRyan.reduce((total, current, index) => total + (current > shootAppeach[index] ? (10 - index) : 0), 0);
    // 두 사람의 점수 차를 리턴
    return ryanTotalScore - appeachTotalScore;
}
// 가장 낮은 점수를 많이 맞힌 경우를 리턴
const getMaxShoot = (maxShootRyan, shootRyan) => {
    // 낮은 점수니까 뒤에서부터 확인
    for (let i = 10; i >= 0; i--) {
        // maxShootRyan이 낮은 점수를 많이 맞췄다면 이 놈을 리턴
        if(maxShootRyan[i] > shootRyan[i]) {
            return maxShootRyan;
        }
        // 반대면 shootRyan 리턴
        else {
            return shootRyan;
        }
    }
}

const solution = (n, info) => {
    // 라이언이 쏜 결과
    const shootRyan = new Array(11).fill(0);
    // 라이언이 가장 큰 점수 차로 이길 때의 결과
    let maxShootRyan = new Array(11).fill(0);
    // 가장 큰 점수 차
    let maxTotalDifference = 0;
    const combination = (shootAppeach, shootRyan, ryanArrowCnt) => {
        // 라이언이 화살을 다 쐈을 때
        if (ryanArrowCnt === 0) {
            // 현재 점수 차 구하고
            const currentTotalDifference = getTotalDiffrence(shootAppeach, shootRyan);
            // 현재 점수 차가 maxTotalDifference보다 크다면
            if (maxTotalDifference < currentTotalDifference) {
                // maxTotalDifference 값 갱신하고 maxShootRyan도 갱신
                maxTotalDifference = currentTotalDifference;
                maxShootRyan = [...shootRyan];
            }
            // 현재 점수 차와 maxTotalDifference보다 같다면
            else if (maxTotalDifference === currentTotalDifference) {
                // 가장 낮은 점수를 많이 맞힌 경우를 구해서 maxShootRyan 값 갱신
                maxShootRyan = [...getMaxShoot(maxShootRyan, shootRyan)];
            }
            return;
        }
        // 가능한 모든 경우를 확인 (조합)
        for (let i = 0; i < 11; i++) {
            // 아직 라이언이 화살을 쏘지 않았을 경우
            if(shootRyan[i] === 0) {
                let shootCnt;
                // 라이언이 현재 점수를 딸 수 있으면 어피치보다 한발 더 쏨
                if(shootAppeach[i] < ryanArrowCnt) {
                    shootCnt = shootAppeach[i] + 1;
                }
                // 라이언이 점수를 못 따는 상황이면 어쨌든 쏘긴 해야되니까
                // 남은 화살 다 쏨
                else {
                    shootCnt = ryanArrowCnt;
                }
                // 화살 쐈으니 남은 화살 개수 갱신 
                ryanArrowCnt -= shootCnt;
                // 라이언 점수 기록
                shootRyan[i] = shootCnt;
                // 이어서 탐색
                combination(shootAppeach, shootRyan, ryanArrowCnt);
                // 리턴됐다는건 후에 현재 인덱스를 확인해야 한다는 거니까
                // 남은 화살 개수 쏜 만큼 더해주고 화살 안 쏜걸로 바꿔줌
                ryanArrowCnt += shootCnt;
                shootRyan[i] = 0;
            }
        }
        return;
    }
    combination(info, shootRyan, n);
    // 라이언이 어피치에게 지거나 비길 수 밖에 없다면 [-1] 리턴
    if(maxTotalDifference === 0) {
        return [-1];
    }
    else {
        return maxShootRyan;
    }
}