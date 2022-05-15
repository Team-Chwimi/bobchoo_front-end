import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

// import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { makeAddress } from '../../lib/utils';

import StoreDetail from './storeDetail';
import TitleHeader from '../common/titleHeader';
import LodaingCircular from '../common/loadingCircular';

import { PALETTE } from '../../data/palette';

interface StoreDataType {
  id: number;
  place_id: string;
  name: string;
  geometry: any;
  vicinity: string;
  rating: number;
  // openNow: boolean;
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

interface CurrentLocationType {
  lat: number;
  lng: number;
}

const MapSection: React.FC = () => {
  const mapRef = useRef<any>(null);
  // const mapRef = useRef<HTMLDivElement>(null);

  const latlng = useSelector((state) => state.latlng);
  const selectedFood = useSelector((state) => state.selectedFood);

  const [isStoreDetail, setIsStoreDetail] = useState<boolean>(false);
  const [storeDetailData, setStoreDetailData] = useState<StoreDetailType>();

  const [titleText, setTitleText] = useState<string>('');

  const [storeData, setStoreData] = useState<StoreDataType[]>();
  const storeList: StoreDataType[] = [];

  const [currentLocation, setCurrentLocation] = useState<CurrentLocationType>({
    // lat: Number(DEAFULT_LOCATION.lat),
    // lng: Number(DEAFULT_LOCATION.lng),
    lat: Number(latlng.lat),
    lng: Number(latlng.lng),
  });

  // const [mapCenterLocation, setMapCenterLocation] =
  //   useState<CurrentLocationType>({
  //     lat: Number(DEAFULT_LOCATION.lat),
  //     lng: Number(DEAFULT_LOCATION.lng),
  //   });

  const [mapData, setMapData] = useState<any>();

  const dispatch = useDispatch();

  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY as string;

  let map: any;
  let marker: any;
  let places: any;
  let service;

  useEffect(() => {
    if (!storeData) {
      makeMap();
    }
  }, []);

  const makeMap = () => {
    const loader = new Loader({
      apiKey: googleKey,
      version: 'weekly',
    });
    // setCurrentLocation({
    //   lat: Number(latlng.lat),
    //   lng: Number(latlng.lng),
    // });

    // loader.load().then(() => {
    map = new google.maps.Map(mapRef.current, {
      // center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
      center: {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      },
      zoom: 14,
    });
    setMapData(map);
    // marker = new window.google.maps.Marker({
    //   position: {
    //     // lat: Number(latlng.lat),
    //     // lng: Number(latlng.lng),
    //     lat: Number(DEAFULT_LOCATION.lat),
    //     lng: Number(DEAFULT_LOCATION.lng),
    //   },
    //   map,
    //   icon: {
    //     url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    //   },
    // });
    // map.addListener(
    //   'center_changed',
    //   throttle(() => {
    //     const centerLat = map.getCenter().lat();
    //     const centerLng = map.getCenter().lng();
    //     marker.setPosition({ lat: centerLat, lng: centerLng });
    //     // dispatch(
    //     //   latlngActions.setLatLng({
    //     //     lat: centerLat.toString(),
    //     //     lng: centerLng.toString(),
    //     //     hasCurrentLoaction: true,
    //     //   }),
    //     // );
    //   }, 150),
    // );
    const request: any = {
      location: new google.maps.LatLng(
        // Number(latlng.lat),
        // Number(latlng.lng),
        currentLocation.lat,
        currentLocation.lng,
      ),
      radius: '500', // 500m 이내만 우선 검색
      type: ['restaurant'], // restaurant 타입만 검색
      keyword: selectedFood.name,
      // openNow: true, // 현재 문 연 가게만 검색
    };

    service = new google.maps.places.PlacesService(map);
    // if (storeData?.length === 0) {
    service.nearbySearch(request, (results, status) => {
      setTitleText(`${selectedFood.name} 가게 목록`);
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        if (results) {
          for (let i = 0; i < results.length; i++) {
            // createMarker(results[i]);
            if (results[i].business_status === 'OPERATIONAL') {
              // 현재 운영 중인 가게만 검색
              // console.log(results[i]);
              storeList[i] = {
                id: i,
                place_id: results[i].place_id!,
                name: results[i].name!,
                geometry: results[i].geometry!,
                vicinity: makeAddress(results[i].vicinity!), // 주소
                rating: results[i].rating!,
              };
            }
          }
        }
      }
      if (storeList.length > 0) {
        setStoreData(storeList);
        drawMarker(marker, map);
      }
    });
  };

