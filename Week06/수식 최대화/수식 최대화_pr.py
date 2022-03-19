# 다른 분꺼 참조했던 기억이 있음
def solution(expression):
    # 모든 경우의 수를 그냥 지정
    operations = [('+', '-', '*'),('+', '*', '-'),('-', '+', '*'),('-', '*', '+'),('*', '+', '-'),('*', '-', '+')]
    answer = []
    for op in operations:
        a = op[0] # 첫번째꺼로 분리
        b = op[1] # 두번째꺼로 분리
        temp_list = []
        for e in expression.split(a):
            temp = [f"({i})" for i in e.split(b)]
            temp_list.append(f'({b.join(temp)})')
        answer.append(abs(eval(a.join(temp_list)))) # 나머지는 분리할 필요 없이 eval로 계산하여 append
    return max(answer)

