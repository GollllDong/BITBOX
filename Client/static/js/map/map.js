/*
lat = 사용자 접속 위치 위도
lon = 사용자 접속 위치 경도
foodLat = 음식점 위도
foodLon = 음식점 경도
set_center() : 위치의 기본값(서버 위치)
panTo() : 음식점 좌표로 매끄럽게 이동시켜주는 역할
setCenter() : 버튼 클릭 시 사용자의 현재 위치로 이동시켜주는 역할
set_user_location() : 사용자 위도, 경도 설정 메서드
set_food_location() : 음식점 위도, 경도 설정 메서드 + 해당 음식점에 마커 (사용자가 지도 안에서 음식점을 선택했을 경우 해당 경도와 위도로 바뀌게 해야됨)
getUserAroundRestaurants() : 사용자의 위도와 경도를 뽑아서 rest.js에 넘겨주고 해당하는 좌표의 반경에 음식점을 찾아준다.
*/
//*----------------------------------------------------------------------------------------------
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(카카오)
        level: 5
    };
let lat;
let lon;

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 사용자 위치 가져오기
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;   // 위도
        var lon = position.coords.longitude;  // 경도
        set_user_location(lat, lon);           // 위도 경도 필드로 전달

        var locPosition = new kakao.maps.LatLng(lat, lon),                              // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="font-weight:bold; padding:5px; ">내 위치 : </div>';    // 인포윈도우에 표시될 내용입니다

        // 사용자 위치에 마커
        displayMarker(locPosition, message);

        // 사용자의 현재 위치를 중심으로 반경 1km의 원을 생성
        var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(lat, lon),    // 사용자의 현재 위치를 중심으로 설정
            radius: 500,                               // 반경은 1km
            strokeWeight: 5,
            strokeColor: '#75B8FA',
            strokeOpacity: 1,
            strokeStyle: 'dashed',
            fillColor: '#CFE7FF',                       // 원 안 색상
            fillOpacity: 0.5                            // 원의 투명도
        });

        // 지도에 원을 표시합니다
        circle.setMap(map);

        // 사용자의 현재 위치를 중심으로 지도의 확대 레벨을 변경합니다
        map.setLevel(5);
        map.setCenter(locPosition);
    });
} else { // 사용자 위치를 찾지 못한다면 카카오 회사를 기준으로
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667)
    var message = '사용자의 위치를 찾을 수 없습니다.';

    displayMarker(locPosition, message);

    // 사용자 위치를 기준으로 지도의 확대 레벨 설정
    map.setLevel(5);
    map.setCenter(locPosition);
}
function setCenter(lat, lon) {
    var moveLatLon = new kakao.maps.LatLng(lat, lon);
    map.setCenter(moveLatLon);
}

// 현재 위치로 이동하는 함수
function now_location() {
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;   // 위도
            let lon = position.coords.longitude;  // 경도
            setCenter(lat, lon);  // 현재 위치로 지도 중심 이동
        }, function (error) {
            console.error('@@@사용자의 위치를 찾을 수 없습니다@@@:', error);
        });
    } else {
        console.error('@@@길찾기 기능이 오류가 발생하였습니다@@@.');
    }
}

function set_user_location(lat, lon) {
    this.lat = lat;
    this.lon = lon;
}


// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {
    // 사용자의 현재 위치를 나타내는 마커 이미지 설정
    const userMarkerImage = new kakao.maps.MarkerImage(
        '../static/images/user_location.png',
        new kakao.maps.Size(50, 50), // 마커 이미지 크기
        { offset: new kakao.maps.Point(25, 50) } // 마커 이미지의 중심좌표 설정
    );
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: userMarkerImage // 사용자의 현재 위치를 나타내는 마커 이미지로 설정
    });

    let iwContent = message; // 인포윈도우에 표시할 내용
    iwRemovable = true;

    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemovable
    });

    kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        // 마커를 클릭했을 때 인포윈도우를 열고 다른 인포윈도우를 닫습니다.
        closeOtherInfoWindows(infowindow);
    });
}


var infowindows = []; // 정보 윈도우를 저장할 배열을 정의합니다.
// 다른 인포윈도우를 닫는 함수
function closeOtherInfoWindows(currentInfowindow) {
    infowindows.forEach(function (infowindow) {
        if (infowindow !== currentInfowindow) {
            infowindow.close();
        }
    });
}


// 사용자의 현재 위치를 받아오고 음식점 검색 함수 호출
function getUserAroundRestaurants() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;   // 위도
            const lon = position.coords.longitude;   // 경도
            // rest.js 파일의 함수 호출하여 음식점 검색
            findRestaurants(lat, lon);
        }, function (error) {
            console.error('@@@사용자의 위치를 찾을 수 없습니다@@@:', error);
        });
    } else {
        console.error('@@@길찾기 기능이 오류가 발생하였습니다@@@.');
    }
}

// 페이지 로딩 시 사용자의 위치 정보를 받아오고 음식점 검색 함수 호출
window.onload = function () {
    getUserAroundRestaurants();
};

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
var mapTypeControl = new kakao.maps.MapTypeControl();


// 지도에 컨트롤 위치를 우상단에 배치
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);