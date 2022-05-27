import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';

interface StoreDetailProps {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  rating: number;
  isOpen: boolean;
  time: string;
}

const StoreDetail: React.FC<StoreDetailProps> = ({
  name,
  formatted_address,
  formatted_phone_number,
  rating,
  isOpen,
  time,
}) => {
  return (
    <Container>
      <Wrapper>
        <Name>{name}</Name>
        <Address>
          <IconImg src="/images/map_logo_point.png" alt="지도 아이콘" />
          {formatted_address}
        </Address>
        {!formatted_phone_number ? (
          <></>
        ) : (
          <PhoneNumber>
            <IconImg src="/images/phone_icon.png" alt="전화기 아이콘" />
            {formatted_phone_number}
          </PhoneNumber>
        )}
        {!time ? (
          <></>
        ) : (
          <Time>
            <IconImg src="/images/clock_icon.png" alt="시간 아이콘" />
            {time}
          </Time>
        )}
        {!rating ? (
          <></>
        ) : (
          <Rating>
            <StarIconImg src="/images/star_icon.png" alt="별 아이콘" />
            {rating.toFixed(1)} / 5.0
          </Rating>
        )}
        <IsOpen>{isOpen ? <>현재 운영중</> : <>현재 운영종료</>}</IsOpen>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  font-size: 17px;
  color: ${PALETTE.gray_38};
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;

  font-size: 24px;
  font-weight: 800;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
`;

const IconImg = styled.img`
  width: 16px;
  height: 16px;
  padding-right: 4px;
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
`;

const Rating = styled.div`
  display: flex;
  align-items: start;
  padding-bottom: 8px;
`;

const StarIconImg = styled.img`
  width: 16px;
  height: 16px;
  padding-right: 4px;
`;

const IsOpen = styled.div`
  margin-bottom: 4px;
`;

export default StoreDetail;
