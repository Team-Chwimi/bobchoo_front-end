import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { selectedFoodActions } from '../../store/selectedFood';
import { axiosInstance } from '../../lib/api';

import TitleHeader from '../common/titleHeader';
import Header from '../common/header';

import { LINK_HOME } from '../../data/link';

import { PALETTE } from '../../data/palette';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { selectedFoodListActions } from '../../store/selectedFoodList';
import InfoFoodService from '../../lib/api/infoFood';

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
  const selectedFoodList = useSelector(
    (state) => state.selectedFoodList.foodList,
  );
  const answers = useSelector((state) => state.answer);
  const requestType = useSelector((state) => state.requestType);

  const dispatch = useDispatch();

  const router = useRouter();
  const [distanceList, setDistanceList] = useState<boolean[]>([]);

  useEffect(() => {
    const res: boolean[] = [];
    selectedFoodList.map((data, index) => {
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
    InfoFoodService.getInfoFood(foodName)
      .then((res) => {
        dispatch(
          selectedFoodActions.setSelectedFood({
            foodName: foodName,
            foodImg: res.data.foodImg,
          }),
        );
      })
      .catch((error) => {});

    router.push('/result');
  };

  const postMultiApi = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/surveys/results/list`,
      request,
    );
    return response.data;
  };

  const postRandomListAPI = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/random/results/list`,
      request,
    );
    return response.data;
  };

  const handleMultipleData = async () => {
    const surveyRequest = answers;
    const data = await postMultiApi(JSON.stringify(surveyRequest));
    console.log(data);
    dispatch(
      selectedFoodListActions.setSelectedFoodList({
        foodList: data,
      }),
    );
  };

  const handleRandomMultipleData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomListAPI(JSON.stringify(randomRequest));
    console.log(data);
    dispatch(
      selectedFoodListActions.setSelectedFoodList({
        foodList: data,
      }),
    );
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
  const handlePickAgain = () => {
    if (requestType.type === 'random') {
      handleRandomMultipleData().then(() => {});
    } else {
      handleMultipleData().then(() => {});
    }
  };

  return (
    <Container>
      <Wrapper>
        {/* <TitleHeader title="오늘의 밥추 리스트!" /> */}

        <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />

        <MainDiv>
          <TitleWrapper>
            <TitleDiv>오늘의 밥추 리스트!!</TitleDiv>
          </TitleWrapper>
          <ImageWrapper src="/images/bobdol_nacho.gif" alt="밥돌이 이미지" />
        </MainDiv>
        <ListDiv>
          <FoodList>
            {!selectedFoodList ? (
              <></>
            ) : (
              selectedFoodList.map((data, index) => (
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
            <ButtonSection>
              <PickAgainButton onClick={handlePickAgain}>
                다시 고르기
              </PickAgainButton>
              {/* <StartVoteButton>투표 시작하기</StartVoteButton> */}
            </ButtonSection>
          </FoodList>
        </ListDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;


const Wrapper = styled.div`
`;
const MainDiv = styled.div`
`;
const TitleWrapper = styled.div`
  width: 60%;
`;
const ImageWrapper = styled.img`
  // width: 61px;
  height: 10vh;
  float: right;
  margin-right: 2vh;
`;
const TitleDiv = styled.div`
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  margin-top: 5vh;
  margin-left: 2vh;
  word-break: keep-all;
  float: left;
`;

const ListDiv = styled.div`
  clear:both;
  width:100%
`;

const FoodList = styled.div`
  padding-top: 0.5vw;
  text-align:center;
`;

const FoodItem = styled.ul`
  align-items: center;
  margin-bottom: 8px;
  padding: 28px 0 28px 0;
  background: #f2f2f2;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 2vh;
  margin-left: 2vh;
  margin-right: 2vh;
  text-align: center;
  `;
  
  const FoodItemName = styled.div`
  font-weight: 700;
  font-size: 3vmax;
  text-align:center;
`;

const ButtonSection = styled.div`
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 3vmax;
  text-align:center;
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

const PickAgainButton = styled.div`
  // width: 100%;
  background: #FF7B30;
  color: #ffffff;
  align-items: center;
  margin-bottom: 8px;
  padding: 28px 0 28px 0;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 2vh;
  margin-left: 2vh;
  margin-right: 2vh;
  text-align: center;
  font-weight: 700;
  font-size: 3vmax;
  text-align:center;
`;

export default FoodListSection;
