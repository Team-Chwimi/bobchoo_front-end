import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';

import { DEAFULT_LOCATION } from '../../data/location';

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
  openTime: string;
  closeTime: string;
  geometry: any;
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
  const googlePlacesKey: string =
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY ?? '';

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
    const loader = new Loader({
      apiKey: googleKey,
      version: 'weekly',
    });
    let map: any;
    let marker: any;
    let places: any;
    let service;

    loader.load().then(() => {
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
                console.log(results[i]);
                storeList.push({
                  id: i,
                  place_id: results[i].place_id!,
                  name: results[i].name!,
                  geometry: results[i].geometry!,
                  vicinity: results[i].vicinity!, // 주소
                });
              }
            }
          }
        }
        if (storeList.length > 0) {
          setStoreData(storeList);
        }
      });
      // }

      // places = {
      //   method: 'get',
      //   // url: `/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${googleKey}`,
      //   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${googleKey}`,
      //   secure: false, //important
      //   headers: {
      //     'Accept': 'application/json',
      //     'Access-Control-Allow-Origin': 'http://localhost:3000',
      //     'Access-Control-Allow-Methods': 'GET, OPTIONS',
      //     'Access-Control-Allow-Headers': 'Origin, Content-Type',
      //     'Content-Type': `application/json;charset=UTF-8`,
      //     // 'Access-Control-Request-Method': 'GET',
      //   },
      // };
      // axiosInstance(places)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    });
    // if (storeList.length > 0) {
    //   setStoreData(storeList);
    // }
  }, []);

  const getStoreDetail = (place_id: string) => {
    const detailRequest: any = {
      placeId: place_id,
      // fields: ['name', 'formatted_address', 'geometry'],
    };
    let map = new google.maps.Map(mapRef.current, {
      // center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
      center: {
        lat: Number(DEAFULT_LOCATION.lat),
        lng: Number(DEAFULT_LOCATION.lng),
      },
      zoom: 16,
    });
    let service = new google.maps.places.PlacesService(map);
    service = new google.maps.places.PlacesService(map);
    // if (storeData?.length === 0) {
    service.getDetails(detailRequest, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        console.log(place.opening_hours);
        const todayDay = new Date().getDay();
        let openTime = '';
        let closeTime = '';
        const periodsList = place.opening_hours?.periods;
        if (periodsList) {
          if (periodsList[todayDay]?.open.hours < 10) {
            openTime = '0' + periodsList[todayDay]?.open.hours + ':';
          } else {
            openTime = periodsList[todayDay]?.open.hours + ':';
          }
          if (periodsList[todayDay]?.open.minutes < 10) {
            openTime += '0' + periodsList[todayDay]?.open.minutes;
          } else {
            openTime += periodsList[todayDay]?.open.minutes;
          }
          if (periodsList[todayDay]?.close?.hours! < 10) {
            closeTime = '0' + periodsList[todayDay]?.close?.hours + ':';
          } else {
            closeTime = periodsList[todayDay]?.close?.hours + ':';
          }
          if (periodsList[todayDay]?.close?.minutes! < 10) {
            closeTime += '0' + periodsList[todayDay]?.close?.minutes!;
          } else {
            closeTime += periodsList[todayDay]?.close?.minutes;
          }
        }
        setStoreDetailData({
          place_id: place.place_id!,
          name: place.name!,
          formatted_address: place.formatted_address!,
          formatted_phone_number: place.formatted_phone_number!,
          isOpen: place.opening_hours?.isOpen()!,
          openTime: openTime,
          closeTime: closeTime,
          geometry: place.geometry!,
          rating: place.rating!,
        });
      }
    });
  };

  const handleStoreDetailClick = (place_id: string) => {
    setIsStoreDetail(true);
    getStoreDetail(place_id);
  };

  return (
    <>
      <Container>
        <div className="map-style">
          <div ref={mapRef} id="map" />
        </div>
      </Container>
      {!storeData ? (
        <></>
      ) : !isStoreDetail ? (
        <StoreList>
          {storeData.map((data) => (
            <StoreItem
              key={data.id}
              onClick={() => handleStoreDetailClick(data.place_id)}
            >
              <StoreItemName>{data.name}</StoreItemName>
              <StoreItemAddress>{data.vicinity}</StoreItemAddress>
            </StoreItem>
          ))}
        </StoreList>
      ) : (
        <>
          <ReturnListButton onClick={() => setIsStoreDetail(false)}>
            돌아가기
          </ReturnListButton>
          {!storeDetailData ? (
            <></>
          ) : (
            <StoreDetail>
              <StoreDetailName>{storeDetailData?.name}</StoreDetailName>
              <br />
              <StoreDetailAddress>
                {storeDetailData?.formatted_address}
              </StoreDetailAddress>
              <br />
              <StoreDetailPhoneNumber>
                {storeDetailData?.formatted_phone_number}
              </StoreDetailPhoneNumber>
              <br />
              <StoreDetailTime>
                {storeDetailData?.openTime} ~ {storeDetailData?.closeTime}
              </StoreDetailTime>
              <br />
              <StoreDetailRating>
                {storeDetailData?.rating} / 5.0
              </StoreDetailRating>
              <br />
              <StoreDetailIsOpen>
                {storeDetailData?.isOpen ? (
                  <>현재 운영중</>
                ) : (
                  <>현재 운영종료</>
                )}
              </StoreDetailIsOpen>
              <br />
            </StoreDetail>
          )}
        </>
      )}
    </>
  );
};

const Container = styled.div`
  .map-style {
    width: 487px;
    height: 280px;
    margin-top: 24px;
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

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
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

const StoreDetail = styled.div``;

const StoreDetailName = styled.span``;

const StoreDetailAddress = styled.span``;

const StoreDetailPhoneNumber = styled.span``;

const StoreDetailTime = styled.span``;

const StoreDetailRating = styled.span``;

const StoreDetailIsOpen = styled.span``;

export default MapSection;
