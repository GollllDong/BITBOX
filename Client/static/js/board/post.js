const sendInsertPost = function () {
    const food_category = document.querySelector("#foodCategoryInput").value;
    const post_title = document.querySelector("#postTitleInput").value;
    const content_location = document.querySelector("#contentLocationInput").value;
    const post_content = document.querySelector("#postContentInput").value;
    const user_id = sessionStorage.getItem('user_id');
    const likesCount = parseInt(document.querySelector("#likeInput").value);

    // 유효한 범위에 있는 경우에만 likes 변수를 선언하고 값을 할당
    let likes;
    if (likesCount >= 1 && likesCount <= 5) {
        likes = Array.from({ length: likesCount }, () => '*').join(' ');
    } else {
        alert('1부터 5까지의 값을 입력하세요.');
        return; // 올바르지 않은 입력이므로 함수 종료
    }

    // 패킷 생성
    const packet = {
        cmd: "insertpost",
        food_category: food_category,
        user_id: user_id,
        post_title: post_title,
        content_location: content_location,
        post_content: post_content,
        likes: likes // 생성된 '*' 추가
    };

    // 패킷 전송
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};



const sendUpdatePost = function () {
    const food_category = document.querySelector("#foodCategoryInput").value;
    const post_title = document.querySelector("#postTitleInput").value;
    const content_location = document.querySelector("#contentLocationInput").value;
    // const content_location = '바로 뒤';
    const post_content = document.querySelector("#postContentInput").value;
    const user_id = sessionStorage.getItem('user_id');

    const likesCount = parseInt(document.querySelector("#likeInput").value);

    // 유효한 범위에 있는 경우에만 likes 변수를 선언하고 값을 할당
    let likes;
    if (likesCount >= 1 && likesCount <= 5) {
        likes = Array.from({ length: likesCount }, () => '*').join(' ');
    } else {
        alert('1부터 5까지의 값을 입력하세요.');
        return; // 올바르지 않은 입력이므로 함수 종료
    }

    const packet = {
        cmd: "updatepost",
        user_id: user_id,
        post_id: post_id,
        food_category: food_category,
        post_title: post_title,
        content_location: content_location,
        post_content: post_content,
    };
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};



const sendDeletePost = function () {
    const user_id = sessionStorage.getItem('user_id');
    const post_id = 1;  // 특정 게시물 페이지에서 post_id 받기
    const packet = {
        cmd: "deletepost",
        post_id: post_id,
        user_id: user_id,
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};



const sendGetAllPost = function () {
    const packet = {
        cmd: "getallpost",
    };
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};


const updateUIWithAllPosts = function (allPosts) {
    const tableBody = document.querySelector("table tbody");

    // 기존 내용 초기화
    tableBody.innerHTML = "";

    // 전달된 데이터가 배열인지 확인
    if (Array.isArray(allPosts)) {
        allPosts.forEach(post => {
            // 새로운 행(tr) 요소 생성
            const row = document.createElement("tr");

            // 각 게시물의 정보를 행에 추가
            row.innerHTML = `
            <td>${post.post_id}</td>
            <td>${post.food_category}</td>
            <td>${post.post_title}</td>
            <td>${post.likes}</td> 
            <td>${post.course_id} ${post.user_name}</td>
            <td>${post.post_createDate}</td>
        `;
            // <td>${likesStars}</td> 
            // 테이블의 tbody에 행 추가
            tableBody.appendChild(row);
        });
    } else {
        console.error("게시물 목록이 올바르게 전달되지 않았습니다.");
    }
    postTableSelect();
};


const postTableSelect = function () {
    const tableRows = document.querySelectorAll("table tbody tr");
    // 각 행에 클릭 이벤트를 추가합니다.
    tableRows.forEach(row => {
        row.addEventListener("click", () => {
            // 클릭된 행에 clicked 클래스 추가
            tableRows.forEach(row => {
                row.classList.remove("clicked");
            });
            row.classList.add("clicked");

            // 해당 행의 포스트 ID를 가져옵니다. 예를 들어, 첫 번째 td 요소의 innerHTML이 포스트 ID라고 가정합니다.
            const post_id = row.querySelector("td:first-child").innerHTML;

            // 포스트 ID를 사용하여 postRead.html 페이지의 URL을 생성합니다.
            const postReadUrl = `postRead.html?id=${post_id}`;

            // 생성된 URL로 페이지를 이동합니다.
            window.location.href = postReadUrl;
        });
    });
}








const sendGetPost = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");
    const packet = {
        cmd: "getpost",
        post_id: post_id
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};


const updateUIWithPost = function (post) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; // 기존 내용 초기화

    // 전달된 데이터가 유효한지 확인
    if (post && typeof post === 'object') { // 객체인지 확인
        // 각 데이터를 출력할 형식에 맞게 테이블에 추가
        tableBody.innerHTML += `
            <tr>
                <th>음식 종류</th>
                <td>${post.food_category}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>${post.post_title}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>${post.course_id} ${post.user_name}</td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>${post.post_createDate}</td>
            </tr>
            <tr>
                <th>위치</th>
                <td>${post.content_location}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td class="textarea">
                    <textarea name="" id="">${post.post_content}</textarea>
                </td>
            </tr>
            <tr>
                <th>별점</th>
                <td>${post.likes}</td>
            </tr>
        `;
           // getLocation 함수를 호출하고 post의 값을 전달
           getLocation(post);
    } else {
        console.error("게시물이 올바르게 전달되지 않았습니다.");
    }

};

//해당 페이지 content_location
const getLocation = function (post) {
    const contentLocation = post.content_location;
    console.log(contentLocation);
    showUserAndRestaurantMap(contentLocation);
 };
 console.log("위치 정보:" + contentLocation);


document.addEventListener("DOMContentLoaded", () => {
    const insert_post_btn = document.querySelector("#insert_post_btn");
    if (insert_post_btn) insert_post_btn.addEventListener("click", sendInsertPost);

    const update_post_btn = document.querySelector("#update_post_btn");
    if (update_post_btn) update_post_btn.addEventListener("click", sendUpdatePost);

    const delete_post_btn = document.querySelector("#delete_post_btn");
    if (delete_post_btn) delete_post_btn.addEventListener("click", sendDeletePost);

    const select_allpost_btn = document.querySelector("#select_allpost_btn");
    if (select_allpost_btn) select_allpost_btn.addEventListener("click", sendGetAllPost);

    const select_post_btn = document.querySelector("#select_post_btn");
    if (select_post_btn) select_post_btn.addEventListener("click", sendGetPost);






});