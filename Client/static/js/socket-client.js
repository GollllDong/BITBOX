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


    // // <------------------------------세션 스토리지 추가-------------------------------->
    // const msgObj = JSON.parse(e.data);
    // if (msgObj.cmd === "login" && msgObj.result === "ok") {
    //     // 로그인 성공 시 세션 스토리지에 'user_id', 'id_idx' 저장
    //     sessionStorage.setItem("user_id", msgObj.data.user_id);
    //     sessionStorage.setItem("id_idx", msgObj.data.id_idx);
    //     // 로그인 후에 반환된 user_id와 id_idx를 로그인한 웹 세션에 고정시키고
    //     // 기능을 서버에 요청할 때마다 cmd와 user_id를 보낼 수 있게 
    // }
};
// sessionStorage.getItem("id_idx", msgObj.data.id_idx);
// //서 - 클 연결간 == 세션
// setItem 으로 저장했고
// user_id = getItem 변수에 넣어주고
// // 
// window 객체(모든애들이 공유라)에 전역변수 var 타입으로 선언하면 
// 아무대서나 쓸 수 있음 

// nimoh

// 전역변수 남발 X 
// 필요할 때만 뽑아쓰도록..!(getItem)



const sendMessage = function (message) {
    socket.send(message); // 서버로 전송

    const log_msg = `클라이언트 => 서버 ${message}`;
    displayMessage("#messages", log_msg);
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
    switch (msgObj.cmd) {
        case "connect":
            msg = msgObj.result;
            break;
        case "signup":
            if (msgObj.result === "ok") {
                msg = "회원가입 성공";
            } else if (msgObj.result === "exist") {
                msg = "이미 존재하는 사용자입니다.";
            } else {
                msg = "회원가입 실패";
            }
            break;
        case "login":
            msg = msgObj.result === "ok" ? "로그인 성공" : "로그인 실패";
            break;

        // <-----------------------------insertpost 추가-------------------------------->
        case "insertpost":
            msg = msgObj.result === "ok" ? "게시물 작성 성공" : "게시물 작성 실패";
            break;
        // <----------------------------updatepost 추가-------------------------------->
        case "updatepost":
            msg = msgObj.result === "ok" ? "게시물 수정 성공" : "게시물 수정 실패";
            break;

        case "allchat":
            if ("id" in msgObj) {
                idMsg = `${msgObj.id}`;
                msg = `${msgObj.msg}`;
            }
            break;
    }

    // const childElem = document.createElement("h3");
    // childElem.textContent = msg;
    // parentElem.appendChild(childElem);

    // 채팅부분
    const childIdElem = document.createElement("p");
    const childSpanElem = document.createElement("span");
    childIdElem.textContent = idMsg;
    childSpanElem.textContent = msg;
    if (childSpanElem.textContent != "" && childIdElem.textContent != "") {
        childIdElem.classList.add("chat_id");
        childSpanElem.classList.add("chat_msg");
        parentElem.appendChild(childIdElem);
        parentElem.appendChild(childSpanElem);
    }

};
