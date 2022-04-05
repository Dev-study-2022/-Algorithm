"""
(현재까지 온 거리) x 2를 확인 후 논리로 접근해야함!
"""
def solution(N):
    count = 1
    while N != 1:
        if N % 2 == 1:
            N = (N-1) // 2
            count += 1
        else:
            N = N // 2
    
    return count
