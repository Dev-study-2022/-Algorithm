def solution(land):
    # 처음에는 DP인줄 알았음
    # 모든 경우 체크
    for i in range(1, len(land)):
        # 1로 시작하는 이유 : 0층은 계산하지 x
        # 1층 (누적) = 0층 최대 + 1층 값
        for j in range(len(land[0])):
            land[i][j] = max(land[i-1][:j] + land[i-1][j+1:]) + land[i][j]

    return max(land[-1])
