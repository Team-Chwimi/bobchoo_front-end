import styled from '@emotion/styled';

interface StoreDetailProps {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  openTime: string;
  closeTime: string;
  rating: number;
  isOpen: boolean;
}

const StoreDetail: React.FC<StoreDetailProps> = ({
  name,
  formatted_address,
  formatted_phone_number,
  openTime,
  closeTime,
  rating,
  isOpen,
}) => {
  return (
    <Container>
      <Wrapper>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
        {!PhoneNumber ? (
          <></>
        ) : (
          <PhoneNumber>{formatted_phone_number}</PhoneNumber>
        )}
        {!openTime ? (
          <></>
        ) : (
          <Time>
            {openTime} ~ {closeTime}
          </Time>
        )}
        {!rating ? <></> : <Rating>{rating.toFixed(1)} / 5.0</Rating>}
        <IsOpen>{isOpen ? <>현재 운영중</> : <>현재 운영종료</>}</IsOpen>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  font-size: 17px;
`;

const Name = styled.div`
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: 800;
`;

const Address = styled.div`
  margin-bottom: 4px;
`;

const PhoneNumber = styled.div`
  margin-bottom: 4px;
`;

const Time = styled.div`
  margin-bottom: 4px;
`;

const Rating = styled.div`
  margin-bottom: 4px;
`;

const IsOpen = styled.div``;

export default StoreDetail;
