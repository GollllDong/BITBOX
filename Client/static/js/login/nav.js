// document.addEventListener("DOMContentLoaded", function () {
//   // 버튼과 네비게이션 요소 가져오기
//   const navButton = document.getElementById("navButton");
//   const sideNav = document.getElementById("sideNav");

//   // 네비게이션을 숨기는 초기 CSS 스타일 설정
//   // sideNav.style.display = "none";

//   // 버튼 클릭 시 네비게이션 토글
//   navButton.addEventListener("click", function (e) {
//     e.stopPropagation(); // 버튼 클릭 시 부모 요소에 대한 이벤트 전파 방지
//     toggleNav();
//   });

//   // 화면 클릭 시 네비게이션 닫기
//   document.addEventListener("click", function (e) {
//     const clickedElement = e.target;
//     // 클릭된 요소가 네비게이션 버튼이나 네비게이션 자체인지 확인
//     const isNavButtonClicked = clickedElement === navButton || navButton.contains(clickedElement);
//     const isSideNavClicked = clickedElement === sideNav || sideNav.contains(clickedElement);
//     // 네비게이션 버튼이나 네비게이션 자체가 아니라면 네비게이션 닫기
//     if (!isNavButtonClicked && !isSideNavClicked) {
//       closeNav();
//     }
//   });

//   // 네비게이션 토글 함수
//   function toggleNav() {
//     // 네비게이션의 현재 표시 여부 확인
//     const isNavVisible = window.getComputedStyle(sideNav).display !== "none";
//     // 네비게이션 표시 여부에 따라 토글
//     if (isNavVisible) {
//       sideNav.style.display = "none";
//       const mainBoxes = document.getElementsByClassName("main_box");
//       for (let i = 0; i < mainBoxes.length; i++) {
//         mainBoxes[i].style.marginLeft = "0px";
//       }
//     } else {
//       sideNav.style.display = "block";
//       const mainBoxes = document.getElementsByClassName("main_box");
//       for (let i = 0; i < mainBoxes.length; i++) {
//         mainBoxes[i].style.marginLeft = "300px";
//       }
//     }
//   }

//   // 네비게이션 닫기 함수
//   function closeNav() {
//     sideNav.style.display = "none";
//     // 네비게이션이 닫혔을 때
//     const mainBoxes = document.getElementsByClassName("main_box");
//     for (let i = 0; i < mainBoxes.length; i++) {
//       mainBoxes[i].style.marginLeft = "30px";
//     }
//   }
// });


document.addEventListener("DOMContentLoaded", function () {
  // 버튼과 네비게이션 요소 가져오기
  const navButton = document.getElementById("navButton");
  const sideNav = document.getElementById("sideNav");
  const toggle = document.querySelector(".main_box");


  navButton.addEventListener("click", function (e) {
    navButton.classList.toggle("open");
    sideNav.classList.toggle("open");
    toggle.classList.toggle("open");
  });


  // 화면 클릭 시 네비게이션 닫기
  // document.addEventListener("click", function (e) {
  //   const clickedElement = e.target;
  //   // 클릭된 요소가 네비게이션 버튼이나 네비게이션 자체인지 확인
  //   const isNavButtonClicked = clickedElement === navButton || navButton.contains(clickedElement);
  //   const isSideNavClicked = clickedElement === sideNav || sideNav.contains(clickedElement);
  //   // 네비게이션 버튼이나 네비게이션 자체가 아니라면 네비게이션 닫기
  //   if (!isNavButtonClicked && !isSideNavClicked) {
  //     navButton.classList.remove("open");
  //     sideNav.classList.remove("open");
  //     toggle.classList.remove("open");
  //   }
  // });
})