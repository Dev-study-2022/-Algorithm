def solution(N,a,b):
    cnt = 1
    repeat = 2 # N이 2이상이어서
    while repeat != N:
        na, nb = (a - 1) // repeat, (b - 1) // repeat
        if na == nb:
            break
        cnt += 1
        repeat *= 2
    return cnt

def solution2(n,a,b): # 2를 나눠서 같이 되는 위치를 확인
    answer = 0
    while a != b:
        answer += 1
        # 1을 더해서 2로 나누었을 때, 자리수를 맞춰줌
        # 예) 1, 2의 경우는 2, 3으로 해서 나눴을때 몫이 1이 되도록
        a, b = (a+1)//2, (b+1)//2
    return answer

def solution3(n,a,b):
    return ((a-1)^(b-1)).bit_length() # bit_length() : 해당 비트의 자리 수