// 지도를 화면에 띄우는 함수
function displayMap() {
    // 지도를 담을 영역의 DOM 요소를 가져옵니다
    const mapContainer = document.getElementById('map');
 
 
    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심 좌표는 서울시청
        level: 5 // 지도의 확대 레벨 설정
    });
 
 
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();
 
 
    // 지도에 컨트롤 위치를 우상단에 배치
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
 
 
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
 
 
    return map; // 생성된 지도 객체를 반환합니다
 }
 
 
 // 입력받은 주소에 대한 위치를 찾고 해당 위치에 마커를 찍는 함수
 function showMapWithMarker(map, address) {
    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();
 
 
    // 주소로 좌표를 검색
    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
 
 
            const userMarkerImage = new kakao.maps.MarkerImage(
                '../static/images/RestaurantLocation.png',
                new kakao.maps.Size(60, 60), // 마커 이미지 크기
                { offset: new kakao.maps.Point(25, 50) } // 마커 이미지의 중심좌표 설정
            );
 
 
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                position: coords,
                map: map,
                image : userMarkerImage
            });
 
 
            // 지도의 중심을 검색된 위치로 이동시킵니다
            map.setCenter(coords);
        } else {
            console.error('주소 검색 실패: ' + status);
        }
    });
 }
 
 
 // 사용자 위치와 음식점 주소에 대한 지도를 표시합니다
 function showUserAndRestaurantMap() {
    // 지도를 화면에 띄우고 지도 객체를 가져옵니다
    const map = displayMap();
 
 
    // 사용자의 현재 위치를 가져와서 지도에 표시합니다
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 사용자의 위치를 가져옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;   // 위도
            const lon = position.coords.longitude;  // 경도
            const userCoords = new kakao.maps.LatLng(lat, lon); // 사용자의 현재 위치
 
 
            const userMarkerImage = new kakao.maps.MarkerImage(
                '../static/images/user_location.png',
                new kakao.maps.Size(60, 60), // 마커 이미지 크기
                { offset: new kakao.maps.Point(25, 50) } // 마커 이미지의 중심좌표 설정
            );
 
 
            // 사용자의 현재 위치에 마커를 찍습니다
            const userMarker = new kakao.maps.Marker({
                position: userCoords,
                map: map,
                image : userMarkerImage
            });
 
 
            // 사용자의 현재 위치를 중심으로 반경 500m의 원을 생성합니다
            const circle = new kakao.maps.Circle({
                center: userCoords,
                radius: 500, // 반경은 500m
                strokeWeight: 5,
                strokeColor: '#75B8FA',
                strokeOpacity: 1,
                strokeStyle: 'dashed',
                fillColor: '#CFE7FF', // 원 안 색상
                fillOpacity: 0.5 // 원의 투명도
            });
 
 
            // 원을 지도에 표시합니다
            circle.setMap(map);
 
 
            // 지도의 중심을 사용자의 현재 위치로 설정합니다
            map.panTo(userCoords);
        });
    }
 
 
    // 음식점 주소에 대한 마커를 표시합니다
    const restaurantAddress = "서울 서초구 서초동 1310-5"; // 음식점 주소
    showMapWithMarker(map, restaurantAddress);
 }
 
 
 // 사용자 위치와 음식점 주소에 대한 지도를 표시합니다
 showUserAndRestaurantMap();
 
 
 
 