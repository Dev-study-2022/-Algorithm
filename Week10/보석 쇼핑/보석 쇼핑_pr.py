# 단순하게 생각했던 거지... 그런거지...
def solution(gems):
    s = 0
    e = 1
    set_gems = set(gems)
    new_set = set(gems[s:e])

    while set_gems != set(new_set):
        e += 1
        new_set = set(gems[s:e])

    while len(set_gems - set(new_set)) == 0:
        s += 1
        new_set = set(gems[s:e])
        if s > e:
            break

    return [s,e]
  
# 다른 분 풀이 참고
def solution(gems):
    answer = [] 
    shortest = len(gems) + 1 # 현재 최단 구간 길이, 초기값은 가장 길게

    start_p = 0 # 구간의 시작점
    end_p = 0 # 구간의 끝 점 (보석을 체크하는 기준점)

    check_len = len(set(gems)) # 보석의 총 종류 수
    contained = {} # 현재 구간에 포함된 보석들(종류: 갯수)

    while end_p < len(gems): # 구간의 끝 점이 gems의 길이보다 작을 동안

        if gems[end_p] not in contained: # 현재 끝 점의 보석이 contained에 없다면(이 종류가 처음 발견되었다면)
            # dictionary에 추가
            contained[gems[end_p]] = 1
        else:
            # 이미 있으면
            contained[gems[end_p]] += 1
            
        end_p += 1 # 끝 점 증가

        if len(contained) == check_len: # 현재 구간 내 보석의 종류의 갯수가 전체 종류의 갯수와 같다면 (현재 구간내 모든 종류가 다 있다면)
            while start_p < end_p: # start_p 가 end_p 보다 같을 때까지 증가
                if contained[gems[start_p]] > 1: # start_p에 해당하는 보석이 구간 내에 하나 이상 있다면
                    contained[gems[start_p]] -= 1 # 구간 내 보석 하나 감소(start_p 의 보석 뺄거니까)
                    start_p += 1 # start_p 증가
                    
                elif shortest > end_p - start_p: # 기존의 구간 최단거리보다 현재의 구간거리가 더 짧다면
                    shortest = end_p - start_p
                    answer = [start_p+1, end_p] # answer와 최단거리 갱신
                    break
                    
                else:
                    break


    return answer
  
