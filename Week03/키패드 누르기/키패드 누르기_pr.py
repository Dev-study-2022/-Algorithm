def solution(numbers, hand):
    result = ''
    # 키패드
    key = {1 : (0,0), 2: (1,0), 3:(2,0),
           4:(0,1), 5:(1,1), 6:(2,1),
           7:(0,2), 8:(1,2), 9:(2,2),
           '*':(0,3),0:(1,3),'#':(2,3)}
    left = '*'
    right = '#'

    for i in numbers:
        if i in (1, 4, 7):
            result += 'L'
            left = i
        elif i in (3, 6, 9):
            result += 'R'
            right = i
        else: # 가운데 열의 경우 거리를 계산하여, if-else로 비교
            l_i = sum(list(map(lambda x: abs(x[0]-x[1]), list(zip(key[i], key[left])))))
            r_i = sum(list(map(lambda x: abs(x[0]-x[1]), list(zip(key[i], key[right])))))
            if l_i < r_i or (l_i == r_i and hand == 'left'):
                result += 'L'
                left = i
            elif l_i > r_i or (l_i == r_i and hand == 'right'):
                result += 'R'
                right = i
    return result