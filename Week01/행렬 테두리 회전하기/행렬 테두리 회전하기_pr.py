def solution(rows, columns, queries):
    answer = []
    # 행렬 판(board) 생성
    board = [[i + j * columns for i in range(1, columns + 1)] for j in range(rows)]

    for a, b, c, d in queries:
        stack = []
        # 좌표 값으로 변경 (n-1)
        # 세로 값을 x, 가로 값을 y : list로 생각하려다 보니 헷갈릴 수 있음
        x1, y1, x2, y2 = a - 1, b - 1, c - 1, d - 1

        for i in range(y1, y2 + 1): # 위 가로
            stack.append(board[x1][i])
            if len(stack) == 1: # stack[-2]를 위해서 조건문 추가 : indexError
                continue
            else:
                board[x1][i] = stack[-2]

        for j in range(x1 + 1, x2 + 1): # 오른쪽 세로
            stack.append(board[j][i])
            board[j][i] = stack[-2]

        for k in range(y2 - 1, y1 - 1, -1): # 아래 가로, 거꾸로 -1
            stack.append(board[j][k])
            board[j][k] = stack[-2]

        for l in range(x2 - 1, x1 - 1, -1): # 왼쪽 세로, 거꾸로 -1
            stack.append(board[l][k])
            board[l][k] = stack[-2]

        answer.append(min(stack))

    return answer

print(solution(6, 6, [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]]))
