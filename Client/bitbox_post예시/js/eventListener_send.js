
const sendSignup = function () {
  const user_id = document.querySelector("#idInput").value;
  const user_pw = document.querySelector("#passInput").value;
  const user_name = document.querySelector("#userNameInput").value;
  const course_id = document.querySelector("#courseIdInput").value;
  const course_code = document.querySelector("#courseCodeInput").value;

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
  console.log("111111")
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



// 구현 완료
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



// <------------------------------sendUpdatePost 추가-------------------------------->
const sendUpdatePost = function () {
  const food_category = document.querySelector("#foodCategoryInput").value;
  const post_title = document.querySelector("#postTitleInput").value;
  const content_location = document.querySelector("#contentLocationInput").value;
  const post_content = document.querySelector("#postContentInput").value;
  const user_id = sessionStorage.getItem('user_id');

  const packet = {
    cmd: "updatepost",
    food_category: food_category,
    user_id: user_id,
    post_title: post_title,
    content_location: content_location,
    post_content: post_content,
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
  sendMessage(jsonStr);
};

// 모르겠어 ㅠ post_id 어케하노
const sendDeletePost = function (post_id) {
  const user_id = sessionStorage.getItem('user_id');
  const packet = {
    cmd: "deletepost",
    post_id: post_id,
    user_id: user_id,
  };
  const jsonStr = JSON.stringify(packet);
  sendMessage(jsonStr);
};








// 승규
const sendInsertTodo = function () {
  const todolist_category = document.querySelector("카테고리Input").value;
  const todolist_content = document.querySelector("#내용Input").value;
  const user_id = 1;

  const packet = {
    cmd: "insertpost",
    todolist_category: todolist_category,
    todolist_content: todolist_content,
    user_id: user_id
  };
  const jsonStr = JSON.stringify(packet); // js객체 -> json문자열
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


// //<- 동적 테이블 추가-------------------------------->
// const updateUIWithAllPosts = function(allPosts) {
//   const tableBody = document.querySelector("table tbody");

//   // 기존 테이블 내용 초기화
//   tableBody.innerHTML = "";

//   // 각 게시물 데이터를 반복하여 테이블에 추가
//   allPosts.forEach((post, index) => {
//       const row = document.createElement("tr");

//       // 각 열에 데이터 추가
//       const columns = [
//           index + 1, // 번호
//           post.food_category, // 음식 종류
//           post.post_title, // 제목
//           "", // 별점 (일단 빈 문자열로 설정)
//           post.user_id, // 작성자
//           post.post_createDate // 작성일
//       ];

//       columns.forEach(column => {
//           const cell = document.createElement("td");
//           cell.textContent = column;
//           row.appendChild(cell);
//       });

//       // 테이블에 행 추가
//       tableBody.appendChild(row);
//   });
// };


const updateUIWithAllPosts = function (allPosts) {
  const allPostsContainer = document.getElementById("allPosts");
  allPostsContainer.innerHTML = ""; // 기존 내용 초기화
  
  // 전달된 데이터가 배열인지 확인
  if (Array.isArray(allPosts)) {
      allPosts.forEach(post => {
          const postElement = document.createElement("div");
          // 각 게시물의 정보를 요소에 추가
          postElement.innerHTML = `
              <h3>${post.post_title}</h3>
              <p>작성자: ${post.user_id}</p>
              <p>업종: ${post.food_category}</p>
              <p>작성일: ${post.post_createDate}</p>
              <!-- 필요한 정보에 따라 추가하거나 수정하세요 -->
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
        <h3>${post.post_title}</h3>
        <p>작성자: ${post.user_id}</p>
        <p>업종: ${post.food_category}</p>
        <p>작성일: ${post.post_createDate}</p>
        <p>내용: ${post.post_content}</p>
        <!-- 필요한 정보에 따라 추가하거나 수정하세요 -->
    `;
    PostContainer.appendChild(postElement);
  } else {
    console.error("게시물이 올바르게 전달되지 않았습니다.");
  }
};






document.addEventListener("DOMContentLoaded", () => {
  const btnLogIn = document.querySelector("#btnLogIn");
  const btnSignup = document.querySelector("#btnSignup");
  const insert_post_btn = document.querySelector("#insert_post_btn");
  const update_post_btn = document.querySelector("#update_post_btn");
  const delete_post_btn = document.querySelector("#delete_post_btn");
  const select_allpost_btn = document.querySelector("#select_allpost_btn");
  const select_post_btn = document.querySelector("#select_post_btn");


  btnLogIn.addEventListener("click", sendLogIn);
  btnSignup.addEventListener("click", sendSignup);
  insert_post_btn.addEventListener("click", sendInsertPost);
  update_post_btn.addEventListener("click", sendUpdatePost);
  delete_post_btn.addEventListener("click", sendDeletePost);
  select_allpost_btn.addEventListener("click", sendGetAllPost);
  select_post_btn.addEventListener("click", sendGetPost);

});