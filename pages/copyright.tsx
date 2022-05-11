import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { InfoType } from '../types/InfoType';

import { copyrightsAPI } from '../lib/api/copyrights';

import Header from '../components/common/header';
import LodaingCircular from '../components/common/loadingCircular';

import { LINK_HOME } from '../data/link';
import { PALETTE } from '../data/palette';

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
        <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
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
