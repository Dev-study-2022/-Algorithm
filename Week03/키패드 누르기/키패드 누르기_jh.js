/*
    키패드를 아래와 같이 변경 
    [1, 2, 3]
    [4, 5, 6]
    [7, 8, 9]
    [10, 11, 12]
    * -> 10, 9 -> 11, # -> 12
   => 키패드가 이차원 배열 상에 있다고 생각하고
      각 숫자의 위치를 행, 열로 표현하기 위해
      1행, 1열부터 시작
*/
// 나머지 반환
// x가 3의 배수이면 3을 반환
// 3의 배수들은 3열이기 때문
function getRemainder(x) {
    const remainder = x % 3;
    return remainder === 0 ? 3 : remainder;
}
// 숫자 간 거리를 반환
function getDistance(a, b) {
    const xDifference = Math.ceil(a / 3) - Math.ceil(b / 3);
    const yDifference = getRemainder(a) - getRemainder(b);
    return Math.abs(xDifference) + Math.abs(yDifference);
}

function solution(numbers, hand) {
    let answer = "";
    // 왼, 오 엄지 첫 시작은 *과 #
    let leftLocation = 10, rightLocation = 12;
    // 왼손 움직이는 함수
    const moveLeft = (number) => {
        leftLocation = number;
        answer += "L";
    };
    // 오른손 움직이는 함수
    const moveRight = (number) => {
        rightLocation = number;
        answer += "R";
    }
    
    numbers.forEach(number => {
        let remainder;
        // 0은 11로 변경해줌
        number = number === 0 ? 11 : number;
        remainder = number % 3;
        // 1, 4, 7이면 왼손 이동
        if(remainder === 1) {
            moveLeft(number);
        }
        // 3, 6, 9이면 오른손 이동
        else if(remainder === 0) {
            moveRight(number);
        }
        // 2, 5, 8, 0이면
        else {
            // 왼손이 더 가까우면 왼손이 이동
            if(getDistance(leftLocation, number) < getDistance(rightLocation, number)) {
                moveLeft(number);
            }
            // 오른손이 더 가까우면 오른손이 이동
            else if(getDistance(leftLocation, number) > getDistance(rightLocation, number)) {
                moveRight(number);
            }
            // 같으면
            else {
                // 편한 손 움직임
                // ** 삼항 연산자로 변경했더니 마지막 테케가 2ms 넘게 걸림 (원래는 0.56ms)
                // => 알고리즘 풀 때는 삼항 연산자보다는 if-else 문 사용해주자
                if(hand === "left") {
                    moveLeft(number);
                }
                else {
                    moveRight(number);
                }
            }
        }
    })
    return answer;
}