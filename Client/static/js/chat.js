let userId = ""; // id 보관용
let cnt = 0;

const sendLogIn = function () {
  const id = document.querySelector("#idInput").value;
  const pass = document.querySelector("#passInput").value;
  userId = id; // 나중에 msg전송 때 사용하기 위해
  const packet = {
    cmd: "login",
    id: id,
    pass: pass,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);
};
const sendChatMsg = function () {
  const message = document.querySelector("#messageInput").value;
  const packet = {
    cmd: "allchat",
    id: userId,
    msg: message,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);

  prepareScroll();
};

const newChatMsg = function () {
  const packet = {
    cmd: "newchat",
    room: cnt,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);

  const chatAdd = document.querySelector(".chat_add");
  const addDiv = document.createElement("div");
  chatAdd.after(addDiv);
  addDiv.classList.add("chat_list");
  addDiv.id = 'chat_list' + cnt;
  addDiv.textContent = "채팅방" + cnt++;
};

const enterChatMsg = function () {
  const packet = {
    cmd: "enterchat",
    id: userId,
    room: cnt,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);

};

// 스크롤 아래로 향하게
function prepareScroll() {
  window.setTimeout(scrollUl, 50);
}
function scrollUl() {
  let chatUl = document.querySelector("#messages");
  chatUl.scrollTop = chatUl.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnLogIn = document.querySelector("#btnLogIn");
  const btnChagMsg = document.querySelector("#btnChatMsg");
  const messageInput = document.querySelector("#messageInput");
  let chatForm = document.querySelector("#messages");
  const newChatBtn = document.querySelector("#chat_add_btn");



  btnLogIn.addEventListener("click", sendLogIn);
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

  // 채팅방 들어가기 버튼
  // addEventListener("click", function () {
  //   console.log(this);
  //   this.classList.add("select");
  // });
});
