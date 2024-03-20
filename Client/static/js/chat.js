let userId = ""; // id 보관용

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
});
