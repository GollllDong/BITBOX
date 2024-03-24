document.addEventListener('DOMContentLoaded', function () {
    // gnb 메뉴 아이템들을 가져옵니다.
    var gnbItems = document.querySelectorAll('.gnb_box li a');

    // 각 gnb 메뉴 아이템에 클릭 이벤트 리스너를 추가합니다.
    gnbItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            // 기본 동작을 막습니다. (페이지 이동 방지)
            event.preventDefault();

            // 클릭된 링크의 텍스트 콘텐츠를 가져옵니다.
            var clickedGnb = item.textContent;

            // 클릭된 링크에 따라 처리를 수행합니다.
            switch (clickedGnb) {
                case 'HOME':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'index.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                    break;
                case '게시판':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'board/postReadAll.html';
                    } else {
                        window.location.href = '../board/postReadAll.html';
                    }
                    break;
                case '지도':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'map/map.html';
                    } else {
                        window.location.href = '../map/map.html';
                    }
                    break;
                case '채팅':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'chat/chat.html';
                    } else {
                        window.location.href = '../chat/chat.html';
                    }
                    break;
                case '할 일':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'todo/to-do.html';
                    } else {
                        window.location.href = '../todo/to-do.html';
                    }
                    break;
                default:
                // 기본적으로는 아무런 동작을 하지 않습니다.
            }
        });
    });

    // snb 메뉴 아이템들을 가져옵니다.
    var snbItems = document.querySelectorAll('.snb_nav.mb10 ul li a');
    // 각 snb 메뉴 아이템에 클릭 이벤트 리스너를 추가합니다.
    snbItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            // 기본 동작을 막습니다. (페이지 이동 방지)
            event.preventDefault();

            // 클릭된 링크의 텍스트 콘텐츠를 가져옵니다.
            var clickedSnb = item.textContent;

            // 클릭된 링크에 따라 처리를 수행합니다.
            switch (clickedSnb) {
                case 'HOME':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'index.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                    break;
                case '게시판':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'board/postReadAll.html';
                    } else {
                        window.location.href = '../board/postReadAll.html';
                    }
                    break;
                case '지도':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'map/map.html';
                    } else {
                        window.location.href = '../map/map.html';
                    }
                    break;
                case '채팅':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'chat/chat.html';
                    } else {
                        window.location.href = '../chat/chat.html';
                    }
                    break;
                case '할 일':
                    if (window.location.pathname.endsWith("index.html")) {
                        window.location.href = 'todo/to-do.html';
                    } else {
                        window.location.href = '../todo/to-do.html';
                    }
                    break;
                default:
                // 기본적으로는 아무런 동작을 하지 않습니다.
            }
        });
    });
});

// logo
document.addEventListener('DOMContentLoaded', function () {
    // logo에 클릭 이벤트 리스너를 추가합니다.
    var logo = document.querySelector('.logo');
    logo.addEventListener('click', function (event) {
        event.preventDefault();
        if (window.location.pathname.endsWith("index.html")) {
            window.location.href = 'index.html';
        } else {
            window.location.href = '../index.html';
        }
    });
});

// plusbox
document.addEventListener('DOMContentLoaded', function () {
    // plusbox1에 클릭 이벤트 리스너를 추가합니다.
    var plusbox1 = document.querySelector('.plusbox1');
    if (plusbox1) {
        plusbox1.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'board/postReadAll.html';
            } else {
                window.location.href = '../board/postReadAll.html';
            }
        });
    }
    // plusbox2에 클릭 이벤트 리스너를 추가합니다.
    var plusbox2 = document.querySelector('.plusbox2');
    if (plusbox2) {
        plusbox2.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'chat/chat.html';
            } else {
                window.location.href = '../chat/chat.html';
            }
        });
    }
    // plusbox3에 클릭 이벤트 리스너를 추가합니다.
    var plusbox3 = document.querySelector('.plusbox3');
    if (plusbox3) {
        plusbox3.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'todo/to-do.html';
            } else {
                window.location.href = '../todo/to-do.html';
            }
        });
    }
    // plusbox4에 클릭 이벤트 리스너를 추가합니다.
    var plusbox4 = document.querySelector('.plusbox4');
    if (plusbox4) {
        plusbox4.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'map/map.html';
            } else {
                window.location.href = '../map/map.html';
            }
        });
    }
});

// 게시판: writeButton, board_delete_btn, board_edit_btn, board_list_btn
document.addEventListener('DOMContentLoaded', function () {

    // [목록으로 돌아가기]]
    var listButton = document.querySelector('.board_list_btn');
    if (listButton) {
        listButton.addEventListener('click', function () {
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'board/postReadAll.html';
            } else {
                window.location.href = '../board/postReadAll.html';
            }
        });
    }

    // [게시물 쓰기]
    var writeButton = document.querySelector('.board_write_btn');
    if (writeButton) {
        writeButton.addEventListener('click', function () {
            if (window.location.pathname.endsWith("index.html")) {
                window.location.href = 'board/postWrite.html';
            } else {
                window.location.href = '../board/postWrite.html';
            }
        });
    }


    // var writeButton = document.querySelector('.board_write_btn');
    // if (writeButton) {
    //     writeButton.addEventListener('click', function () {
    //         if (window.location.pathname.endsWith("index.html")) {
    //             window.location.href = 'board/postWrite.html';
    //         } else {
    //             window.location.href = '../board/postWrite.html';
    //         }
    //     });
    // }

    // var saveButton = document.querySelector('.board_write_btn.mt10');
    // if (saveButton) {
    //     saveButton.addEventListener('click', function () {
    //         if (window.location.pathname.endsWith("index.html")) {
    //             window.location.href = 'board/postReadAll.html';
    //         } else {
    //             window.location.href = '../board/postReadAll.html';
    //         }
    //     });
    // }

    // var deleteButton = document.querySelector('.board_delete_btn');
    // if (deleteButton) {
    //     deleteButton.addEventListener('click', function () {
    //         if (window.location.pathname.endsWith("index.html")) {
    //             window.location.href = 'board/postReadAll.html';
    //         } else {
    //             window.location.href = '../board/postReadAll.html';
    //         }
    //     });
    // }

    // var editButton = document.querySelector('.board_edit_btn');
    // if (editButton) {
    //     editButton.addEventListener('click', function () {
    //         if (window.location.pathname.endsWith("index.html")) {
    //             window.location.href = 'board/postEdit.html';
    //         } else {
    //             window.location.href = '../board/postEdit.html';
    //         }
    //     });
    // }

    // var listButton = document.querySelector('.board_list_btn');
    // if (listButton) {
    //     listButton.addEventListener('click', function () {
    //         if (window.location.pathname.endsWith("index.html")) {
    //             window.location.href = 'board/postReadAll.html';
    //         } else {
    //             window.location.href = '../board/postReadAll.html';
    //         }
    //     });
    // }
});