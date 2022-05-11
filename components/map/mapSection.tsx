import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { makeAddress } from '../../lib/utils';

import { DEAFULT_LOCATION } from '../../data/location';

import StoreDetail from './storeDetail';
import TitleHeader from '../common/titleHeader';

interface StoreDataType {
  id: number;
  place_id: string;
  name: string;
  geometry: any;
  vicinity: string;
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

const MapSection: React.FC = () => {
  const mapRef = useRef<any>(null);
  // const mapRef = useRef<HTMLDivElement>(null);

  const [isStoreDetail, setIsStoreDetail] = useState<boolean>(false);
  const [storeDetailData, setStoreDetailData] = useState<StoreDetailType>();

  const [storeData, setStoreData] = useState<StoreDataType[]>();
  const storeList: StoreDataType[] = [];

  const latlng = useSelector((state) => state.latlng);
  const selectedFood = useSelector((state) => state.selectedFood);

  const dispatch = useDispatch();

  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY as string;

  let map: any;
  let marker: any;
  let places: any;
  let service;

  useEffect(() => {
    if (!latlng.hasCurrentLoaction) {
      // latlng.lat = DEAFULT_LOCATION.lat;
      // latlng.lng = DEAFULT_LOCATION.lng;
      dispatch(
        latlngActions.setLatLng({
          lat: DEAFULT_LOCATION.lat,
          lng: DEAFULT_LOCATION.lng,
          hasCurrentLoaction: true,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (!storeData) {
      makeMap();
    }
  }, []);

  // useEffect(() => {
  //   if (!isStoreDetail) {
  //     makeMap();
  //   }
  // }, []);

  const makeMap = () => {
    const loader = new Loader({
      apiKey: googleKey,
      version: 'weekly',
    });

    // loader.load().then(() => {
    map = new google.maps.Map(mapRef.current, {
      // center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
      center: {
        lat: Number(DEAFULT_LOCATION.lat),
        lng: Number(DEAFULT_LOCATION.lng),
      },
      zoom: 16,
    });
    marker = new window.google.maps.Marker({
      position: {
        // lat: Number(latlng.lat),
        // lng: Number(latlng.lng),
        lat: Number(DEAFULT_LOCATION.lat),
        lng: Number(DEAFULT_LOCATION.lng),
      },
      map,
    });
    map.addListener(
      'center_changed',
      throttle(() => {
        const centerLat = map.getCenter().lat();
        const centerLng = map.getCenter().lng();
        marker.setPosition({ lat: centerLat, lng: centerLng });
        // dispatch(
        //   latlngActions.setLatLng({
        //     lat: centerLat.toString(),
        //     lng: centerLng.toString(),
        //     hasCurrentLoaction: true,
        //   }),
        // );
      }, 150),
    );
    const request: any = {
      location: new google.maps.LatLng(
        // Number(latlng.lat), Number(latlng.lng)
        Number(DEAFULT_LOCATION.lat),
        Number(DEAFULT_LOCATION.lng),
      ),
      radius: '1000', // 1KM 이내만 우선 검색
      type: ['restaurant'], // restaurant 타입만 검색
      keyword: selectedFood.name,
      // openNow: true, // 현재 문 연 가게만 검색
    };

    service = new google.maps.places.PlacesService(map);
    // if (storeData?.length === 0) {
    service.nearbySearch(request, (results, status) => {
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

    // let infowindow = new google.maps.InfoWindow();
    // if (storeList.length > 0) {
    //   console.log(storeData);
    //   storeData?.map((data) => {
    //     console.log(data);
    //     marker = new window.google.maps.Marker({
    //       position: {
    //         lat: data.geometry.viewport?.Ab?.h,
    //         lng: data.geometry.viewport?.Va?.h,
    //       },
    //       map,
    //     });
    //     // google.maps.event.addListener(
    //     //   marker,
    //     //   'click',
    //     //   (function (marker) {
    //     //     return function () {
    //     //       infowindow.setContent(data.name);
    //     //       infowindow.open(map, marker);
    //     //     };
    //     //   })(marker),
    //     // );

    //     // map.addListener(
    //     //   'store_location',
    //     //   throttle(() => {
    //     //     const centerLat = map.getCenter().lat();
    //     //     const centerLng = map.getCenter().lng();
    //     //     marker.setPosition({ lat: centerLat, lng: centerLng });
    //     //     // dispatch(
    //     //     //   latlngActions.setLatLng({
    //     //     //     lat: centerLat.toString(),
    //     //     //     lng: centerLng.toString(),
    //     //     //     hasCurrentLoaction: true,
    //     //     //   }),
    //     //     // );
    //     //   }, 150),
    //     // );
    //   });
    // }
  };

  const drawMarker = (marker: any, map: any) => {
    let infowindow = new google.maps.InfoWindow();
    if (storeList.length > 0) {
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
    }
  };

  const getStoreDetail = (place_id: string, geometry: any) => {
    const detailRequest: any = {
      placeId: place_id,
      // fields: ['name', 'formatted_address', 'geometry'],
    };
    // console.log(geometry?.viewport);
    let map = new google.maps.Map(mapRef.current, {
      // center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
      center: {
        lat: geometry?.viewport?.Ab.h,
        lng: geometry?.viewport?.Va.h,
      },
      zoom: 16,
    });
    // map.setCenter({
    //   lat: geometry?.viewport?.Ab?.h,
    //   lng: geometry?.viewport?.Va?.h,
    // });
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
        console.log(place.opening_hours);
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
    getStoreDetail(place_id, geometry);
  };

  return (
    <Container>
      <Wrapper>
        <TitleHeader title={selectedFood.name} />
        <MapWrapper>
          <div className="map-style">
            <div ref={mapRef} id="map" />
          </div>
        </MapWrapper>
        {!storeData ? (
          <></>
        ) : !isStoreDetail ? (
          <StoreList>
            {storeData.map((data) => (
              <StoreItem
                key={data.id}
                onClick={() =>
                  handleStoreDetailClick(data.place_id, data.geometry)
                }
              >
                <StoreItemName>{data.name}</StoreItemName>
                <StoreItemAddress>{data.vicinity}</StoreItemAddress>
              </StoreItem>
            ))}
          </StoreList>
        ) : (
          <>
            <ReturnListButton
              onClick={() => {
                setIsStoreDetail(false);
                makeMap();
              }}
            >
              돌아가기
            </ReturnListButton>
            {!storeDetailData ? (
              <></>
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
  max-width: 900px;
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

const Wrapper = styled.div``;

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

  .gm-svpc {
    display: none;
  }
  .gm-fullscreen-control {
    display: none;
  }
`;

const StoreList = styled.ul``;

const StoreItem = styled.li`
  cursor: pointer;
`;

const StoreItemName = styled.span`
  margin-right: 4px;
  font-weight: 800;
`;

const StoreItemAddress = styled.span``;

const ReturnListButton = styled.button``;

export default MapSection;