  const drawMarker = (marker: any, map: any) => {
    let infowindow = new google.maps.InfoWindow();
    // console.log(storeData);
    storeList?.map((data) => {
      marker = new window.google.maps.Marker({
        position: {
          lat: data.geometry.viewport?.Ab?.h,
          lng: data.geometry.viewport?.Va?.h,
        },
        map,
      });
      google.maps.event.addListener(
        marker,
        'click',
        (function (marker) {
          return function () {
            infowindow.setContent(data.name);
            infowindow.open(map, marker);
            setIsStoreDetail(true);
            setTitleText(`${selectedFood.name} 가게 정보`);
            getStoreDetail(data.place_id, data.geometry, map);
          };
        })(marker),
      );

      // map.addListener(
      //   'store_location',
      //   throttle(() => {
      //     const centerLat = map.getCenter().lat();
      //     const centerLng = map.getCenter().lng();
      //     marker.setPosition({ lat: centerLat, lng: centerLng });
      //     // dispatch(
      //     //   latlngActions.setLatLng({
      //     //     lat: centerLat.toString(),
      //     //     lng: centerLng.toString(),
      //     //     hasCurrentLoaction: true,
      //     //   }),
      //     // );
      //   }, 150),
      // );
    });
  };

  const getStoreDetail = (place_id: string, geometry: any, map: any) => {
    const detailRequest: any = {
      placeId: place_id,
      // fields: ['name', 'formatted_address', 'geometry'],
    };
    // console.log(geometry?.viewport);
    // let map = new google.maps.Map(mapRef.current, {
    //   // center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
    //   center: {
    //     lat: geometry?.viewport?.Ab.h,
    //     lng: geometry?.viewport?.Va.h,
    //   },
    //   zoom: 14,
    // });

    if (map === null) {
      map = mapData;
    }

    map.setCenter({
      lat: geometry?.viewport?.Ab?.h,
      lng: geometry?.viewport?.Va?.h,
    });

    marker = new window.google.maps.Marker({
      position: {
        // lat: Number(latlng.lat),
        // lng: Number(latlng.lng),
        lat: geometry?.viewport?.Ab.h,
        lng: geometry?.viewport?.Va.h,
      },
      map,
      // icon: {
      //   url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      // },
    });

    let service = new google.maps.places.PlacesService(map);
    // service = new google.maps.places.PlacesService(map);
    // if (storeData?.length === 0) {
    service.getDetails(detailRequest, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const today = new Date();
        // console.log(place.geometry?.location.lng());
        // console.log(place.opening_hours);
        setStoreDetailData({
          place_id: place.place_id!,
          name: place.name!,
          formatted_address: makeAddress(place.formatted_address!),
          formatted_phone_number: place.formatted_phone_number!,
          isOpen: place.opening_hours?.isOpen(new Date(today))!,
          time: place.opening_hours?.weekday_text?.[(today.getDay() + 6) % 7]!,
          lat: place.geometry?.location.lat(),
          lng: place.geometry?.location.lng(),
          // geometry: place.geometry!,
          rating: place.rating!,
        });
      }
    });
  };

  const handleStoreDetailClick = (place_id: string, geometry: any) => {
    setIsStoreDetail(true);
    setTitleText(`${selectedFood.name} 가게 정보`);
    getStoreDetail(place_id, geometry, null);
  };

  return (
    <Container>
      <Wrapper>
        <TitleHeader title={titleText} />
        <MapWrapper>
          <div className="map-style">
            <div ref={mapRef} id="map" />
          </div>
        </MapWrapper>
        {!storeData ? (
          <LodaingCircular />
        ) : !isStoreDetail ? (
          <StoreList>
            <button>현재 위치 재설정</button>
            {storeData.map((data) => (
              <>
                <StoreItem
                  key={data.id}
                  onClick={() =>
                    handleStoreDetailClick(data.place_id, data.geometry)
                  }
                >
                  <StoreItemName>{data.name}</StoreItemName>
                  {/* <StoreItemAddress>{data.vicinity}</StoreItemAddress> */}
                  {data.rating === 0 ? (
                    <>평점이 없습니다</>
                  ) : (
                    <StoreItemRating>
                      {data.rating.toFixed(1)}/5.0
                    </StoreItemRating>
                  )}
                </StoreItem>
                <StoreItemLine />
              </>
            ))}
          </StoreList>
        ) : (
          <>
            <ReturnListButton
              onClick={() => {
                setIsStoreDetail(false);
                // makeMap();
              }}
            >
              ←
            </ReturnListButton>
            {!storeDetailData ? (
              <LodaingCircular />
            ) : (
              <StoreDetail
                name={storeDetailData.name}
                formatted_address={storeDetailData.formatted_address}
                formatted_phone_number={storeDetailData.formatted_phone_number}
                time={storeDetailData.time}
                rating={storeDetailData.rating}
                isOpen={false}
              />
            )}
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

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
`;

const MapWrapper = styled.section`
  .map-style {
    width: 487px;
    height: 280px;
    // margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  // 지도 위성 제거
  .gm-style-mtc {
    display: none;
  }
  // 로드뷰 제거
  .gm-svpc {
    display: none;
  }
  // 전체화면 제거
  .gm-fullscreen-control {
    display: none;
  }
`;

const StoreList = styled.ul`
  padding: 8px 16px;
`;

const StoreItem = styled.li`
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

const ReturnListButton = styled.button`
  margin: 4px 0 0 12px;
  border: none;
  background: #fff;
  color: ${PALETTE.orange_point};
  font-size: 20px;
  font-weight: 24100;
  cursor: pointer;
`;

export default MapSection;
