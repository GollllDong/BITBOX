function findRestaurants(lat, lon) {
    const SEARCH_KEYWORD = "식당";
    const RADIUS = 1000;        // 반경 1km
    const TOTAL_RESULTS = 45;   // 총 결과 수

    let results = [];           // 결과를 저장할 배열

    // 각 요청마다 검색 범위를 이동하기 위한 반복문
    for (let i = 0; i < Math.ceil(TOTAL_RESULTS / 15); i++) {
        const offset = i * 15;  // 페이지 오프셋

        // Kakao Maps REST API를 사용하여 음식점 검색
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${SEARCH_KEYWORD}&x=${lon}&y=${lat}&radius=${RADIUS}&size=15&page=${i + 1}&offset=${offset}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'KakaoAK 038d89c40cab6d2dd812a4067c3432ec'
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
                            <div style="padding:5px; display : inline-block; height : 60px;">
                                <div style="font-weight:bold; font-size:15px;">${place.place_name}</div>
                                <div style="margin-top:3px; font-size:10px">종류: ${place.category_name}</div>
                                <div style="font-size:10px">전화번호: ${place.phone}</div>
                                <button style = "font-size : 10px; display : inline;">길찾기</button>
                            </div>`,
                            iwRemoveable = true;


                        // 인포윈도우 생성
                        const infowindow = new kakao.maps.InfoWindow({
                            content: infoContent,
                            removable: iwRemoveable
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
}