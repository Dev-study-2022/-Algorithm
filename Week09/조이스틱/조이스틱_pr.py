def solution(name):
    """
    왜 안대는지 모르는 코드 머선일이고,,, 예외 예시 확인, 그 이후 보정
    """
    name = list(name)
    answer = 0
    i = 0

    # 전부 확인하는 브루트 포스
    while True:
        answer += min(ord(name[i]) - ord('A'), ord('Z') - ord(name[i]) + 1)
        name[i] = 'A'

        if name.count('A') == len(name):
            return answer

        left, right = 1, 1
        for l in range(1, len(name)):
            if name[i-l] == 'A':
                left += 1
            else:
                break

        for r in range(1, len(name)):
            if name[i+r] == 'A':
                right += 1
            else:
                break

        if left < right:
            answer += left
            i -= left
        else:
            answer += right
            i += right

    return answer
