/*로그인 버튼*/
function openLoginPopup() {
    var url = '../Client/login/login.html'; // 열고자 하는 페이지의 URL
    var features = 'width=700, height=600, top=50, left=50, scrollbars=yes'; // 팝업 창의 속성
    window.open(url, '_blank', features); // 팝업 창 열기
}