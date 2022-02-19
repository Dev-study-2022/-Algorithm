from collections import deque

# 동서남북
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

def bfs(candidate, place):
    queue = deque() # 데크(Queue) 사용 (BFS)
    visited = [[False] * 5 for _ in range(5)] # 방문한 곳을 기록하는 list
    queue.append(candidate)
    cnt = 0

    while queue:
        x, y = queue.popleft()
        visited[x][y] = True
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or nx >= 5 or ny < 0 or ny >= 5:
                continue
            if visited[nx][ny]:
                continue
            if place[nx][ny] == 'X': # 벽이 있는 경우는 무시, 거리두기를 위반X
                continue
            if place[nx][ny] == 'P': # 사람이 있는 경우 return False
                return False
            queue.append((nx, ny))

        cnt += 1
        if cnt == 2:
            return True # 2까지 거리를 유지한 것이므로 return True, 더 계산할 필요 없음.
    return True # False되지 않으면 return True


def solution(places):
    answer = []

    for place in places:
        candidates = deque()
        flag = True
        for i in range(5):
            for j in range(5):
                if place[i][j] == 'P':
                    candidates.append((i, j)) # 확인할 응시자들 좌표를 추가

        for candidate in candidates:
            if not bfs(candidate, place):
                flag = False # flag를 통해 결과 진단
                break

        if not flag:
            answer.append(0)
        else:
            answer.append(1)

    return answer

print(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]))