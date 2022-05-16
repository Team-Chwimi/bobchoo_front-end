import styled from '@emotion/styled';

import TitleHeader from '../common/titleHeader';

import { PALETTE } from '../../data/palette';
import { FOOD_LIST_RESULT } from '../../lib/data/foodResult';

const FoodListSection: React.FC = () => {
  const handleSelectedClick = () => {};

  return (
    <Container>
      <Wrapper>
        <TitleHeader title="오늘의 밥추 리스트!" />
        <FoodList>
          {!FOOD_LIST_RESULT ? (
            <></>
          ) : (
            FOOD_LIST_RESULT.map((data) => (
              <FoodItem key={data.foodId} onClick={handleSelectedClick}>
                <FoodItemName>{data.foodName}</FoodItemName>
              </FoodItem>
            ))
          )}
        </FoodList>
        <ButtonSection>
          <StartVoteButton>투표 시작하기</StartVoteButton>
          <PickAgainButton>다시 고르기</PickAgainButton>
        </ButtonSection>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  font-size: 17px;
  color: ${PALETTE.gray_38};
`;

const FoodList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const FoodItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 276px;
  height: 50px;
  background: #f2f2f2;
  border-radius: 15px;
  cursor: pointer;
`;

const FoodItemName = styled.span`
  padding-left: 20px;
  font-weight: 700;
  font-size: 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const StartVoteButton = styled.button`
  margin-bottom: 4px;
  width: 276px;
  height: 55px;
  background: #ff7b30;
  border: 0px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const PickAgainButton = styled.button`
  width: 276px;
  height: 55px;
  background: #f2f2f2;
  border: 0px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 20px;
  color: #ff7b30;
  cursor: pointer;
`;

export default FoodListSection;
