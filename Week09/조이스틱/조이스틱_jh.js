// 처음 풀이, 장렬하게 틀림 짱나~~!!
// 드럽게 복잡하긴 했어,..쩝...
function solution(name) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
    const alphabetLength = alphabet.length;
    const notAIndex = [];
    const nameLength = name.length;
    let answer = 0, notAIndexLength, currentNotAIndex = 0;

    name.split("").forEach((x, index) => {
        if(x !== "A") {
            notAIndex.push(index);
        }
    })

    notAIndexLength = notAIndex.length;

    if(notAIndex[0] < nameLength - notAIndex[notAIndexLength - 1]) {
        currentNotAIndex = 0;
        answer += notAIndex[0];
    }
    else {
        currentNotAIndex = notAIndexLength - 1;
        answer += nameLength - notAIndex[notAIndexLength - 1];
    }
    for(let i = 0; i < notAIndexLength; i++) {
        const alphabetIndex = alphabet.indexOf(name[notAIndex[currentNotAIndex]]);

        answer += Math.min(alphabetIndex, alphabetLength - alphabetIndex);
        if(i === notAIndexLength - 1) {
            break;
        }
        if(currentNotAIndex === 0) {
            if(notAIndex[1] - notAIndex[0] > nameLength - (notAIndex[notAIndexLength - 1] - notAIndex[0])) {
                answer += nameLength - (notAIndex[notAIndexLength - 1] - notAIndex[0]);
                currentNotAIndex = notAIndexLength - 1;
            }
            else {
                answer += notAIndex[1] - notAIndex[0];
                currentNotAIndex = 1;
            }
        }
        else if(currentNotAIndex === notAIndexLength - 1) {
            if(notAIndex[notAIndexLength - 1] - notAIndex[notAIndexLength - 2] > nameLength - (notAIndex[notAIndexLength - 1] - notAIndex[0])) {
                answer += nameLength - (notAIndex[notAIndexLength - 1] - notAIndex[0]);
                currentNotAIndex = 0;
            }
            else {
                answer += notAIndex[notAIndexLength - 1] - notAIndex[notAIndexLength - 2];
                currentNotAIndex = notAIndexLength - 2;
            }
        }
        else {
            if(notAIndex[currentNotAIndex + 1] - notAIndex[currentNotAIndex] > notAIndex[currentNotAIndex] - notAIndex[currentNotAIndex - 1]) {
                answer += notAIndex[currentNotAIndex] - notAIndex[currentNotAIndex - 1];
                currentNotAIndex = currentNotAIndex - 1;
            }
            else {
                answer += notAIndex[currentNotAIndex + 1] - notAIndex[currentNotAIndex];
                currentNotAIndex = currentNotAIndex + 1;
            }
        }
    }

    return answer;
}

// 풀이 참고: https://ghost4551.tistory.com/113?category=982768
function replaceAt(str, index, alphabet) {
    return str.substr(0, index) + alphabet + str.substr(index + 1);
}
function solution(name) {
    const nameLength = name.length;
    let currentName = Array(nameLength).fill("A").join("");
    let answer = 0, index = 0;

    while(currentName !== name) {
        let next = 0;
        for(let i = 0; i < nameLength; i++) {
            let left = (index - i + nameLength) % nameLength;
            let right = (index + i) % nameLength;
            if(name[right] !== currentName[right]) {
                next = right;
            }
            else if(name[left] !== currentName[left]) {
                next = left;
            }
            else {
                continue;
            }
            answer += i + Math.min(name.charCodeAt(next) - 'A'.charCodeAt(0),
                'Z'.charCodeAt(0) - name.charCodeAt(next) + 1);
            currentName = replaceAt(currentName, next, name[next]);
            break;
        }
        index = next;
    }

    return answer;
}
