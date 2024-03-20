let user_id = "";

const sendSignup = function () {
    const userId = document.querySelector("#idInput").value;
    const user_pw = document.querySelector("#passInput").value;
    // const user_pw = document.querySelector("#passCheck").value;

    user_id = userId; // 나중에 msg전송 때 사용하기 위해
    const packet = {
        cmd: "signup",
        user_id: user_id,
        user_pw: user_pw,
    };
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};

document.addEventListener("DOMContentLoaded", () => {
    const createAcct_btn = document.querySelector("#createAcct_btn");

    createAcct_btn.addEventListener("click", sendSignup);
});