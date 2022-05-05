import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';
import { DEAFULT_LOCATION } from '../../data/location';

import { axiosInstance } from '../../lib/api';

const MapSection: React.FC = () => {
  const mapRef = useRef<any>(null);
  // const mapRef = useRef<HTMLDivElement>(null);

  const latlng = useSelector((state) => state.latlng);
  const selectedFood = useSelector((state) => state.selectedFood);

  const dispatch = useDispatch();

  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY ?? '';
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
        center: { lat: Number(latlng.lat), lng: Number(latlng.lng) },
        zoom: 16,
      });
      marker = new window.google.maps.Marker({
        position: {
          lat: Number(latlng.lat),
          lng: Number(latlng.lng),
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
        location:
          // pyrmont,
          new google.maps.LatLng(Number(latlng.lat), Number(latlng.lng)),
        radius: '500',
        type: ['restaurant'],
        keyword: '라면',
        // fields: ['name', 'geometry', 'vicinity'],
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          if (results) {
            for (var i = 0; i < results.length; i++) {
              // createMarker(results[i]);
              console.log(results[i]);
            }
          }
        }
      });
      // service.findPlaceFromQuery(request, (results, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      //     console.log(results);
      //     for (let i = 0; i < results.length; i++) {
      //       // createMarker(results[i]);
      //     }
      //     // map.setCenter(results[0].geometry.location);
      //   }
      // });

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
  });

  return (
    <Container>
      <div className="map-style">
        <div ref={mapRef} id="map" />
      </div>
    </Container>
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

export default MapSection;
