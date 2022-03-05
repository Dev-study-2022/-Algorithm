// 시간을 분단위 숫자로 변환
// "12:03" -> 723
const convertTimeToNum = (time) => {
    const [hour, minute] = time.split(":");
    return parseInt(hour) * 60 + parseInt(minute);
}
// 출차시간과 입차 시간의 차이를 구해서 주차 시간을 구함
const getParkingTime = (inTime, outTime) => {
    return convertTimeToNum(outTime) - convertTimeToNum(inTime);
}
// 주차요금 구함
const getParkingFee = (fees, time) => {
    const [defaultTime, defaultFee, unitTime, unitFee] = fees;
    // 주차시간이 기본시간보다 적으면 기본 요금만 냄
    if(time < defaultTime) {
        return defaultFee;
    }
    else {
        return defaultFee + (Math.ceil((time - defaultTime) / unitTime) * unitFee);
    }
}

const solution = (fees, records) => {
    const answer = [];
    // 차량 주차시간을 저장 ("2563" : 2345)
    const carParkingTimeList = {};
    // 차량의 입차시간을 저장 ("2456" : {name: "2456", time: 234})
    const carInTimeList = {};
    // 차량의 주차시간을 계산해서 값 저장
    const calculateParkingTime = (carNum, time) => {
        // 한번도 출차된 적 없는 차량일 경우
        if(!carParkingTimeList.hasOwnProperty(carNum)) {
            // 현재 차량의 이름과 주차시간을 계산해서 저장
            carParkingTimeList[carNum] = {name: carNum, time: getParkingTime(carInTimeList[carNum], time)};
        }
        // 이미 출차된 적 있는 차량이면
        else {
            // 기존 값에 주차시간 계산해서 더함
            carParkingTimeList[carNum].time += getParkingTime(carInTimeList[carNum], time);
        }
        // 출차됐으니 리스트에서 해당 차량 제거
        delete carInTimeList[carNum];
    }
    records.forEach(record => {
        const [time, carNum, inOut] = record.split(" ");
        // 입차됐다면
        if(inOut === "IN") {
            // 입차한 차량 번호와 시간 저장
            carInTimeList[carNum] = time;
        }
        // 출차됐다면 주차시간 저장하는 함수 호출
        else {
            calculateParkingTime(carNum, time);
        }
    })
    // 출차 기록이 없는 차량이 있다면
    for(const key in carInTimeList) {
        // 23:59에 출차한 것으로 가정해서 주차시간 계산
        calculateParkingTime(key, "23:59");
    }
    // 차량 이름으로 정렬하기 위해 answer 배열에 값 저장
    for(const key in carParkingTimeList) {
        answer.push([carParkingTimeList[key].name, carParkingTimeList[key].time]);
    }
    // 차량 이름 오름차순으로 정렬
    answer.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    // 각 차량의 주차요금 계산해서 주차요금만 반환
    return answer.map(x => getParkingFee(fees, x[1]));
}