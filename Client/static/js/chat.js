let cnt = 0;
let rommname = "";

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
  const chatAdd = document.querySelector(".chat_add");
  const addDiv = document.createElement("div");
  chatAdd.after(addDiv);
  addDiv.classList.add("chat_list");
  roomname = addDiv.id = 'chat_list' + cnt;
  addDiv.textContent = "채팅방" + cnt++;

  const packet = {
    cmd: "newchat",
    room: cnt,
    name: roomname,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);
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

  // 채팅방 들어가기 버튼
  // addEventListener("click", function () {
  //   console.log(this);
  //   this.classList.add("select");
  // });
});
