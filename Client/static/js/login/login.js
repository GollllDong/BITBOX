//팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";

}

//팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}


const sendSignup = function () {
    const user_id = document.querySelector("#idInput").value;
    const user_pw = document.querySelector("#passInput").value;
    const user_name = document.querySelector("#name").value;
    const course_id = document.querySelector("#course").value;
    const course_code = document.querySelector("#code").value;

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


const sendLogIn = function () {

    const user_id = document.querySelector('#idInput').value;
    const user_pw = document.querySelector('#passInput').value;
    const packet = {
        cmd: 'login',
        user_id: user_id,
        user_pw: user_pw
    };
    const jsonStr = JSON.stringify(packet);     // js객체 -> json문자열
    sendMessage(jsonStr);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBefore = document.getElementById("loginBefore");
    const loginAfter = document.getElementById("loginAfter");
    const login_error = document.getElementById("login_error");

    if (sessionStorage.getItem("user_id") !== null) {
        loginBefore.style.display = "none";
        loginAfter.style.display = "block";
    }

    const login_btn = document.querySelector('#login_btn');
    if (login_btn) login_btn.addEventListener('click', sendLogIn);

    const createAcct_btn = document.querySelector("#createAcct_btn");
    if (createAcct_btn) createAcct_btn.addEventListener("click", sendSignup);

    const showPasswordIcon = document.querySelector('.showPassword'); // 눈 아이콘을 가리키는 요소 선택
    if (showPasswordIcon) showPasswordIcon.addEventListener('click', function () {
        const passwordInput = document.querySelector('#passInput');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('active'); // 클래스를 토글합니다.
    });
});
