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
        <PhoneNumber>{formatted_phone_number}</PhoneNumber>
        <Time>
          {openTime} ~ {closeTime}
        </Time>
        <Rating>{rating} / 5.0</Rating>
        <IsOpen>{isOpen ? <>현재 운영중</> : <>현재 운영종료</>}</IsOpen>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const Name = styled.div``;

const Address = styled.div``;

const PhoneNumber = styled.div``;

const Time = styled.div``;

const Rating = styled.div``;

const IsOpen = styled.div``;

export default StoreDetail;
