# replace 여러개 : maketrans
def solution(s):
    s = s.replace('{', '[') #,s.count('{') : 바꿀 횟수 but 소용이 없었다..
    s = s.replace('}', ']', s.count('}'))
    s = sorted(eval(s), key=lambda x: len(x)) # [[2], [2, 1], [2, 1, 3], [2, 1, 3, 4]]
    result = []
    for i in s:
        set_i = set(i)
        if len(result) == 0: # set으로 교집합을 진행, 아무 것도 없을 때 추가
            # result += i
            result.extend(i)
        else:
            set_result = set(result)
            add = list(set_i - set_result) # 이미 들어가 있는 것을 제외하고 추가
            result += add

    return result

solution("{{2},{2,1},{2,1,3},{2,1,3,4}}")
