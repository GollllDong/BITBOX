let restaurantMarkers = []; // 음식점 마커들을 저장할 배열


// 입력받은 주소에 대한 위치를 찾고 해당 위치에 음식점을 검색하여 표시하는 함수
function showMap(address) {
   // 이미 찍혀 있는 음식점 마커들을 전부 지웁니다
   clearMarkers();


   // 주소-좌표 변환 객체를 생성
   var geocoder = new kakao.maps.services.Geocoder();


   // 주소로 좌표를 검색
   geocoder.addressSearch(address, function (result, status) {
       if (status === kakao.maps.services.Status.OK) {
           var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


           const userMarkerImage = new kakao.maps.MarkerImage(
               '../static/images/RestaurantLocation.png',
               new kakao.maps.Size(60, 60), // 마커 이미지 크기
               { offset: new kakao.maps.Point(25, 50) } // 마커 이미지의 중심좌표 설정
           );


           // 마커를 생성합니다
           const marker = new kakao.maps.Marker({
               map: map,
               position: coords,
               image: userMarkerImage // 사용자의 현재 위치를 나타내는 마커 이미지로 설정
           });
           // 마커를 배열에 추가
           restaurantMarkers.push(marker);


           // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
           map.panTo(coords);
       } else {
           console.error('주소 검색 실패: ' + status);
       }
   });
}
// 이미 찍혀 있는 음식점 마커들을 전부 지우는 함수
function clearMarkers() {
   // 저장된 모든 마커를 가져와서 지도에서 제거합니다
   restaurantMarkers.forEach(marker => {
       marker.setMap(null);
   });


   // 배열 비우기
   restaurantMarkers = [];
}