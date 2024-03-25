
// 작성 관련--------------------------------------------------------
// 게시물 작성 페이지, 현재 로그인 작성자 정보 요청
const sendGetUser = function () {
    const user_id = sessionStorage.getItem('user_id');

    const packet = {
        cmd: "getuser",
        user_id: user_id
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};


// insert 요청 메시지 전송
const sendInsertPost = function () {
    const food_category = document.querySelector("#foodCategoryInput").value;
    const post_title = document.querySelector("#postTitleInput").value;
    const content_location = document.querySelector("#contentLocationInput").value;
    const likes = document.querySelector("#likeInput").value;
    const post_content = document.querySelector("#postContentInput").value;
    const user_id = sessionStorage.getItem('user_id');

    const packet = {
        cmd: "insertpost",
        food_category: food_category,
        user_id: user_id,
        post_title: post_title,
        content_location: content_location,
        post_content: post_content,
        likes: likes 
    };

    const jsonStr = JSON.stringify(packet); 
    sendMessage(jsonStr);
};



// 작성자, 현재 날짜 default로 설정해서 작성 only
const updateUIWithPostWriter = function (user) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; 

    
    if (user && typeof user === 'object') { 
        
        const getTodayDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0'); 
            return `${year}-${month}-${day}`;
        };

        
        tableBody.innerHTML += `
        <tr>
        <th>음식 종류</th>
        <td>
            <select id="foodCategoryInput">
                <option value="한식">한식</option>
                <option value="일식">일식</option>
                <option value="중식">중식</option>
                <option value="양식">양식</option>
                <option value="디저트">디저트</option>
            </select>
        </td>
    </tr>
    <tr>
        <th>제목</th>
        <td><input type="text" id="postTitleInput" placeholder="제목을 입력하세요."></td>
    </tr>
    <tr>
        <th>작성자</th>
        <td>${user.course_id} ${user.user_name}</td>
    </tr>
    <tr>
        <th>작성일</th>
        <td>${getTodayDate()}</td>
    </tr>
    <tr>
        <th>위치</th>
        <td><input type="text" id="contentLocationInput" placeholder="위치를 입력하세요"></td>
    </tr>
    <tr>
        <th>별점</th>
        <td>
            <select id="likeInput">
                <option value="*">1</option>
                <option value="* *">2</option>
                <option value="* * *">3</option>
                <option value="* * * *">4</option>
                <option value="* * * * *">5</option>
            </select>
        </td>
    </tr>
    <tr>
        <th>내용</th>
        <td class="textarea">
        <textarea name="" id="postContentInput" placeholder="내용을 입력하세요"></textarea>
        <div id="map" style="width: 80%; height: 400px;"></div>
        </td>
    </tr>
    
        `;
    } else {
        console.error("로그인 정보가 올바르게 전달되지 않았어요.");
    }

};




// 수정 관련--------------------------------------------------------

// <----------------- 특정 게시물 페이지 to 게시물 postEdit.html 페이지 이동  관련------------------------
const postSelect = function () {
    const postedit = document.querySelectorid("post_edit_btn");

    const post_id = row.querySelector("td:first-child").innerHTML;

    // 포스트 ID를 사용해 postRead.html 페이지의 URL을 생성
    const postReadUrl = `postRead.html?id=${post_id}`;

    // 생성된 URL로 페이지를 이동
    window.location.href = postReadUrl;

}



// update 위한 해당 게시물 기존 정보 display
const updateUIWithPostEdit = function (post) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; 

    
    if (post && typeof post === 'object') { 
        
        tableBody.innerHTML += `
        <tr>
        <th>음식 종류</th>
        <td>
            <select id="foodCategoryInput">
                <option value="한식">한식</option>
                <option value="일식">일식</option>
                <option value="중식">중식</option>
                <option value="양식">양식</option>
                <option value="디저트">디저트</option>
            </select>
        </td>
    </tr>
    <tr>
        <th>제목</th>
        <td><input type='text' id='postTitleInput' value='${post.post_title}'></td>
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
        <td><input type='text' id='contentLocationInput' value='${post.content_location}'></td>
    </tr>
    <tr>
        <th>내용</th>
        <td class="textarea">
            <textarea id="postContentInput">${post.post_content}</textarea>
        </td>
    </tr>
    <tr>
        <th>별점</th>
        <td>
            <select id="likeInput">
                <option value="*">1</option>
                <option value="* *">2</option>
                <option value="* * *">3</option>
                <option value="* * * *">4</option>
                <option value="* * * * *">5</option>
            </select>
        </td>
    </tr>
        `;
        // getLocation 함수를 호출하고 post의 값을 전달
        // getLocation(post);
    } else {
        console.error("게시물이 올바르게 전달되지 않았습니다.");
    }

};

