// 음식점 마커를 담을 배열
let restaurantMarkers = [];

// 음식점에 찍힌 마커를 지우는 함수
function removeMarkers() {
    // 음식점 마커를 저장하는 배열에서 마커를 하나씩 가져와 지도에서 제거
    restaurantMarkers.forEach(marker => {
        marker.setMap(null); // 지도에서 마커 제거
    });

    // 배열 비우기
    restaurantMarkers.length = 0;
}

function findRestaurants(lat, lon) {
    const SEARCH_KEYWORD = "식당";
    const RADIUS = 500;        // 반경 500m
    const TOTAL_RESULTS = 30;   // 총 결과 수

    let results = [];           // 결과를 저장할 배열

    // 각 요청마다 검색 범위를 이동하기 위한 반복문
    for (let i = 0; i < (TOTAL_RESULTS / 15); i++) {
        const offset = i * 15;  // 페이지 오프셋

        // Kakao Maps REST API를 사용하여 음식점 검색
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${SEARCH_KEYWORD}&x=${lon}&y=${lat}&radius=${RADIUS}&size=15&page=${i + 1}&offset=${offset}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'KakaoAK b112b95dc61a549270022e580ae57096'
            }
        })
            .then(response => response.json())
            .then(data => {
                // 검색 결과를 배열에 추가
                results.push(...data.documents);

                // 모든 결과에 대한 마커 찍기
                if (results.length >= TOTAL_RESULTS) {
                    results.forEach(place => {
                        const placePosition = new kakao.maps.LatLng(place.y, place.x);
                    
                        const marker = new kakao.maps.Marker({
                            position: placePosition,
                            map: map    // map.js에서 정의한 map 객체를 사용
                        });
                    
                        restaurantMarkers.push(marker); // 음식점 마커를 배열에 추가
                    
                        // 인포윈도우에 표시할 내용 구성
                        const infoContent = `
                        <div style="padding:5px; display : inline-block; height : 60px;">
                            <div style="font-weight:bold; font-size:15px;">${place.place_name}</div>
                            <div style="margin-top:3px; font-size:10px">종류: ${place.category_name}</div>
                            <div style="font-size:10px">전화번호: ${place.phone}</div>
                            <div style="padding:0px"><br><a href="https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}" style="color:green" target="_blank" display : "block"; width = "30px"; height = "30px">길찾기</a></div>
                        </div>`;
                    
                        // 인포윈도우 생성
                        const infowindow = new kakao.maps.InfoWindow({
                            content: infoContent
                        });
                    
                        // 마커 클릭 시 인포윈도우 열기
                        kakao.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });
                    });
                    
                    console.log(results);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // findRestaurants 함수 외부에서도 호출 가능하도록 removeMarkers 함수 반환
    return removeMarkers;
}

window.onload = function() {
    removeMarkers();
}