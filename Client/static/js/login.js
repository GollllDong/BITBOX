//팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
}

//팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}

// 서버로 전송
let userId = '';        // id 보관용

const sendLogIn = function () {
    const userId = document.querySelector('#idInput').value;
    const user_pw = document.querySelector('#passInput').value;
    user_id = userId;        // 나중에 msg전송 때 사용하기 위해
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
