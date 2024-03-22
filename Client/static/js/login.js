


//팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";

}

//팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}

// 로그아웃 시 세션 스토리지에서 로그인 상태 삭제
const logout = function () {
    sessionStorage.removeItem(SESSION_KEY);
    // 나머지 로그아웃 처리 코드...
};
const SESSION_KEY = "user_login";

console.log(document.getElementById("loginBefore"));

const isLoggedIn = sessionStorage.getItem(SESSION_KEY) === "true";
// 페이지 로드 시 로그인 상태에 따라 UI 변경
window.onload = function () {
    const loginBefore = document.getElementById("loginBefore");
    const loginAfter = document.getElementById("loginAfter");

    if (sessionStorage.getItem("user_id") !== null) {
        console.log(isLoggedIn);
        loginBefore.style.display = "none";
        loginAfter.style.display = "block";
        // } else {
        //     console.log(isLoggedIn +"$$$$$$$");
        //     loginBefore.style.display = "block";
        //     loginAfter.style.display = "none";
    }
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

    const login_btn = document.querySelector('#login_btn');

    login_btn.addEventListener('click', sendLogIn);
});

// 비밀번호 보이기, 감추기
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('#login_btn');
    loginBtn.addEventListener('click', sendLogIn);

    const loginBoxImg = document.querySelector('.login_box img');
    loginBoxImg.addEventListener('click', function () {
        const passwordInput = document.querySelector('#passInput');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('showPassword');
    });
});

// 로그인 성공 시 페이지 전환
