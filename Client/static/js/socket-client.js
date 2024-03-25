// const SERVER_IP = "192.168.0.20";
const SERVER_IP = "192.168.0.21";
const SERVER_PORT = "9000";
const server_address = `ws://${SERVER_IP}:${SERVER_PORT}`; // ws://127.0.0.1:9000

const socket = new WebSocket(server_address);


let isConnected = false; // 초기값은 연결되지 않았음을 의미합니다.


socket.onopen = function (e) {
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


const loginSuccess = function (msgObj) {
    console.log("로그인 성공!");

    // 로그인 성공 시 세션 스토리지에 'user_id', 'id_idx' 저장
    sessionStorage.setItem("user_id", msgObj.user_id);
    sessionStorage.setItem("id_idx", msgObj.id_idx);
};


// 로그인 성공 시 호출
const connectionSuccess = function (msgObj) {
    isConnected = true;
    // console.log(isConnected);

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
    } else if (currentPage.includes('to-do.html')) {

        sendShowDailyCommand();
        sendShowStudyCommand();
        sendShowEtcCommand();
    }
};


// 이벤트 로그 출력
const displayMessage = function ($parentSelector, log_msg, kind_log = 0) {
    if (kind_log === 0 || kind_log === 2) console.log(log_msg);
    if (kind_log === 1 || kind_log === 2) {

        const parentElem = document.querySelector($parentSelector);

        const childElem = document.createElement("div");
        childElem.textContent = log_msg;
        parentElem.appendChild(childElem);
    }
};


// 통신 패킷 출력
const displayPacketMessage = function ($parentSelector, message) {

    const parentElem = document.querySelector($parentSelector);

    const msgObj = JSON.parse(message);

    let msg = "";
    let idMsg = "";
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
        case "getuser":
            msg = msgObj.result === "ok" ? "작성자 확인 성공" : "작성자 확인 실패";
            if (msgObj.result === "ok") {
                const user = msgObj.post; // 변수명을 post로 수정
                updateUIWithPostWriter(user);
            }
            break;
        case "insertpost":
            msg = msgObj.result === "ok" ? "게시물 작성 성공" : "게시물 작성 실패";
            if (msgObj.result === "ok") {
                alert("게시물 작성을 완료했어요.")
                // 게시물 수정 성공 시 이전 페이지로 이동
                const currentUrl = window.location.href; // 현재 페이지의 전체 URL
                const baseUrl = currentUrl.split("/Client")[0]; // 기본 URL 경로 추출
                const previousPageUrl = `${baseUrl}/Client/board/postReadAll.html`; // 이전 페이지의 전체 URL 생성
                window.location.href = previousPageUrl; // 이전 페이지로 이동
            } else {
                alert("게시물 작성을 실패했어요.");
            }
            break;
        case "updatepost":
            msg = msgObj.result === "ok" ? "게시물 수정 성공" : "게시물 수정 실패";
            if (msgObj.result === "ok") {
                alert("게시물 수정을 완료했어요.")
                const currentUrl = window.location.href; // 현재 페이지의 전체 URL
                const baseUrl = currentUrl.split("/Client")[0]; // 기본 URL 경로 추출
                const previousPageUrl = `${baseUrl}/Client/board/postReadAll.html`; // 이전 페이지의 전체 URL 생성
                window.location.href = previousPageUrl; // 이전 페이지로 이동
            } else {
                alert("게시물은 오직 작성자만 수정할 수 있어요.");
            }
            break;
        case "deletepost":
            msg = msgObj.result === "ok" ? "게시물 삭제 성공" : "게시물 삭제 실패";
            if (msgObj.result === "ok") {
                alert("게시물 삭제를 완료했어요.")
                const currentUrl = window.location.href; // 현재 페이지의 전체 URL
                const baseUrl = currentUrl.split("/Client")[0]; // 기본 URL 경로 추출
                const previousPageUrl = `${baseUrl}/Client/board/postReadAll.html`; // 이전 페이지의 전체 URL 생성
                window.location.href = previousPageUrl; // 이전 페이지로 이동
            } else {
                alert("게시물 삭제에 실패 했어요.");
            }
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
                const currentPage = window.location.pathname;
                if (currentPage.includes('postRead.html')) {
                    document.addEventListener('DOMContentLoaded', () => {
                        getLocation(post);
                    })
                } else if (currentPage.includes('postEdit.html')) {
                    document.addEventListener('DOMContentLoaded', () => {
                        updateUIWithPostEdit(post);
                    })
                } else if (currentPage.includes('postWrite.html')) {
                    document.addEventListener('DOMContentLoaded', () => {
                        updateUIWithPostWriter(postwrite);// 함수 호출 시 변수명도 post로 수정
                    })
                }
            } else {
                console.error("게시물 특정 조회 실패");
            }
            break;
        case "show_daily":
            if (msgObj.result === "ok") {
                const dailyList = msgObj.todos; // 변수명을 post로 수정
                displayDailyTodos(dailyList);
            } else {
                console.error("투두리스트 조회 실패");
            }
            break;
        case "show_study":
            if (msgObj.result === "ok") {
                const studyList = msgObj.todos; // 변수명을 post로 수정
                displayDailyTodos(studyList);
            } else {
                console.error("투두리스트 조회 실패");
            }
            break;
        case "show_etc":
            if (msgObj.result === "ok") {
                const etcList = msgObj.todos; // 변수명을 post로 수정
                displayDailyTodos(etcList);
            } else {
                console.error("투두리스트 조회 실패");
            }
            break;



    }

};
