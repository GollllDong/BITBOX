// const SERVER_IP = "192.168.0.20";
const SERVER_IP = "127.0.0.1";
const SERVER_PORT = 1111;
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
  let infoMsg = "";
  switch (msgObj.cmd) {
    case "connect":
      infoMsg = msgObj.result;
      break;
    case "login":
      infoMsg = msgObj.result === "ok" ? "로그인 성공" : "로그인 실패";
      break;
    case "allchat":
      // if ("result" in msgObj)
      //   msg = msgObj.result === "ok" ? "채팅 전송 성공" : "채팅 전송 실패";
      // else 
      if ("id" in msgObj) 
        idMsg = `${msgObj.id}`;
        msg = `${msgObj.msg}`;
        
      break;
  }

  // 문구 설정
  const infoMsgElm = document.createElement("div");
  infoMsgElm.textContent = infoMsg;
  parentElem.appendChild(infoMsgElm);

  // 채팅부분
  const childIdElem = document.createElement("p");
  const childElem = document.createElement("span");
  childIdElem.textContent = idMsg;
  childElem.textContent = msg;
  
  if (childElem.textContent != "" && childIdElem.textContent != "") {
    childIdElem.classList.add("chat_id");
    childElem.classList.add("chat_msg");
    parentElem.appendChild(childIdElem);
    parentElem.appendChild(childElem);
  }
};
