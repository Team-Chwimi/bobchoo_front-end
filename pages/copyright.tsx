import type { NextPage } from 'next';

import styled from '@emotion/styled';

import useCopyrights from '../hooks/useCopyrights';

import Header from '../components/common/header';
import LodaingCircular from '../components/common/loadingCircular';

import { LINK_HOME } from '../data/link';
import { PALETTE } from '../data/palette';

import { handleUrlClick } from '../lib/utils';

const Copyright: NextPage = () => {
  const { isLoading, data, isError, errorMessage } = useCopyrights();

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Container>
      <Wrapper>
        <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
        <Title>저작권</Title>
        {isLoading || !data ? (
          <LodaingCircular />
        ) : (
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
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  margin-top: 8px;
  color: ${PALETTE.gray_38};
  font-size: 12px;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Title = styled.h1`
  width: fit-content;
  position: relative;
  margin: 16px 20px 20px;
  font-size: 24px;
  font-weight: 800;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 16px;
    left: 0;
    bottom: 1px;
    z-index: -1;
    opacity: 0.5;
    background-color: ${PALETTE.orange};
  }
`;

const FoodInfoList = styled.ul`
  margin: 0 28px;
`;

const FoodInfoItem = styled.li`
  padding-bottom: 8px;
`;

const FoodItemName = styled.div`
  width: 8%;
  display: inline-block;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 700;

  @media (max-width: 767px) {
    width: fit-content;
    display: flex;
  }
`;

const FoodItemURL = styled.div`
  display: inline-block;
  font-size: 10px;
  cursor: pointer;

  @media (max-width: 767px) {
    padding-left: 8px;
    display: flex;
  }
`;

export default Copyright;
