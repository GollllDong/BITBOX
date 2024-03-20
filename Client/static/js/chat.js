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
};

document.addEventListener("DOMContentLoaded", () => {
  const btnLogIn = document.querySelector("#btnLogIn");
  const btnChagMsg = document.querySelector("#btnChatMsg");
  const messageInput = document.querySelector("#messageInput");

  btnLogIn.addEventListener("click", sendLogIn);
  // btnChagMsg.addEventListener("click", sendChatMsg);
  messageInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendChatMsg(e);
      document.getElementById(id).value = null;
    }
  });
});
