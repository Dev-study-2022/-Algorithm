import re
from collections import defaultdict
# https://wikidocs.net/4309
def solutionV0(user_id, banned_id):
    """
    재확인 필요
    오히려 정규식 쓰는 것이 더 별루인듯,,
    """
    start = 0
    result = defaultdict(set)

    # 모든 경우의 수를 파악
    for ban in banned_id:
        ban = ban.replace('*', '.')
        pattern = re.compile(f'{ban}\Z')
        for user in user_id[start:]:
            m = pattern.search(user)
            if not m:
                continue
            else:
                result[ban].add(user)
    print(result)
    answer = list(map(list, result.values()))

    cnt = 1
    for a in answer:
        cnt *= len(a)

    return cnt

from itertools import permutations 

def check(users,banned_id):
    for i in range(len(banned_id)):
        if len(users[i]) != len(banned_id[i]): # 숫자 체크
            return False

        for j in range(len(users[i])): # 문자열 하나하나 보기
            if banned_id[i][j] == "*":
                continue
            if banned_id[i][j] != users[i][j]:
                return False # 현재 튜플 불일치
    
    return True

def solution(user_id, banned_id):
    user_permutation = list(permutations(user_id,len(banned_id))) # 전체의 경우의 수 확인
    banned_Set = []

    for users in user_permutation:
        # 하나의 튜플과 비교 시작
        if not check(users, banned_id):
            continue # 다음 튜플 가져오기
        else:
            users = set(users)
            if users not in banned_Set:
                banned_Set.append(users)

    return len(banned_Set)

# print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "abc1**"]))
print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["*rodo", "*rodo", "******"]))
