def solution(grid):
    # 이동 방향용 리스트 d
    d = [[-1, 0], [1, 0], [0, 1], [0, -1]]
    # 격자의 값에 따른 방향 이동 방법
    right = {0: 3, 1: 2, 2: 0, 3: 1}
    left = {0: 2, 1: 3, 2: 1, 3: 0}

    answer = []
    w, h = len(grid[0]), len(grid)
    # Visited 각 격자에서의 모든 방향을 이동하였는지 판단하는 리스트 case
    cases = [[[1] * 4 for _ in range(w)] for _ in range(h)]
    # print(cases)
    for y in range(h):
        for x in range(w):
            for i in range(4):
                # 이미 이동한 적 있는 방향은 판단 X
                if not cases[y][x][i]:
                    continue
                cnt = 0  # 길이 판단을 위한 변수
                ty, tx, ti = y, x, i  # 위치 ty, tx, 방향 ti
                while True:
                    cases[ty][tx][ti] -= 1
                    cnt += 1
                    now = grid[ty][tx]
                    # 현재 격자의 값을 확인하여 방향 결정
                    if now == 'L':
                        ti = left[ti]
                    elif now == 'R':
                        ti = right[ti]
                    # 4 --> 0 이런 식으로 통과되기 때문에 사용한 식
                    tx, ty = (tx + d[ti][1]) % w, (ty + d[ti][0]) % h
                    # 처음 출발점에 도착하면 완료
                    if tx == x and ty == y and ti == i:
                        break
                answer.append(cnt)

    # 값을 정렬 후 리턴
    answer.sort()
    return answer
