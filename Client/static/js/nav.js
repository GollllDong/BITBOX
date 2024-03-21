// 마우스가 네비메뉴 안쪽에 있으면 호버 상태를 계속 유지하게 하기 위한 자바스크립트

document.addEventListener('DOMContentLoaded', function () {
    const hoverNav = document.querySelector('.hover_nav');
    const sideNav = document.querySelector('.side_nav');

    let isHovered = false; // 마우스 또는 터치로 네비게이션 메뉴 안에 있는지 여부를 추적하기 위한 변수

    hoverNav.addEventListener('mouseenter', function () {
      isHovered = true;
      showSideNav();
    });

    hoverNav.addEventListener('mouseleave', function () {
      isHovered = false;
      hideSideNav();
    });

    hoverNav.addEventListener('click', function () {
      if (!isHovered) {
        // 호버 상태가 아니라면 클릭 시에 메뉴를 토글합니다.
        if (sideNav.style.display === 'block') {
          hideSideNav();
        } else {
          showSideNav();
        }
      }
    });

    // 네비게이션 메뉴 안에 있는 동안 호버 상태를 유지하기 위한 처리
    sideNav.addEventListener('mouseenter', function () {
      isHovered = true;
    });

    sideNav.addEventListener('mouseleave', function () {
      isHovered = false;
      hideSideNav();
    });

    function showSideNav() {
      sideNav.style.display = 'block';
    }

    function hideSideNav() {
      setTimeout(function () {
        // 네비게이션 메뉴 바깥으로 나가면 숨김
        if (!isHovered) {
          sideNav.style.display = 'none';
        }
      }, 5);
    }
  });
