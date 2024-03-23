// const SERVER_IP = "192.168.0.20";
const SERVER_IP = "127.0.0.1";
const SERVER_PORT = "9000";
const server_address = `ws://${SERVER_IP}:${SERVER_PORT}`; // ws://127.0.0.1:9000

const socket = new WebSocket(server_address);

socket.opopen = function (e) {
    const log_msg = "[open] 연결이 설정되었습니다.";

    displayMessage("#messages", log_msg);
};

socket.onclose = function (e) {
    let log_msg = "";
    if (e.wasClean)
        log_msg = `[close] 연결이 정상적으로 종료되었습니다. 코드=${e.code}, 원인=${e.reason}`;
    else
        log_msg = `[close] 연결이 비정상적으로 종료되었습니다.. 코드=${e.code}, 원인=${e.reason}`;

    displayMessage("#messages", log_msg);
};

socket.onerror = function (error) {
    const log_msg = `[error] ${error.message}`;

    displayMessage("#messages", log_msg);
};

socket.onmessage = function (e) {
    const log_msg = `[message] 서버로부터 데이터 수신 : ${e.data}`;

    displayMessage("#messages", log_msg);
    displayPacketMessage("#messages", e.data);

};



const sendMessage = function (message) {
    socket.send(message); // 서버로 전송

    const log_msg = `클라이언트 => 서버 ${message}`;
    displayMessage("#messages", log_msg);
};



window.onload = function () {
    // const loginBefore = document.getElementById("loginBefore");
    // const loginAfter = document.getElementById("loginAfter");

    // if (sessionStorage.getItem("user_id") !== null) {
        
    //     loginBefore.style.display = "none";
    //     loginAfter.style.display = "block";
        // } else {
        //     console.log(isLoggedIn +"$$$$$$$");
        //     loginBefore.style.display = "block";
        //     loginAfter.style.display = "none";
    // }
};



const loginSuccess = function (msgObj) {
    console.log("로그인 성공!");

    // 로그인 성공 시 세션 스토리지에 'user_id', 'id_idx' 저장
    sessionStorage.setItem("user_id", msgObj.user_id);
    sessionStorage.setItem("id_idx", msgObj.id_idx);
};



// 이벤트 로그 출력
const displayMessage = function ($parentSelector, log_msg, kind_log = 0) {
    if (kind_log === 0 || kind_log === 2) console.log(log_msg);
    if (kind_log === 1 || kind_log === 2) {
        // 이 요소 아래에 메시지 요소를 추가
        const parentElem = document.querySelector($parentSelector);

        const childElem = document.createElement("div");
        childElem.textContent = log_msg;
        parentElem.appendChild(childElem);
    }
};

// 통신 패킷 출력
const displayPacketMessage = function ($parentSelector, message) {
    // 이 요소 아래에 메시지 요소를 추가
    const parentElem = document.querySelector($parentSelector);
    // json문자열 -> js 객체로 변환
    const msgObj = JSON.parse(message);

    let msg = "";
    let idMsg = "";
    let loginInfo = "";
    switch (msgObj.cmd) {
        case "connect":
            msg = msgObj.result;
            break;
        case "signup":
            if (msgObj.result === "ok") {
                msg = "회원가입 성공";
                window.location.href = '../../index.html';
                // location.href = '../../index.html';
                //페이지 이동 & openpopup
            } else if (msgObj.result === "exist") {
                msg = "이미 존재하는 사용자입니다.";
            } else {
                msg = "회원가입 실패";
            }
            break;
        case "login":
            if (msgObj.result === "ok") {
                loginSuccess(msgObj);
                closePop();
                location.reload()   //페이지 새로고침
            } else {
                alert("로그인 실패");
            }
            break;
        case "insertpost":
            msg = msgObj.result === "ok" ? "게시물 작성 성공" : "게시물 작성 실패";
            break;
        case "updatepost":
            msg = msgObj.result === "ok" ? "게시물 수정 성공" : "게시물 수정 실패";
            break;
        case "deletepost":
            msg = msgObj.result === "ok" ? "게시물 삭제 성공" : "게시물 삭제 실패";
            break;
        case "getallpost":
            if (msgObj.result === "ok") {
                const allPosts = msgObj.posts;
                // allPosts를 이용하여 UI를 업데이트하는 코드 작성
                updateUIWithAllPosts(allPosts);
            } else {
                console.error("게시물 전체 조회 실패");
            }
            break;
        case "getpost":
            if (msgObj.result === "ok") {
                const post = msgObj.post; // 변수명을 post로 수정
                updateUIWithPost(post); // 함수 호출 시 변수명도 post로 수정
            } else {
                console.error("게시물 특정 조회 실패");
            }
            break;

        case "chat":
            if ("id" in msgObj) {
                idMsg = `${msgObj.id}`;
                msg = `${msgObj.msg}`;
            }
            break;
        case "newchat":
            msg = msgObj.result === "ok" ? "채팅방 생성 성공" : "채팅방 생성 실패";
            break;
        case "enterchat":
            msg = msgObj.result === "ok" ? `${msgObj.id}님이 들어왔습니다` : "채팅방 들어가기 실패";
            break;
    }

    // post 조회 뿌려줄 
    // const childIdElem = document.createElement(".table tbody tr"); 작성 필요

    // const childElem = document.createElement("h3");
    // childElem.textContent = msg;
    // parentElem.appendChild(childElem);


    // if (childSpanElem.textContent != "" && childIdElem.textContent != "") {
    //    // 채팅부분
    // const childIdElem = document.createElement("p");
    // const childSpanElem = document.createElement("span");
    // childIdElem.textContent = idMsg;
    // childSpanElem.textContent = msg;

    // childIdElem.classList.add("chat_id");
    // childSpanElem.classList.add("chat_msg");
    // parentElem.appendChild(childIdElem);
    // parentElem.appendChild(childSpanElem);
    // }

};
