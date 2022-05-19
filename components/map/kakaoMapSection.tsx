import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

// import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { handleUrlClick, makeAddress } from '../../lib/utils';

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

interface StoreDetailType extends StoreDataType {
  // place_id: string;
  // name: string;
  // formatted_address: string;
  // formatted_phone_number: string;
  // isOpen: boolean;
  // // geometry: any;
  // time: any;
  // lat: number;
  // lng: number;
  // rating: number;
}

const KakaoMapSection: React.FC = () => {
  const latlng = useSelector((state) => state.latlng);
  const selectedFood = useSelector((state) => state.selectedFood);

  const { kakao } = window;

  const [kakaoMap, setKakaoMap] = useState(null);

  const [markerList, setMarkerList] = useState<any[]>();
  const [infoWindowList, setInfoWindowList] = useState<any[]>();

  const [isStoreDetail, setIsStoreDetail] = useState<boolean>(false);
  // const [storeDetailData, setStoreDetailData] = useState<StoreDetailType>();

  const [titleText, setTitleText] = useState<string>(
    `${selectedFood.name} 가게 목록`,
  );

  const [storeData, setStoreData] = useState<StoreDataType[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<any>();

  const [currentLocation, setCurrentLocation] = useState<LatLngNumberType>({
    lat: Number(latlng.lat),
    lng: Number(latlng.lng),
  });

  const kakaoKey: string = process.env
    .NEXT_PUBLIC_KAKAOMAP_REST_APPKEY as string;

  let map: any;
  let marker: any;

  useEffect(() => {
    // console.log(currentLocation);
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
      level: 5,
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

  let imageSrc = '/images/map_marker.png',
    // 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(31, 32), // 마커 이미지의 크기
    imgOptions = {
      // spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

  let imageSrcClicked = '/images/map_logo_point.png',
    imgOptionsClicked = {
      // spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    clickImage = new kakao.maps.MarkerImage(
      imageSrcClicked,
      imageSize,
      imgOptionsClicked,
    );

  const searchStores = async () => {
    let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${selectedFood.name}&y=${currentLocation.lat}&x=${currentLocation.lng}&radius=1000&category_group_code=FD6`;
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
    if (storeData) {
      removeMarker();

      let markers = [];
      let infoWindows: any[] = [];
      for (let i = 0; i < storeData.length; i++) {
        let placePosition = new kakao.maps.LatLng(
          storeData[i].y,
          storeData[i].x,
        );
        let marker = addMarker(
          placePosition,
          i,
          storeData[i].place_name,
          kakao,
          infoWindows,
        );

        markers.push(marker);
      }
      setMarkerList(markers);
      setInfoWindowList(infoWindows);
    }
  };

  function addMarker(
    position: any,
    idx: number,
    title: any,
    kakao: any,
    infoWindows: any[],
  ) {
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(kakaoMap);

    let iwContent = `
      <div style="width:100%; padding:8px 12px;">
      <div style="color: #383838; font-size:10px; padding-bottom:4px;">${storeData[idx].category_name}</div>
      <div style="color: #383838; font-size:15px; font-weight:800; padding-bottom:4px;">${storeData[idx].place_name}</div>
      <div style="color: #383838; font-size:13px; padding-bottom:4px;">${storeData[idx].address_name}</div>
      <div style="color: #383838; font-size:13px;">${storeData[idx].phone}</div>
      </div>
    `; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    let iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 마커에 표시할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent, // 인포윈도우에 표시할 내용
      removable: iwRemoveable,
    });

    infoWindows.push(infowindow);

    // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    (function (marker, infowindow) {
      // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
      // kakao.maps.event.addListener(marker, 'mouseover', function () {
      //   infowindow.open(kakaoMap, marker);
      // });

      // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
      // kakao.maps.event.addListener(marker, 'mouseout', function () {
      //   infowindow.close();
      // });

      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(kakaoMap, marker);
      });
    })(marker, infowindow);

    return marker;
  }

  //marker click event
  function makeClickListener(marker: any) {
    // 마커에 click 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 클릭 이미지로 변경합니다
      if (!selectedMarker || selectedMarker !== marker) {
        // console.log('aaa');
        // 클릭된 마커 객체가 null이 아니면
        // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        if (!!selectedMarker) {
          // console.log('dddd');
          selectedMarker.setImage(markerImage);
          selectedMarker(null);
        } else {
          // console.log('cccc');
        }
        // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
        marker.setImage(clickImage);
      }

      // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
      // selectedMarker = marker;
      setSelectedMarker(marker);
    });
  }

  function removeMarker() {
    if (markerList) {
      for (let i = 0; i < markerList.length!; i++) {
        markerList[i].setMap(null);
      }
      setMarkerList([]);
    }

    if (infoWindowList) {
      for (let i = 0; i < infoWindowList.length!; i++) {
        infoWindowList[i].setMap(null);
      }
      setInfoWindowList([]);
    }
  }

  const handleStoreDetailClick = () => {
    setIsStoreDetail(true);
    setTitleText(`${selectedFood.name} 가게 정보`);
    //  getStoreDetail(place_id, geometry, null);
  };

  return (
    <Container>
      <Wrapper>
        <TitleHeader title={titleText} />
        <div
          id="myMap"
          style={{
            width: '100%',
            height: '300px',
            maxWidth: '500px',
            position: 'sticky',
            top: '0px',
            overflow: 'hidden',
            zIndex: '99',
          }}
        ></div>
        {storeData.length === 0 ? (
          <CryingBobdolWrapper>
            <BobdolImg src="/images/bobdol_cry.gif" alt="우는 밥돌이 이미지" />
            <NoListMessage>주변에 음식점이 없어요</NoListMessage>
          </CryingBobdolWrapper>
        ) : !isStoreDetail ? (
          <StoreList>
            {storeData.map((data) => (
              <StoreItemWrapper key={data.id}>
                {data.place_name && (
                  <>
                    <StoreItem
                    // onClick={() => handleStoreDetailClick()}
                    >
                      <StoreItemNameCategory>
                        <StoreItemName>{data.place_name}</StoreItemName>
                        {data.category_name && (
                          <StoreItemCategory>
                            {data.category_name}
                          </StoreItemCategory>
                        )}
                      </StoreItemNameCategory>
                      {data.phone && (
                        <StoreItemPhone>
                          <IconImg
                            src="/images/phone_icon.png"
                            alt="전화기 아이콘"
                          />
                          <a href={'tel:' + data.phone}>{data.phone}</a>
                        </StoreItemPhone>
                      )}
                      <StoreItemAddressDistance>
                        <IconImg
                          src="/images/map_logo_point.png"
                          alt="지도 아이콘"
                        />
                        <StoreItemAddress>{data.address_name}</StoreItemAddress>
                        <StoreItemDistance>
                          ({data.distance}m)
                        </StoreItemDistance>
                      </StoreItemAddressDistance>
                      <StoreItemURL onClick={handleUrlClick(data.place_url)}>
                        <IconImg
                          src="/images/info_logo.png"
                          alt="정보 아이콘"
                        />
                        상세보기
                      </StoreItemURL>
                      {/* {data.rating === 0 ? (
                      <>평점이 없습니다</>
                    ) : (
                      <StoreItemRating>
                        {data.rating.toFixed(1)}/5.0
                      </StoreItemRating>
                    )} */}
                    </StoreItem>
                    <StoreItemLine />
                  </>
                )}
              </StoreItemWrapper>
            ))}
          </StoreList>
        ) : (
          <>
            {/* <ReturnListButton
              onClick={() => {
                setIsStoreDetail(false);
                displayPlaces();
              }}
            >
              ←
            </ReturnListButton>
            {!storeDetailData ? (
              <LodaingCircular />
            ) : (
              <></>
              // <StoreDetail
              // />
            )} */}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  // width: 100%;
  max-width: 900px;
  // box-sizing: border-box;
  // margin-top: 8px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: 100%;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  // max-width: 900px;
`;

const StoreList = styled.ul`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px 12px;
  // overflow: hidden;
`;

const StoreItemWrapper = styled.li``;

const StoreItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 4px 0;
  color: ${PALETTE.gray_38};

  // cursor: pointer;
  // &::after {}
`;

const StoreItemLine = styled.div`
  content: '';
  width: 100%;
  border-bottom: 0.5px solid ${PALETTE.gray_79};
`;

const StoreItemNameCategory = styled.div`
  display: flex;
  padding: 8px 0;
`;

const StoreItemName = styled.div`
  // position: relative;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 800;
`;

const IconImg = styled.img`
  width: 16px;
  height: 16px;
  padding-right: 4px;
`;

const StoreItemCategory = styled.div`
  display: inline-block;
  align-self: flex-end;
  font-size: 11px;
  color: ${PALETTE.gray_52};
`;

const StoreItemPhone = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 15px;
`;

const StoreItemAddressDistance = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
`;

const StoreItemAddress = styled.div`
  display: inline;
  margin-right: 4px;
  font-size: 15px;
`;

const StoreItemDistance = styled.div`
  display: inline;
  font-size: 12px;
`;

const StoreItemURL = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 15px;
  cursor: pointer;
`;

const ReturnListButton = styled.button`
  margin: 4px 0 0 12px;
  border: none;
  background: #ffffff;
  color: ${PALETTE.orange_point};
  font-size: 20px;
  font-weight: 24100;
  cursor: pointer;
`;

const CryingBobdolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const BobdolImg = styled.img`
  width: 100px;
  margin-bottom: 8px;
`;

const NoListMessage = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

export default KakaoMapSection;
