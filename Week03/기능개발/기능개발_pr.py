def solution(progresses, speeds):
    answer = []
    days = 0
    count = 0

    while len(progresses) != 0:
        if progresses[0] + days * speeds[0] >= 100:
            progresses.pop(0) # deque 사용 가능. pop(0)으로 앞을 뽑아온다.
            speeds.pop(0)
            count += 1
        else:
            if count > 0:
                answer.append(count)
                count = 0
            days += 1

    answer.append(count)

    return answer
