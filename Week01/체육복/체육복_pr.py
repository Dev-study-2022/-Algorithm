def solution(n, lost, reserve):
    # reserve가 lost의 가능성 : 여벌의 체육복이 있는 학생도 도난 당할 수 있다.
    res = set(reserve) - set(lost)
    # res = [r for r in reserve if r not in lost]
    los = set(lost) - set(reserve)

    # 뒤에를 먼저 준다면 겹치는 경우가 있으니 앞을 먼저 : Greedy
    # 무조건 앞을 준다는 가정 하에, 앞이 충족 됐다면 뒤를 주기.
    for r in res:
        if r - 1 in los: # left
            los.remove(r - 1)
        elif r + 1 in los: # right
            los.remove(r + 1)

    return n - len(los)
