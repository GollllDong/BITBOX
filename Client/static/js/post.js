const sendInsertPost = function () {
    const food_category = document.querySelector("#foodCategoryInput").value;
    const post_title = document.querySelector("#postTitleInput").value;
    const content_location = document.querySelector("#contentLocationInput").value;
    const post_content = document.querySelector("#postContentInput").value;
    const user_id = sessionStorage.getItem('user_id');

    const packet = {
        cmd: "insertpost",
        food_category: food_category,
        user_id: user_id,
        post_title: post_title,
        content_location: content_location,
        post_content: post_content,
    };
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
    const post_id = 1;    // 특정 게시물 페이지에서 post_id 받기

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

const sendGetPost = function () {
    const post_id = 1; // 가져올 게시물의 ID 설정
    const packet = {
        cmd: "getpost",
        post_id: post_id
    };
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};



const updateUIWithAllPosts = function (allPosts) {
    const allPostsContainer = document.getElementById("allPosts");
    allPostsContainer.innerHTML = ""; // 기존 내용 초기화

    // 전달된 데이터가 배열인지 확인
    if (Array.isArray(allPosts)) {
        allPosts.forEach(post => {
            const postElement = document.createElement("div");
            // 각 게시물의 정보를 요소에 추가
            postElement.innerHTML = `
                <h3>=============</h3>
                <p>번호: ${post.post_id}</p>
                <p>음식 종류: ${post.food_category}</p>
                <p>제목: ${post.post_title}</p>
                <p>별점: dd</p> 
                <p>작성자: ${post.course_id} ${post.user_name}</p>   
                <p>작성일: ${post.post_createDate}</p>
            `;
            allPostsContainer.appendChild(postElement);
        });
    } else {
        console.error("게시물 목록이 올바르게 전달되지 않았습니다.");
    }
};



const updateUIWithPost = function (post) {
    const PostContainer = document.getElementById("Post");
    PostContainer.innerHTML = ""; // 기존 내용 초기화

    // 전달된 데이터가 유효한지 확인
    if (post && post.post_id) {
        const postElement = document.createElement("div");
        // 게시물 정보를 요소에 추가
        postElement.innerHTML = `
          <h3>=============</h3>
          <p>음식 종류: ${post.food_category}</p>
          <p>제목: ${post.post_title}</p>
          <p>작성자: ${post.course_id} ${post.user_name}</p>  
          <p>작성일: ${post.post_createDate}</p>
          <p>위치: ${post.content_location}</p>
          <p>내용: ${post.post_content}</p>
          <!-- 필요한 정보에 따라 추가하거나 수정하세요 -->
      `;

        PostContainer.appendChild(postElement);
    } else {
        console.error("게시물이 올바르게 전달되지 않았습니다.");
    }
};




document.addEventListener("DOMContentLoaded", () => {
    const insert_post_btn = document.querySelector("#insert_post_btn");
    const update_post_btn = document.querySelector("#update_post_btn");
    const delete_post_btn = document.querySelector("#delete_post_btn");
    const select_allpost_btn = document.querySelector("#select_allpost_btn");
    const select_post_btn = document.querySelector("#select_post_btn");


    insert_post_btn.addEventListener("click", sendInsertPost);
    update_post_btn.addEventListener("click", sendUpdatePost);
    delete_post_btn.addEventListener("click", sendDeletePost);
    select_allpost_btn.addEventListener("click", sendGetAllPost);
    select_post_btn.addEventListener("click", sendGetPost);

});