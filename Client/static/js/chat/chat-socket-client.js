const SERVER_IP = "192.168.0.21";
const SERVER_PORT = "9000";
const server_address = `ws://${SERVER_IP}:${SERVER_PORT}`; // ws://127.0.0.1:9000

const socket = new WebSocket(server_address);

let isConnected = false; // 초기값은 연결되지 않았음을 의미합니다.
socket.onopen = () => {
	const log_msg = "[open] 연결이 설정되었습니다.";
	displayMessage("#messages", log_msg);
	getChat();
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

const loginSuccess = function (msgObj) {
	// 로그인 후 UI 변경
	console.log("로그인 성공!");

	// 로그인 성공 시 세션 스토리지에 'user_id', 'id_idx' 저장
	sessionStorage.setItem("user_id", msgObj.user_id);
	sessionStorage.setItem("id_idx", msgObj.id_idx);
};

// 로그인 성공 시 호출
const connectionSuccess = function (msgObj) {
	isConnected = true;

	// 현재 페이지 URL 가져오기
	let currentPage = window.location.pathname;

	// 만약 현재 페이지가 postReadAll.html이라면 XXXX() 요청 함수 호출
	if (currentPage.includes('postReadAll.html')) {
		sendGetAllPost();
	} else if (currentPage.includes('postRead.html')) {
		sendGetPost();
	} else if (currentPage.includes('postEdit.html')) {
		sendGetPost();
	} else if (currentPage.includes('postWrite.html')) {
		sendGetUser();
	}

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
			connectionSuccess(msgObj);
			break;
		case "signup":
			if (msgObj.result === "ok") {
				msg = "회원가입 성공";
				// HTML의 <a> 태그를 사용하여 페이지 이동
				var link = document.createElement("a");
				link.href = "../index.html";
				document.body.appendChild(link);
				link.click();
				openPop();
				//페이지 이동 & openpopup
			} else if (msgObj.result === "exist") {
				alert("이미 존재하는 사용자입니다.");
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
				login_error.style.display = "block";
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
		case "getchat":
			if (msgObj.result === "ok") {
				const allChat = msgObj.chatList;
				getChatList(allChat);
			} else {
				console.error("게시물 전체 조회 실패");
			}
			break;
	}

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

const getChatList = function (allChat) {
	const chatListElem = document.querySelector(".chat_add");

	for (let i = 0; i < allChat.length; i++) {
		const chatElem = document.createElement("div");
		chatElem.textContent = "채팅방" + i;
		chatElem.classList.add("chat_list");
		chatListElem.after(chatElem);

		chatElem.addEventListener("click", function () {
			const box = document.querySelector(".chat_list_box");

			for (let selectedDiv of box.children) {
				if (selectedDiv.classList.contains("select")) {
					selectedDiv.classList.remove("select");
				}
			}
			this.classList.add("select");

			enterChatMsg(allChat[i].room_id, allChat[i].room_name);
		});
		console.log(allChat[i].room_id);
		console.log(allChat[i].room_id + 1);
		cnt = allChat[i].room_id + 1;
		console.log(cnt);
	}

}
