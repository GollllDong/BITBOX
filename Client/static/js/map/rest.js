function findRestaurants(lat, lon) {
    const SEARCH_KEYWORD = "식당";
    const RADIUS = 500;        // 반경 500m
    const TOTAL_RESULTS = 30;   // 총 결과 수
 
 
    let results = [];           // 결과를 저장할 배열
    let infowindows = [];       // 인포윈도우를 저장할 배열
 
 
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
 
 
                    // 인포윈도우에 표시할 내용 구성
                    const infoContent = `
                    <div class="map_marker_box">
                        <div style=" display: block;
                        background: #008000; color: #fff;text-align: center; border-radius:4px; padding:3px 10px; font-size:15px;font-weight:600 word-break: keep-all;;>
                            <div style="font-weight:bold; font-size:15px;" margin-left : 5px>${place.place_name}</div>
                            <div style="word-break: keep-all;margin-top:3px; font-size:13px;font-weight:500; padding:0px 6px;"> 종류: ${place.category_name}</div>
                            <div style="font-size:12px; margin-top:3px; font-weight:400; color:#999; padding: 0px 6px;">전화번호: ${place.phone}</div>
                            <div style="display : block; margin-top:8px; font-size:1rem; padding: 0 6px;"><a style="font-size:14px; font-weight:600; color: #008000;" href="https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}">길찾기</a></div>
                        </div>
                        </div>`;
                    // 인포윈도우 생성
                    const infowindow = new kakao.maps.InfoWindow({
                        content: infoContent
                    });
 
 
                    // 마커 클릭 시 인포윈도우 열기
                    kakao.maps.event.addListener(marker, 'click', function () {
                        closeAllInfoWindows(); // 모든 인포윈도우 닫기
                        infowindow.open(map, marker); // 클릭된 마커에 대한 인포윈도우 열기
                    });
 
 
                    // 인포윈도우를 배열에 추가
                    infowindows.push(infowindow);
                });
                console.log(results);
            }
        })
        .catch(error => console.error('Error:', error));
    }
 
 
    // 모든 인포윈도우를 닫는 함수
    function closeAllInfoWindows() {
        infowindows.forEach(function(infowindow) {
            infowindow.close();
        });
    }
 } 