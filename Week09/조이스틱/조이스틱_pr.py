def solution_v0(name):
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

# 정답 풀이
"""
Greedy -> Brute Force
기본 최소 이동 횟수 = 길이 - 1

연속되는 A가 있을 때, 그것의 왼쪽이나 오른쪽부터 시작하며 알파벳을 변경하는 것이 가장 효율적이다.
때문에 (기존, 왼쪽부터 시작, 오른쪽부터 시작) 중에서 minimum이 답이다.

연속되는 A의 최대 길이가 핵심포인트.
연속되는 A가 있는 곳에는 굳이 갈 필요가 없으므로, 그 부분을 제외하고 수정하는 경우를 계산한다.
다만, 연속되는 A가 여러군데인 경우 가장 긴 부분을안가는게 더 효율적일 것이다.
ex) JAAJAAAAJ 인 경우 4번째 J를 처리하기 위해서 2, 3번째의 연속된 AA를 건너는게 5,6,7,8번쨰의 연속된 AAAA를 건너는 것 보다 낫다
"""
def solution(name):

	# 조이스틱 조작 횟수 
    answer = 0
    
    # 기본 최소 좌우이동 횟수는 길이 - 1
    min_move = len(name) - 1
    
    for i, char in enumerate(name):
    	# 해당 알파벳 변경 최솟값 추가
        # A에서 시작 or Z에서 밑으로
        answer += min(ord(char) - ord('A'), ord('Z') - ord(char) + 1)
        
        # 해당 알파벳 다음부터 연속된 A 문자열 찾기
        next = i + 1
        while next < len(name) and name[next] == 'A':
            next += 1
            
        # 기존, 연속된 A의 왼쪽시작 방식, 연속된 A의 오른쪽시작 방식 비교 및 갱신
        min_move = min([min_move, 2 *i + len(name) - next, i + 2 * (len(name) -next)])
        
    # 알파벳 변경(상하이동) 횟수에 좌우이동 횟수 추가
    answer += min_move
    return answer
