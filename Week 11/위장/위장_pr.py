def mysolution(clothes):
    # [의상의 이름, 의상의 종류]
    key = list(zip(*clothes))[1]
    dic = {k: [] for k in key}
    for value, k in clothes:
        dic[k].append(value)
    total = 1
    for t in list(map(lambda x: len(x) + 1, dic.values())):
        total *= t
    return total - 1

def solution1(clothes):
    # dictionary를 이용한 카운팅
    # https://www.daleseo.com/python-collections-counter/
    from collections import Counter
    # 여러 개의 데이터를 대상으로 누적 집계
    # https://www.daleseo.com/python-functools-reduce/
    from functools import reduce
    cnt = Counter([kind for name, kind in clothes])
    answer = reduce(lambda x, y: x*(y+1), cnt.values(), 1) - 1
    return answer


print(mysolution([["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]))
