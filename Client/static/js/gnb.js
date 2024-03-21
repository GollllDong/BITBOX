document.addEventListener('DOMContentLoaded', function() {
    // gnb 메뉴 아이템들을 가져옵니다.
    var gnbItems = document.querySelectorAll('.gnb_box li a');
   
    // 각 gnb 메뉴 아이템에 클릭 이벤트 리스너를 추가합니다.
    gnbItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // 기본 동작을 막습니다. (페이지 이동 방지)
            event.preventDefault();
           
            // 클릭된 링크의 텍스트 콘텐츠를 가져옵니다.
            var clickedGnb = item.textContent;
           
            // 클릭된 링크에 따라 처리를 수행합니다.
            switch(clickedGnb) {
                case 'HOME':
                    window.location.href = 'D:/BITBOX/Client/index.html';
                    break;
                case '게시판':
                    window.location.href = 'D:/BITBOX//Client/board/boardRead.html';
                    break;
                case '지도':
                    window.location.href = 'D:/BITBOX//Client/map/map_pop.html';
                    break;
                case '채팅':
                    window.location.href = 'D:/BITBOX//Client/chat/chat.html';
                    break;
                case '할 일':
                    window.location.href = 'D:/BITBOX//Client/todo/todo.html';
                    break;
                default:
                    // 기본적으로는 아무런 동작을 하지 않습니다.
            }
        });
    });




    // snb 메뉴 아이템들을 가져옵니다.
    var snbItems = document.querySelectorAll('.snb_nav.mb10 ul li a');




     // 각 snb 메뉴 아이템에 클릭 이벤트 리스너를 추가합니다.
     snbItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // 기본 동작을 막습니다. (페이지 이동 방지)
            event.preventDefault();
           
            // 클릭된 링크의 텍스트 콘텐츠를 가져옵니다.
            var clickedSnb = item.textContent;
           
            // 클릭된 링크에 따라 처리를 수행합니다.
            switch(clickedSnb) {
                case 'HOME':
                    window.location.href = 'D:/BITBOX/Client/index.html';
                    break;
                case '게시판':
                    window.location.href = 'D:/BITBOX//Client/board/boardRead.html';
                    break;
                case '지도':
                    window.location.href = 'D:/BITBOX//Client/map/map_pop.html';
                    break;
                case '채팅':
                    window.location.href = 'D:/BITBOX//Client/chat/chat.html';
                    break;
                case '할 일':
                    window.location.href = 'D:/BITBOX//Client/todo/todo.html';
                    break;
                default:
                    // 기본적으로는 아무런 동작을 하지 않습니다.
            }
        });
    });
});
