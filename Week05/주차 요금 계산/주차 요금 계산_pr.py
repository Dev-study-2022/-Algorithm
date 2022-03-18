from collections import defaultdict
# https://dongdongfather.tistory.com/69
from math import ceil


def getTime(time):
    """
    :param time: 시간 문자열을
    :return: 분 단위로 변경경    """
    h, m = time.split(':')
    return int(h) * 60 + int(m)


def calc(time, baseTime, baseFee, unitTime, unitFee):
    """
    주차 시간이 주어지면 주차 요금을 return
    """
    extraTime = max(0, time - baseTime)
    extraFee = ceil(extraTime / unitTime) * unitFee
    return baseFee + extraFee


def solution(fees, records):
    answer = []
    parkRecord = defaultdict(int) # 값을 초기화
    parkingLot = dict()
    baseTime, baseFee, unitTime, unitFee = fees

    for record in records:
        time, carNumber, type = record.split(' ')
        time = getTime(time)
        if type == "IN":
            parkingLot[carNumber] = time # 초기화해주지 않았을 때, 오류 발생 or get()사용 (: 다른 용도)
        else:
            parkRecord[carNumber] += (time - parkingLot[carNumber])
            del parkingLot[carNumber]

    # 마지막 까지 나가지 않은남은 차 처리
    for carNumber in parkingLot:
        parkRecord[carNumber] += (getTime("23:59") - parkingLot[carNumber])

    # 요금 계산표로 계산, dict 대신 list 사용은 추후 sort 때문
    for carNumber in parkRecord:
        fee = calc(parkRecord[carNumber], baseTime, baseFee, unitTime, unitFee)
        answer.append([carNumber, fee])

    # 자량 번호가 작은 자동차부터 주차 요금 return
    answer.sort()
    return [fee for car, fee in answer]

print(solution([180, 5000, 10, 600],["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))
