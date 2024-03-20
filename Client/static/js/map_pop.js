//팝업 띄우기
function openPop() {
    // 팝업 레이어 보이게 설정
    document.getElementById('popup_layer2').style.display = "block";

    // 현재 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;   // 위도
            const lon = position.coords.longitude;  // 경도

            // 지도에 사용자 위치 표시하기
            showUserLocationOnMap(lat, lon);
        }, function (error) {
            console.error('사용자의 위치를 가져올 수 없습니다:', error);
        });
    } else {
        console.error('사용자 위치 서비스를 지원하지 않습니다.');
    }
}

// 팝업 닫기
function closePop() {
    // 팝업 레이어 숨기기
    document.getElementById('popup_layer2').style.display = "none";
}

// 지도에 사용자 위치 표시 함수
function showUserLocationOnMap(lat, lon) {
    const mapContainer = document.getElementById('map_in_popup'); // 지도를 표시할 div
    const mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 사용자 위치를 중심으로 설정
        level: 5 // 지도 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 사용자 마커 생성
    const userMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lon),
        map: map
    });
}