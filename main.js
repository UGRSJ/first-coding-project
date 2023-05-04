
// html과 자바스크립 확인하며, 필요에 따라 자바스크립트에서는 변수 선언 후, 함수 // html에서는 자바스크립트로 불러오기 위해 id값 부여
//랜덤번호지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누른다
// 만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
// 랜덤 번호가 < 유저번호 : 유저번호 down
//랜덤 번호가 > 유저번호 : 유저번호 up
//reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 아렬준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.
//유저 인풋 입력 후, 인풋 값에 커서 넣으면 이전값 제거하기


let computerNum = 0;
let playButton = document.getElementById("playButton"); // 클릭 시 자바스크립트로 이벤트 실행을 위해 html에 있는 플레이버튼을 자바스크립트로 불러온다 > html에 id를 주어 자바스크립트로 불러옴 > 변수 선언 > 이벤트리스ㅌ너 추가 > play 함수 만들기 >if문 활요하여 유저와 컴퓨터 값 비교
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("resetButton");
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history = []


playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
    userInput.value = "";   
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;

    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;
    
    if (userValue<1 || userValue>100) {
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요"
        return;
    }
    if (history.includes(userValue)) { //includes 함수
        resultArea.textContent ="이미 입력한 숫자입니다. 다른숫자를 입력해주세요"
        return;        //return을 안쓰면 이 조건이 의미가 없음(계속 동일 숫자 입력가능)
    }
    chances --;
    chanceArea.textContent = `남은기회 : ${chances}번`; //잘 외워두기 : 정적인값과 동적인 값을 함께 쓸때 활용
    console.log("chance", chances);


    if (userValue < computerNum) {
        resultArea.textContent = "UP!!"
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN!!"
    } else  {
        resultArea.textContent = "맞췄습니다"
        gameOver=true;
    }

    history.push(userValue) // 유저가 어떤 값을 입력한 후, 쭉 검사를 하고>>업앤 다운의 히스토리, push(유저 밸류값을) 넣어준다, push 함수
    console.log(history);

    if (chances < 1) {
        gameOver=true;
        }
    if (gameOver == true) {
        playButton.disabled = true
    }
}


function reset() {
    // user input창이 깨끗하게 정리되고
    userInput.value ="";
    // 새로운 번호가 생성되고
    pickRandomNum();

    resultArea.textContent = "결과값이 여기 나옵니다!";
}

pickRandomNum();
