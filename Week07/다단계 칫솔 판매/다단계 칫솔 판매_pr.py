def solution(enroll, referral, seller, amount):
    sub = dict()
    money = dict()

    # 구조 생성
    for idx, en in enumerate(enroll):
        sub[en] = referral[idx]
        money[en] = 0

    for ix, i in enumerate(seller):
        person = i
        val = amount[ix] * 100 # 칫솔의 가격은 100
        while True: # 돈 계산
            if val * 0.1 < 1:
                money[person] += val
                break
            money[person] += val - int(val * 0.1)
            if sub[person] == '-':
                break
            person = sub[person]
            val = int(val * 0.1)

    return [v for v in money.values()]
