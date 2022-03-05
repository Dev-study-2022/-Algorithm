# list comprehension : if-else vs if 차이 존재
def solution(absolutes, signs):
    ne = [absolutes[x] if signs[x] else -absolutes[x] for x in range(len(absolutes))]
    return sum(ne)

print(solution([4,7,12], [True, False, True]))
