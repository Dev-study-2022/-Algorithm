def solution(n, left, right):
    """
    인덱스를 n으로 나눈 몫과 나머지 중에서 큰 값에 +1을 한 정수가 1차 배열로 변환 시
    해당 인덱스의 값이 된다.
    """
    result = []
    for i in range(int(left), int(right + 1)): # int 이슈
        result.append(max(i // n, i % n) + 1)
    return result
