# 엄청 복잡할 줄 알았는데 생각보다 풀만했던..
from dollections import deque
# popleft를 사용하기 위함

def bfs(start, visitied, graph):
    queue = deque([start])
    result = 1
    visitied[start] = True
    while queue:
        now = queue.popleft()

        for i in graph[now]:
            if visitied[i] == False:
                result += 1
                queue.append(i)
                visitied[i] = True

    return result

def solution(n, wires):
    answer = n
    # 누가 누구랑 이어져 있는지
    graph = [[] for _ in range(n + 1)]

    for v1, v2 in wires:
        graph[v1].append(v2)
        graph[v2].append(v1)
    # [[], [3], [3], [1, 2, 4], [3, 5, 6, 7], [4], [4], [4, 8, 9], [7], [7]]

    for start, not_visit in wires:
        visitied = [False] * (n + 1)
        visitied[not_visit] = True
        result = bfs(start, visitied, graph)
        if abs(result - (n - result)) < answer:
            answer = abs(result - (n - result))

    return answer
