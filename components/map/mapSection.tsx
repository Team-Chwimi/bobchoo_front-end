import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { latlngActions } from '../../store/latlng';

import { throttle } from 'lodash';

import { Loader } from '@googlemaps/js-api-loader';
import { DEAFULT_LOCATION } from '../../data/location';

const MapSection: React.FC = () => {
  const mapRef = useRef<any>(null);
  // const mapRef = useRef<HTMLDivElement>(null);

  const latlng = useSelector((state) => state.latlng);

  const dispatch = useDispatch();

  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY ?? '';

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
