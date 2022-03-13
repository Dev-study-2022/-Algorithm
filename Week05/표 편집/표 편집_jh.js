/*
    풀이 과정
    1. 처음에는 배열 사용, 나름 시간복잡도 줄이기 위해 배열 추가, 삭제 안 하고
       머리 써서 풀었음. 근데 테케 반은 틀리고 효율성 갈림
    2. 단방향 연결리스트 사용, 풀이하던 중에 up명령어 들어왔을 때나 delete하고 위로 올라갈 때
       처리가 너무 복잡해져서 고민하다가 양방향 연결리스트가 떠오름 
    3. 양방향 연결리스트 사용!
 */

// 노드 클래스 정의
class Node {
    // 데이터, 왼쪽 포인터, 오른쪽 포인터
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
// 처음에 노드 n개 생성하는 함수
const initNode = (n) => {
    // head 생성 
    const head = new Node(0);
    let previousNode = head;
    
    for (let i = 1; i < n; i++) {
        // 노드 생성하고 양 옆으로 연결
        const currentNode = new Node(i);
        currentNode.left = previousNode;
        previousNode.right = currentNode;
        previousNode = currentNode;
    }
        
    return head;
}
// 특정 노드 삭제
const deleteNode = (currentNode) => {
    // 현재 노드의 왼, 오 노드
    const leftNode = currentNode.left;
    const rightNode = currentNode.right;
    // 현재 노드가 head일 경우
    if(!leftNode) {
        rightNode.left = null;
        currentNode = rightNode;
    }
    // 현재 노드가 맨 마지막 노드일 경우
    else if(!rightNode) {
        leftNode.right = null;
        currentNode = leftNode;
    }
    // 현재 노드가 중간 노드라면
    else {
        leftNode.right = rightNode;
        rightNode.left = leftNode;
        currentNode = rightNode;
    }
    // 변경된 현재 노드 리턴
    return currentNode;
}
// 가장 최근에 삭제한 노드 복구
const restoreNode = (node) => {
    const leftNode = node.left;
    const rightNode = node.right;
    // 왼쪽 노드가 있을 경우에
    if(leftNode) {
        leftNode.right = node;
    }
    // 오른쪽 노드가 있다면
    if(rightNode) {
        rightNode.left = node;
    }
    // 매개변수로 넘어온 node는 최근에 삭제한
    // 노드(currentNode)를 참조하므로 여기서 node left, right 값을 변경하면
    // 함수 바깥에 있는 currentNode left, right 값도 변경됨
}

const solution = (n, k, cmd) => {
    // 삭제한 노드 저장
    const deleteNodeArr = [];
    // 행 삭제 여부
    const answer = Array(n).fill("O");
    // 헤드 포인터
    let head = initNode(n);
    // 처음 현재노드는 헤드를 바라봄
    let currentNode = head;
    
    while(k--) {
        currentNode = currentNode.right;
    }
    
    cmd.forEach(oneCmd => {
        const [cmdType, cnt] = oneCmd.split(" ");
        let moveCnt = cnt;
        // 오른쪽(아래)으로 이동
        if(cmdType === "D") {
            while(moveCnt--) {
                currentNode = currentNode.right;
            }
        }
        // 왼쪽(위)으로 이동
        else if(cmdType === "U") {
            while(moveCnt--) {
                currentNode = currentNode.left;
            }
        }
        // 노드 삭제
        else if(cmdType === "C") {
            deleteNodeArr.push(currentNode);
            currentNode = deleteNode(currentNode);
        }
        // 가장 최근에 삭제한 노드 복원
        else {
            restoreNode(deleteNodeArr.pop());
        }
    })
    // 마지막까지 복구되지 않은 노드들은 X 표시
    deleteNodeArr.forEach(node => {
        answer[node.data] = "X";
    })
    
    return answer.join("");
}