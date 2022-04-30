function solution(n, words) {
    const length = words.length;
    // 단어가 등장한 횟수 저장 
    const wordsMap = {};
    const answer = [];
    // 이전단어의 마지막 글자와 현재단어의 첫번째 글자를 비교할건데
    // 처음에는 단어를 무족권 일치하게 만들기 위해 
    // 이전 단어에 첫번째 단어의 마지막 글자를 넣어놓음
    let previousWord = words[0][0];
    
    // 처음엔 forEach로 작성했었는데 끝말잇기가 끝나면
    // 반복문을 종료했어야 했는데 종료 안 해서 겁내 틀렸었음..^^ㅠ
    // forEach는 return으로 반복문을 종료해야 해서 그냥 for문 씀
    for(let index = 0; index < length; index++) {
        const word = words[index]
        if(wordsMap.hasOwnProperty(word)) {
            wordsMap[word]++;
        }
        else {
            wordsMap[word] = 1;
        }
        // 이전 단어의 마지막 글자와 현재 단어의 첫번째 글자가 다르거나
        // 단어가 중복된다면 그 사람의 차례와 몇번째에 틀렸는지 배열에 넣음
        if(previousWord[previousWord.length - 1] !== word[0]
           || wordsMap[word] >= 2) {
            answer.push((index % n) + 1);
            answer.push(Math.floor(index / n) + 1);
            break;
        }
        previousWord = word;
    }
    // 끝말잇기 틀린 사람이 없으면 [0, 0] 넣음
    if(answer.length === 0) {
        answer.push(0); 
        answer.push(0);
    }

    return answer;
}