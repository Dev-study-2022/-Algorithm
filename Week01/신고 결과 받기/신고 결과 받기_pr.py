def solution(id_list, report, k):
    report = list(set(report))
    id_dict = {id: [] for id in id_list}
    sin_dict = {id: 0 for id in id_list}

    for r in report:
        user, sin = r.split()
        id_dict[user].append(sin)
        sin_dict[sin] += 1

    answer = [0 for i in range(len(id_list))]
    for i in range(len(id_list)):
        for iv in id_dict[id_list[i]]:
            if sin_dict[iv] >= k:
                answer[i] += 1

    return answer


if __name__ == "__main__":
    print(solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], k=2))
    print(solution(["con", "ryan"], ["ryan con", "ryan con", "ryan con", "ryan con"], k=3))
