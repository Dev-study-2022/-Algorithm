# 순서가 있음
def solution(s):
    s = s.replace('{','[',s.count('{'))
    s = s.replace('}',']',s.count('}'))
    s = sorted(eval(s), key=lambda x: len(x))#[[2], [2, 1], [2, 1, 3], [2, 1, 3, 4]]
    result = []
    for i in s:
        set_i = set(i)
        if len(result) == 0:
            result += i
        else:
            set_result = set(result)
            add = list(set_i - set_result)
            result += add

    return result
