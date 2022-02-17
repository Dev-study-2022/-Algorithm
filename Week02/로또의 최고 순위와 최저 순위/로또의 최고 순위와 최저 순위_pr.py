def solution(lottos, win_nums):
    # 등수 구현, List 형태의 index 접근도 가능
    score = {6: 1, 5: 2, 4: 3, 3: 4, 2: 5, 1: 6, 0: 6}
    diff = lottos.count(0) # 최대 순위와 최저 순위의 차이인 0의 개수
    cnt = 0
    for wn in win_nums:
        if wn in lottos:
            cnt += 1

    # 방법 1
    # min_score = score[cnt] - diff
    # if min_score == 0:
    #     min_score = 1

    # return [min_score, score[cnt]]

    # 방법 2
    return [score[cnt + diff], score[cnt]]
