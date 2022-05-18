import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

// import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { makeAddress } from '../../lib/utils';

import { LatLngNumberType } from '../../types/MapType';

import StoreDetail from './storeDetail';
import TitleHeader from '../common/titleHeader';
import LodaingCircular from '../common/loadingCircular';

import { PALETTE } from '../../data/palette';
import axios from 'axios';

interface StoreDataType {
  id: string;
  address_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface StoreDetailType {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  isOpen: boolean;
  // geometry: any;
  time: any;
  lat: number;
  lng: number;
  rating: number;
}

const KakaoMapSection: React.FC = () => {
  const latlng = useSelector((state) => state.latlng);
  const selectedFood = useSelector((state) => state.selectedFood);

  const { kakao } = window;

  const [kakaoMap, setKakaoMap] = useState(null);

  const [markerList, setMarkerList] = useState();

  const [isStoreDetail, setIsStoreDetail] = useState<boolean>(false);
  const [storeDetailData, setStoreDetailData] = useState<StoreDetailType>();

  const [titleText, setTitleText] = useState<string>('');

  const [storeData, setStoreData] = useState<StoreDataType[]>([]);

  const [currentLocation, setCurrentLocation] = useState<LatLngNumberType>({
    lat: Number(latlng.lat),
    lng: Number(latlng.lng),
  });

  const kakaoKey: string = process.env
    .NEXT_PUBLIC_KAKAOMAP_REST_APPKEY as string;

  var map: any;
  var marker: any;
  // var markers: any = [];

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
      level: 4,
    };
    map = new kakao.maps.Map(container, options);
    setKakaoMap(map);
    searchStores();
    displayPlaces();
  }, []);

  useEffect(() => {
    kakao.maps.event.addListener(map, 'dragend', function () {
      let curLatLng = map.getCenter();
      setCurrentLocation({ lat: curLatLng.getLat(), lng: curLatLng.getLng() });
    });
  }, []);

  useEffect(() => {
    searchStores();
  }, [currentLocation]);

  useEffect(() => {
    displayPlaces();
  }, [storeData]);

  const searchStores = async () => {
    let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${selectedFood.name}&y=${currentLocation.lat}&x=${currentLocation.lng}&radius=20000&category_group_code=FD6`;
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `KakaoAK ${kakaoKey}`,
      },
    };
    axios.defaults.withCredentials = false;
    await axios.get(url, config).then((response) => {
      setStoreData(response.data.documents);
    });
  };

  const displayPlaces = () => {
    console.log('map은', map);
    if (!storeData) {
      return;
    }

    removeMarker();

    const markers = [];
    for (var i = 0; i < storeData.length; i++) {
      var placePosition = new kakao.maps.LatLng(storeData[i].y, storeData[i].x);
      marker = addMarker(placePosition, i, storeData[i].place_name, kakao);
      // console.log(storeData[i].x);
      // marker = new kakao.maps.Marker({
      //   position: placePosition,
      // });
      markers.push(marker); // 배열에 생성된 마커를 추가합니다
      // marker.setMap(kakaoMap);
      // console.log('markers', markers);
    }
    // setMarkerList(markers);
    // for (var i = 0; i < markers.length; i++) {
    //   markers[i].setMap(map);
    //   // console.log('markers[]', markers[i]);
    // }
    // console.log('markers', markers);
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position: any, idx: number, title: any, kakao: any) {
    var imageSrc = '/images/map_marker.png',
      // 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(31, 32), // 마커 이미지의 크기
      imgOptions = {
        // spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    marker = new kakao.maps.Marker({
      // map: map,
      position: position, // 마커의 위치
      image: markerImage,
    });
    // var iwContent =
    //   '<div style="padding:5px;font-size:12px;">' + title + '</div>';
    // var infowindow = new kakao.maps.InfoWindow({
    //   content: iwContent,
    // });

    // // 마커에 마우스오버 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, 'mouseover', function () {
    //   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    //   infowindow.open(map, marker);
    // });

    // // 마커에 마우스아웃 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, 'mouseout', function () {
    //   // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    //   infowindow.close();
    // });

    marker.setMap(kakaoMap); // 지도 위에 마커를 표출합니다
    // markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  function removeMarker() {
    // setMarkerList([]);
    // console.log('remove', markers);
    // for (var i = 0; i < markers.length; i++) {
    //   markers[i].setMap(null);
    // }
    // markers = [];
    // markers.length = 0;
  }

  return (
    <Container>
      <Wrapper>
        <TitleHeader title={titleText} />
        <div
          id="myMap"
          style={{
            width: '500px',
            height: '500px',
          }}
        ></div>
        {!storeData ? (
          <></>
        ) : (
          <>
            <StoreList>
              {storeData.map((data) => (
                <StoreItemWrapper key={data.id}>
                  <StoreItem
                  // onClick={() =>
                  // handleStoreDetailClick(data.place_id, data.geometry)
                  // }
                  >
                    <StoreItemName>{data.place_name}</StoreItemName>
                    {/* {data.rating === 0 ? (
                      <>평점이 없습니다</>
                    ) : (
                      <StoreItemRating>
                        {data.rating.toFixed(1)}/5.0
                      </StoreItemRating>
                    )} */}
                  </StoreItem>
                  <StoreItemLine />
                </StoreItemWrapper>
              ))}
            </StoreList>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Wrapper = styled.div`
  max-width: 900px;
  // box-sizing: border-box;
`;

const StoreList = styled.ul`
  padding: 8px 16px;
`;

const StoreItemWrapper = styled.li``;

const StoreItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0;
  cursor: pointer;

  // &::after {}
`;

const StoreItemLine = styled.div`
  content: '';
  width: 100%;
  border-bottom: 0.5px solid ${PALETTE.gray_79};
`;

const StoreItemName = styled.span`
  margin-right: 4px;
  font-weight: 800;
  color: ${PALETTE.gray_38};
`;

const StoreItemAddress = styled.span`
  color: ${PALETTE.gray_38};
`;

const StoreItemRating = styled.span`
  color: ${PALETTE.gray_38};
`;

export default KakaoMapSection;
