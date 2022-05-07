# 기똥차게, 출발지 도착지를 둘 다 수집
def solution2(dirs):
    s = set()
    d = {'U': (0, 1),
         'D': (0, -1),
         'R': (1, 0),
         'L': (-1, 0)}
    
    x, y = 0, 0 # 원점
    for i in dirs:
        # NEXT X, NEXT Y
        nx, ny = x + d[i][0], y + d[i][1]
        if -5 <= nx <= 5 and -5 <= ny <= 5:
            s.add((x, y, nx, ny))
            s.add((nx, ny, x, y))
            x, y = nx, ny
    return len(s) // 2
