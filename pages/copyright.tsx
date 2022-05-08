import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { InfoType } from '../types/InfoType';

import { copyrightsAPI } from '../lib/api/copyrights';

import Header from '../components/common/header';
import LodaingCircular from '../components/common/loadingCircular';

const Copyright: NextPage = () => {
  const [infoData, setInfoData] = useState<InfoType[]>();

  useEffect(() => {
    if (!infoData) {
      getInfoData();
    }
  }, []);

  const getInfoData = async () => {
    try {
      const { data } = await copyrightsAPI();
      setInfoData(data);
    } catch (e) {}
  };

  return (
    <Container>
      <Wrapper>
        <Header />
        <Title>저작권</Title>
        {!infoData ? (
          <LodaingCircular />
        ) : (
          <FoodInfoList>
            {infoData.map(function (data) {
              return (
                <FoodInfoItem key={data.foodId}>
                  <FoodItemName>{data.foodName}</FoodItemName>
                  <FoodItemURL>{data.foodURL}</FoodItemURL>
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

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Title = styled.h1``;

const FoodInfoList = styled.ul`
  padding: 4px 0;
`;

const FoodInfoItem = styled.li`
  padding: 4px 0;
`;

const FoodItemName = styled.span`
  padding-right: 4px;
`;

const FoodItemURL = styled.span``;

export default Copyright;
