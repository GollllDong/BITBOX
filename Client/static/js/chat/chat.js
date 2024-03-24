let cnt = 0;
let roomname = "";
let user_id = sessionStorage.getItem("user_id");
let roomNum = 0;

// 스크롤 아래로 향하게
function prepareScroll() {
  window.setTimeout(scrollUl, 50);
}
function scrollUl() {
  let chatUl = document.querySelector("#messages");
  chatUl.scrollTop = chatUl.scrollHeight;
}

// 채팅방 생성하기
const newChatMsg = function () {
  const chatAdd = document.querySelector(".chat_add");
  const addDiv = document.createElement("div");
  chatAdd.after(addDiv);
  addDiv.classList.add("chat_list");
  let roomname = addDiv.id = 'chat_list' + cnt;
  let room = cnt; // enterchat 패킷에 넘겨주기위함
  addDiv.textContent = "채팅방" + cnt;

  // 채팅방 들어가기
  addDiv.addEventListener("click", function () {
    const box = document.querySelector(".chat_list_box");
    const messageBox = document.querySelector("#messages");

    for (let selectedDiv of box.children) {
      if (selectedDiv.classList.contains("select")) {
        selectedDiv.classList.remove("select");
      }
    }
    this.classList.add("select");

    enterChatMsg(room, roomname);
    messageBox.textContent = room + "채팅방입니다.";

  })

  const packet = {
    cmd: "newchat",
    id: user_id,
    room: cnt,
    name: roomname,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);

  cnt++;
};

// 해당 채팅방 들어가기
const enterChatMsg = function (room, roomname) {
  const packet = {
    cmd: "enterchat",
    id: user_id,
    room: room,
    name: roomname,
  };
  roomNum = room;
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);
};

// 채팅하기
const sendChatMsg = function () {
  const message = document.querySelector("#messageInput").value;
  const packet = {
    cmd: "chat",
    id: user_id,
    msg: message,
    room: roomNum,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);

  prepareScroll();
};

// 채팅방 가져오기
const getChat = function () {
  const packet = {
    cmd: "getchat",
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);
};

document.addEventListener("DOMContentLoaded", () => {
  const btnChagMsg = document.querySelector("#btnChatMsg");
  const messageInput = document.querySelector("#messageInput");
  let chatForm = document.querySelector("#messages");
  const newChatBtn = document.querySelector("#chat_add_btn");

  btnChagMsg.addEventListener("click", function (e) {
    e.preventDefault();
    sendChatMsg(e);
    messageInput.value = null;
  });
  messageInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendChatMsg(e);
      messageInput.value = null;
    }
  });

  // 채팅방 셍성 버튼
  newChatBtn.addEventListener('click', newChatMsg);
});
