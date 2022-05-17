import styled from '@emotion/styled';

import useCopyrights from '../hooks/useCopyrights';

import { handleUrlClick } from '../lib/utils';

import LodaingCircular from './common/loadingCircular';

import { PALETTE } from '../data/palette';

const CopyrightSection: React.FC = () => {
  const { isLoading, data, isError, errorMessage } = useCopyrights();

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Container>
      <Wrapper>
        {isLoading || !data ? (
          <LodaingCircular />
        ) : (
          <>
            <Title>저작권</Title>
            <FoodInfoList>
              {data.map(function (el) {
                return (
                  <FoodInfoItem key={el.foodId}>
                    <FoodItemName>{el.foodName}</FoodItemName>
                    <FoodItemURL onClick={handleUrlClick(el.foodURL)}>
                      {el.foodURL}
                    </FoodItemURL>
                  </FoodInfoItem>
                );
              })}
            </FoodInfoList>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  margin-top: 8px;
  color: ${PALETTE.gray_38};

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Wrapper = styled.div``;

const Title = styled.h1`
  width: fit-content;
  position: relative;
  margin: 16px 20px 20px;
  font-size: 36px;
  font-weight: 800;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 24px;
    left: 0;
    bottom: 1px;
    z-index: -1;
    opacity: 0.5;
    background-color: ${PALETTE.orange};
  }

  @media (max-width: 767px) {
    font-size: 24px;

    &::after {
      height: 16px;
    }
  }
`;

const FoodInfoList = styled.ul`
  margin: 0 28px;
`;

const FoodInfoItem = styled.li`
  padding-bottom: 8px;
`;

const FoodItemName = styled.div`
  width: 9%;
  display: inline-block;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 700;

  @media (max-width: 767px) {
    width: fit-content;
    display: flex;
    font-size: 12px;
  }
`;

const FoodItemURL = styled.div`
  display: inline-block;
  padding-left: 8px;
  font-size: 12px;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 10px;
    padding-left: 8px;
    display: flex;
  }
`;

export default CopyrightSection;
