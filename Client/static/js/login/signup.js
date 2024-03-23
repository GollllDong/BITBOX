
const sendSignup = function () {
    const user_id = document.querySelector("#idInput").value;
    const user_pw = document.querySelector("#passInput").value;
    const user_name = document.querySelector("#userNameInput").value;
    const course_id = document.querySelector("#courseIdInput").value;
    const course_code = document.querySelector("#courseCodeInput").value;

    const packet = {
        cmd: "signup",
        user_id: user_id,
        user_pw: user_pw,
        user_name: user_name,
        course_id: course_id,
        course_code: course_code

    };
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};


document.addEventListener("DOMContentLoaded", () => {
    const createAcct_btn = document.querySelector("#createAcct_btn");

    createAcct_btn.addEventListener("click", sendSignup);
});
