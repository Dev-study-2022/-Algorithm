from itertools import permutations
# combinations 순열 : 중복되지 않는 모든 조합
# permutations 조합 : 중복되는 모든 조합
# 완전 탐색
# 던전 총 개수 -> 최대 던전 개수부터 내려오면서 순열을 만든 후
# 모두 탐색하여 조검 만족시 return
def solution(k, dungeons):
    dun_num = len(dungeons)
    answer = 0

    for per in permutations(dungeons, dun_num):
        hp = k # 총 피로도
        count = 0
        for pm in per:
            if hp >= pm[0]:
                hp -= pm[1]
                count += 1
        # 더 많아지는 경우 갱신
        answer = max(count, answer)

    return answer
