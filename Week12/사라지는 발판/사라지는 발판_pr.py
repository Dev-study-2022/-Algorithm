# 백트래킹 vs DFS vs 브루트포스
# https://github.com/joi0104/BOJ/wiki/%EB%B0%B1%ED%8A%B8%EB%9E%98%ED%82%B9-vs-DFS-vs-%EB%B8%8C%EB%A3%A8%ED%8A%B8%ED%8F%AC%EC%8A%A4
# Minimax algorithm
# https://going-to-end.tistory.com/entry/Minimax-algorithm-%EB%AF%B8%EB%8B%88%EB%A7%A5%EC%8A%A4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
# 가장 설명이 잘된 블로그
# https://yjyoon-dev.github.io/kakao/2022/01/23/kakao-2022-blind-07/

# 코드 : https://blog.encrypted.gg/1032
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
n, m = 0, 0

def OOB(x, y):
    return x < 0 or x >= n or y < 0 or y >= m

vis = [[0] * 5 for _ in range(5)]
block = [[0] * 5 for _ in range(5)]

# 현재 상태에서 둘 다 최적의 플레이를 할 때 남은 이동 횟수
# 반환 값이 짝수 : 플레이어가 패배함을 의미, 홀수 : 플레이어가 승리함을 의미
# curx, cury : 현재 플레이어의 좌표, opx, opy : 상대 플레이어의 좌표
def solve(curx, cury, opx, opy):
    global vis, block
    # 플레이어가 밟고 있는 발판이 사라졌다면
    if vis[curx][cury]:
        return 0
    ret = 0
    # 플레이어를 네 방향으로 이동시켜 다음 단계로 진행할 예정
    for dir in range(4):
        nx = curx + dx[dir]
        ny = cury + dy[dir]
        if OOB(nx, ny) or vis[nx][ny] or block[nx][ny] == 0:
            continue
        vis[curx][cury] = 1

        # 플레이어를 dir 방향으로 이동시켰을 때 턴의 수
        # 다음 함수를 호출할 때 opx, opy, nx, ny 순으로 호출해야 함에 주의
        val = solve(opx, opy, nx, ny) + 1

        # 방문 표시 해제
        vis[curx][cury] = 0

        # 1. 현재 저장된 턴은 패배인데 새로 계산된 턴은 승리인 경우
        if ret % 2 == 0 and val % 2 == 1:
            ret = val  # 바로 갱신
        # 2. 현재 저장된 턴과 새로 계산된 턴이 모두 패배인 경우
        elif ret % 2 == 0 and val % 2 == 0:
            ret = max(ret, val)  # 최대한 늦게 지는걸 선택
        # 3. 현재 저장된 턴과 새로 계산된 턴이 모두 승리인 경우
        elif ret % 2 == 1 and val % 2 == 1:
            ret = min(ret, val)  # 최대한 빨리 이기는걸 선택
    return ret


def solution(board, aloc, bloc):
    global n, m
    n = len(board)
    m = len(board[0])
    for i in range(n):
        for j in range(m):
            block[i][j] = board[i][j]
    return solve(aloc[0], aloc[1], bloc[0], bloc[1])

# https://sujeng97.tistory.com/36
# 미니맥스트리란 1:1 게임에서 쓰일 수 있는 알고리즘이다. 나와 상대방은 항상 최선을 다하기 때문에, 실수하지 않고 매번 최선의 방법만 택한다.
# 따라서 내가 고른 최선은 상대방에겐 최악이 되고 상대방이 고른 최선은 나에겐 최악이 된다.
# 이 문제에서는 이기는 사람은 최단경로로 이기려 하고, 지는 사람은 최대경로로 지려고 한다.
# 따라서 재귀를 돌때 만약 이길 수 있다면, 최단경로를 리턴해주고 만약 진다면 최대경로를 리턴해준다.
# 다른 풀이 2 

dir = ((-1,0),(0,1),(1,0),(0,-1))

def A_turn(ar,ac,br,bc,cnt,board):
    if board[ar][ac] == 0:
        return (1,cnt)
    winner = []
    loser = []
    flag = False
    for dr, dc in dir:
        nr, nc = ar+dr, ac+dc
        if 0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] == 1:
            flag = True
            temp = [row[:] for row in board]
            temp[ar][ac] = 0
            iswin,turn = B_turn(br,bc,nr,nc,cnt+1,temp)
            if iswin:
                winner.append(turn)
            else:
                loser.append(turn)
    if flag:
        if winner:
            return (0, min(winner))
        else:
            return (1, max(loser))
    else:
        return (1, cnt)


def B_turn(br,bc,ar,ac,cnt,board):
    if board[br][bc] == 0:
        return (1,cnt)
    winner = []
    loser = []
    flag = False
    for dr, dc in dir:
        nr, nc = br + dr, bc + dc
        if 0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] == 1:
            flag = True
            temp = [row[:] for row in board]
            temp[br][bc] = 0
            iswin, turn = A_turn(ar,ac,nr,nc,cnt+1,temp)
            if iswin:
                winner.append(turn)
            else:
                loser.append(turn)
    if flag:
        if winner:
            return (0,min(winner))
        else:
            return (1,max(loser))
    else:
        return (1,cnt)


def solution2(board, aloc, bloc):
    ar,ac,br,bc = aloc[0],aloc[1],bloc[0],bloc[1]
    answer = A_turn(ar,ac,br,bc,0,board)[1]
    return answer
