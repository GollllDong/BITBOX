// 현재 날짜와 오늘의 날짜를 각각 저장
let CDate = new Date(); // 현재 날짜
let today = new Date(); // 오늘의 날짜

// 캘린더를 생성하는 함수 호출
buildCalendar();

function buildCalendar() { // 캘린더를 생성하는 함수 생성
    let prevLast = new Date(CDate.getFullYear(), CDate.getMonth(), 0); // 이전 달의 마지막 날짜(0은 이전달의 마지막날을 나타냄)
    let thisFirst = new Date(CDate.getFullYear(), CDate.getMonth(), 1); // 이번 달의 첫째 날짜
    let thisLast = new Date(CDate.getFullYear(), CDate.getMonth() + 1, 0); // 이번 달의 마지막 날짜
    document.querySelector(".yearTitle").innerHTML = CDate.getFullYear(); // 상단에 년도 출력
    document.querySelector(".monthTitle").innerHTML = CDate.getMonth() + 1; // 상단에 월 출력(getMonth는 0부터 시작해서 +1 해주어야함)
    let dates = []; // 현재 월 달력에 쓰일 날짜를 모을 배열 생성
    if (thisFirst.getDay() != 0) { // 만약 이번 월의 첫째날이 일요일이 아니라면(0은 일요일을 의미)
        for (let i = 0; i < thisFirst.getDay(); i++) { // 일요일부터 이번 월의 요일까지 날짜를 구하기 위한 for문
            dates.unshift(""); // 이전 월의 마지막 날짜부터 1씩 빼가며 공백 처리
        }
    }
    for (let i = 1; i <= thisLast.getDate(); i++) { // 이번 월 날짜 구하기
        dates.push(i);
    }
    for (let i = 1; i <= 42 - thisLast.getDate() - thisFirst.getDay(); i++) { // 다음 월 날짜 구하기
        dates.push("");
    }
    let htmlDates = ''; // 날짜 정보를 html형식으로 저장할 변수
    for (let i = 0; i < 42; i++) { // 42일을 출력할 for문
        if (today.getDate() == dates[i] && today.getMonth() == CDate.getMonth() && today.getFullYear() == CDate.getFullYear()) { // 만약 년도, 월, 일이 똑같은 dates[i]값이 나오면 class에 today를 추가하기 위함.
            // 이를 이용해서 today 클래스에만 테두리를 줄 것임.
            htmlDates += `<div class="date today">${dates[i] !== "" ? dates[i] : ""}</div>`; // 공백이 아니면 날짜 정보 저장, 공백이면 빈 칸 처리
        } else {
            htmlDates += `<div class="date">${dates[i] !== "" ? dates[i] : ""}</div>`; // 공백이 아니면 날짜 정보 저장, 공백이면 빈 칸 처리
        }
    }
    document.querySelector(".dates").innerHTML = htmlDates; // htmlDates를 index.html의 .dates안에 넣는 작업
}

function prevCal() {
    CDate.setMonth(CDate.getMonth() - 1); // 현재 날짜에서 -1
    buildCalendar();    // buildCalendar 함수를 다시 돌린다.
}

function nextCal() {
    CDate.setMonth(CDate.getMonth() + 1); // 현재 날짜에서 +1
    buildCalendar();    // buildCalendar 함수를 다시 돌린다.
}