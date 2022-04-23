# 결국 모든 경우의 수를 확인하는 방법으로 진행
from itertools import combinations
import copy
def mysolution(numbers, target):
    answer = 0
    for i in range(len(numbers)):
        for com in list(combinations(range(len(numbers)), i+1)):
            print(com)
            ori = copy.deepcopy(numbers)
            for j in com:
                ori[j] = -ori[j] # 하나씩 마이너스를 만들어 본다
            if sum(ori) == target:
                answer += 1
    return answer

# product 사용
# https://velog.io/@davkim1030/Python-%EC%88%9C%EC%97%B4-%EC%A1%B0%ED%95%A9-product-itertools
from itertools import product
def solution2(numbers, target):
    l = [(x, -x) for x in numbers]
    s = list(map(sum, product(*l)))
    return s.count(target)

print(mysolution([4,1,2,1], 4))

# 재귀를 사용한 풀이
def solution1(numbers, target):
    if not numbers and target == 0:
        return 1
    elif not numbers:
        return 0
    else:
        return solution1(numbers[1:], target-numbers[0]) + solution1(numbers[1:], target+numbers[0])
