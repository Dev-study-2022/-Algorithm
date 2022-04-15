def solution(s):
    # 제거할 0의 수, 반복하는 횟수
    remove_zero, cnt = 0, 0
    while s != "1":
        remove_zero += s.count("0")
        s = len(''.join(s.split("0")))
        # 어짜피 1의 개수, s = s.count("1")
        s = bin(s)[2:] # 0b 제거
        cnt += 1
    return [cnt, remove_zero]

solution("110010101001")