// update 요청 메시지 전송
const sendUpdatePost = function () {
    const food_category = document.querySelector("#foodCategoryInput").value;
    const post_title = document.querySelector("#postTitleInput").value;
    const content_location = document.querySelector("#contentLocationInput").value;
    const post_content = document.querySelector("#postContentInput").value;
    const likes = document.querySelector("#likeInput").value;
    const user_id = sessionStorage.getItem('user_id');
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");

    if (post_id === null) {
        alert("게시물은 오직 작성자만 수정할 수 있어요.")
        return;
    };

    const packet = {
        cmd: "updatepost",
        user_id: user_id,
        post_id: post_id,
        food_category: food_category,
        post_title: post_title,
        content_location: content_location,
        post_content: post_content,
        likes: likes 
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);

}






// 삭제 관련--------------------------------------------------------

// 게시물 삭제 요청
const sendDeletePost = function () {
    const user_id = sessionStorage.getItem('user_id');
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");

    const packet = {
        cmd: "deletepost",
        post_id: post_id,
        user_id: user_id,
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};





// 전체 조회 관련--------------------------------------------------------

// 전체 게시물 조회 요청 메시지 전송
const sendGetAllPost = function () {
    const packet = {
        cmd: "getallpost",
    };
    const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
    sendMessage(jsonStr);
};


//  요청 받은 정보 화면에 display
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


// 생성된 tr 클릭하면 해당 postRead.html 페이지로 이동
const postTableSelect = function () {
    const tableRows = document.querySelectorAll("table tbody tr");
    
    tableRows.forEach(row => {
        row.addEventListener("click", () => {
            
            tableRows.forEach(row => {
                row.classList.remove("clicked");
            });
            row.classList.add("clicked");

            const post_id = row.querySelector("td:first-child").innerHTML;

            const postReadUrl = `postRead.html?id=${post_id}`;
            
            window.location.href = postReadUrl;
        });
    });
}





// 상세 조회 관련--------------------------------------------------------

// 상세 게시물 요청 메시지 전송
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


// 응답 받은 특정 페이지 조회 결과 display 
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
                    <textarea name="" id="" readonly>${post.post_content}</textarea>
                    <div id="map" style="width: 80%; height: 400px;"></div>
                    <input type="text" id="addressInput" placeholder="주소를 입력하세요" />
                    <button id="searchButton" onclick="searchAddress(addressInput.value)">주소검색</button>
                </td>
            </tr>
            <tr>
                <th>별점</th>
                <td>${post.likes}</td>
            </tr>
        `;

    } else {
        console.error("게시물이 올바르게 전달되지 않았습니다.");
    }
};




//해당 게시물 위치 정보 contentLocation 변수에 할당
const getLocation = function (post) {
    const contentLocation = post.content_location;
    console.log(contentLocation);
    showUserAndRestaurantMap(contentLocation);
    // console.log("위치 함수:" + contentLocation);
};

// //해당 페이지 content_location
// const getLocation = function (post) {
//     const contentLocation = post.content_location;
//     console.log(contentLocation);

// };


document.addEventListener("DOMContentLoaded", () => {

    // 작성 완료 버튼 (작성 페이지)
    const insert_post_btn = document.querySelector("#insert_post_btn");
    if (insert_post_btn) insert_post_btn.addEventListener("click", sendInsertPost);

    //수정 완료 버튼 (수정 페이지)
    const update_post_btn = document.querySelector("#update_post_btn");
    if (update_post_btn) update_post_btn.addEventListener("click", sendUpdatePost);


    //삭제 버튼
    const board_delete_btn = document.querySelector("#board_delete_btn");
    if (board_delete_btn) board_delete_btn.addEventListener("click", sendDeletePost);



    // read -> edit 페이지 이동 버튼
    const postEditBtn = document.getElementById("post_edit_btn");
    
    if (postEditBtn) {
        postEditBtn.addEventListener("click", function () {
            
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get("id");

            const postEditUrl = `postEdit.html?id=${postId}`;

            window.location.href = postEditUrl;
        });
    }


});