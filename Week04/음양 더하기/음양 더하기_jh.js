function solution(absolutes, signs) {
    const answer = absolutes.reduce((total, absolute, index) => total + absolute * (signs[index] ? 1 : -1), 0)
    return answer;
}