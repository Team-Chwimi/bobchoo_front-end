import type { NextPage } from 'next';

import styled from '@emotion/styled';

import useCopyrights from '../hooks/useCopyrights';

import Header from '../components/common/header';
import LodaingCircular from '../components/common/loadingCircular';

import { LINK_HOME } from '../data/link';
import { PALETTE } from '../data/palette';

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
                  <FoodItemURL>{el.foodURL}</FoodItemURL>
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
  max-width: 900px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  color: ${PALETTE.gray_38};

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Title = styled.h1`
  margin: 12px 0 0;
  font-size: 24px;
  font-weight: 800;
`;

const FoodInfoList = styled.ul`
  padding: 4px 0;
`;

const FoodInfoItem = styled.li`
  padding: 4px 0;
`;

const FoodItemName = styled.span`
  padding-right: 4px;
  font-weight: 800;
`;

const FoodItemURL = styled.span``;

export default Copyright;
