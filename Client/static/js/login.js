//팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
}

//팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}

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
    //   document.addEventListener('DOMContentLoaded', ()=>{

    //       const login_btn = document.querySelector('#login_btn');

    //       login_btn.addEventListener('click', sendLogIn);

    //     $(document).ready(function(){
    //         $('.login_box img').on('click',function(){
    //             $('input').toggleClass('active');
    //             if($('input').hasClass('active')){
    //                 $(this).attr('class',"showPassword")
    //                 .prev('input').attr('type',"text");
    //             }else{
    //                 $(this).attr('class',"showPassword")
    //                 .prev('input').attr('type','password');
    //             }
    //         });
    //     });
        
    //   });