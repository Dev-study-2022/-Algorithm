from queue import PriorityQueue

# https://m.blog.naver.com/kks227/220796029558
def dijstra(road, N):
    queue = PriorityQueue()
    queue.put([1, 0])

    # dist = [float('inf') for _ in range(N + 1)]
    dist = [float('inf')] * (N + 1) # index접근을 쉽게 하기 위함
    dist[1] = 0 # 첫 출발지 이므로 거리는 0

    while not queue.empty():
        current, current_cost = queue.get()
        for src, dest, cost in road:
            new_cost = cost + current_cost
            # 양방향이기 때문에 방향 2개 고려
            if src == current and new_cost < dist[dest]: # 최소값으로 갱신
                dist[dest] = new_cost
                queue.put([dest, new_cost])
            elif dest == current and new_cost < dist[src]:
                dist[src] = new_cost
                queue.put([src, new_cost])
    return dist


def solution(N, road, K):
    dist = dijstra(road, N)
    return len([x for x in dist if x <= K])
