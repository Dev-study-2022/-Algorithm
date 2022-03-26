def jinsu(n, q):
    rev_base = ''

    while n > 0:
        n, mod = divmod(n, q)
        rev_base += str(mod)

    return rev_base[::-1]


def isPrime(n):
    if n == 1:
        return False

    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    else:
        return True


def solution(n, k):
    n_jinsu = jinsu(n, k)
    sp = n_jinsu.split('0')
    cnt = 0
    for s in sp:
        if s == '':
            continue
        s = int(s)
        if isPrime(s):
            cnt += 1
            continue

    return cnt
