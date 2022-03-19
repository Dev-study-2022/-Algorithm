# from queue import PriorityQueue : 우선순위큐를 사용하는 또 다른 모듈
import heapq
# 둘 모듈의 차이점 : https://slowsure.tistory.com/130

def solution(jobs):
    answer, now, i = 0, 0, 0
    start = -1
    heap = []

    while i < len(jobs): # 현재 시점에서 처리할 수 있는 작업을 heap에 저장
        for j in jobs:
            # 현재 시점에서 처리 가능 작업 판별
            # 요청시간이 바로 이전에 완료한 작업의 시작 시간보다 크고 지금보다 작거나 같아야 함
            if start < j[0] <= now:
                heapq.heappush(heap, [j[1], j[0]]) # 작업 소요 시간이 작은 것부터 뽑기 위해서 반대로 넣어줌

        if len(heap) > 0: # 처리할 작업이 있는 경우
            cur = heapq.heappop(heap)
            start = now
            now += cur[0]
            answer += now - cur[1] # 작업 요청시간부터 종료시간까지의 시간 계산
            i += 1
        else:# 처리할 작업이 없는 경우 다음 시간을 넘어감
            now += 1

    return answer // len(jobs)
