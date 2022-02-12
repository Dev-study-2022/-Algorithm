# 에라토스테네스의 채
def solution(n):
    # list index 0과 1은 제외하고 만든 리스트 = 소수는 2부터 생각
    result = [1, 1] + [0 for i in range(n-1)]

    # cnt += 1
    for i in range(2, n + 1):
        # 방법1
        # if li[i] == 0:
        #     cnt+=1
        # for j in range(i,n+1,i):
        #     li[j]=1
        
        # 방법2
        for j in range(i * 2, n + 1, i):
            result[j] = 1
            
    return result.count(0)
