import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { selectedFoodActions } from '../../store/selectedFood';

import TitleHeader from '../common/titleHeader';

import { PALETTE } from '../../data/palette';
import { FOOD_LIST_RESULT } from '../../lib/data/foodResult';
import axios from 'axios';
import { useEffect, useState } from 'react';

const checkStoresExist = async (foodName: string, lat: string, lng: string) => {
  const kakaoKey: string = process.env
    .NEXT_PUBLIC_KAKAOMAP_REST_APPKEY as string;

  let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${foodName}&y=${lat}&x=${lng}&radius=1000&category_group_code=FD6`;
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `KakaoAK ${kakaoKey}`,
    },
  };
  axios.defaults.withCredentials = false;
  let response = await axios.get(url, config);
  let count = Number(response.data.documents.length);

  return count === 0 ? false : true;
};

const FoodListSection: React.FC = () => {
  const latlng = useSelector((state) => state.latlng);
  const dispatch = useDispatch();

  const router = useRouter();
  const [distanceList, setDistanceList] = useState<boolean[]>([]);

  useEffect(() => {
    const res: boolean[] = [];
    FOOD_LIST_RESULT.map((data, index) => {
      checkStoresExist(data.foodName, latlng.lat, latlng.lng).then((value) => {
        // console.log(value, index);
        res[index] = value;
      });
    });
    setDistance(res);
  }, []);

  const setDistance = (res: boolean[]) => {
    setDistanceList(res);
    // console.log(distanceList);
  };

  useEffect(() => {
    // console.log(distanceList);
  }, [distanceList]);

  const handleSelectedClick = (foodName: string) => {
    dispatch(
      selectedFoodActions.setSelectedFood({
        foodName: foodName,
        foodImg: '', // data.foodImg,
      }),
    );
    router.push('/result');
  };

  // const showDistance = (index: number) => {
  //   return (
  //     <>
  //       {distanceList.length === 0 ? (
  //         <>dd</>
  //       ) : distanceList[index] === 0 ? (
  //         <>1km이내에 없음</>
  //       ) : (
  //         <>{distanceList[index]}</>
  //       )}
  //     </>
  //   );
  // };

  return (
    <Container>
      <Wrapper>
        <TitleHeader title="오늘의 밥추 리스트!" />
        <FoodList>
          {!FOOD_LIST_RESULT ? (
            <></>
          ) : (
            FOOD_LIST_RESULT.map((data, index) => (
              <FoodItem
                key={data.foodId}
                onClick={() => handleSelectedClick(data.foodName)}
              >
                <FoodItemName>{data.foodName}</FoodItemName>
                {/* {checkStoresExist(data.foodName, latlng.lat, latlng.lng).then(
                  (value) => {
                    return <></>;
                  },
                )} */}
                {/* {!distanceList ? (
                  <>dd</>
                ) : distanceList[index] ? (
                  <>1km이내에 없음</>
                ) : (
                  <>
                    {distanceList[index]} dsd {index}
                  </>
                )} */}
                {/* {showDistance(index)} */}
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
