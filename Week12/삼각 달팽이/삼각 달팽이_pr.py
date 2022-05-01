def solution(n):
    answer = []
    for i in range(1, n + 1):
        answer.append([0 for j in range(i)])
    # 왼쪽으로 정렬하여 생각
    # 좌표 초기화 => 처음 시작은 아래로 내려가기 때문에 x = -1
    x, y = -1, 0
    num = 1
    for i in range(n):  # 방향
        for j in range(i, n):  # 좌표 구하기
            if i % 3 == 0:  # 하
                x += 1
            elif i % 3 == 1:  # 우
                y += 1
            else:  # 상
                x -= 1
                y -= 1
            answer[x][y] = num
            num += 1
    # sum(answer, [])를 쓰면
    # [[1], [2, 9], [3, 10, 8], [4, 5, 6, 7]]
    # [1, 2, 9, 3, 10, 8, 4, 5, 6, 7]
    return sum(answer, [])


print(solution(4))
