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
import { SurveyResponseItem } from '../../types/answerType';
import { IoMdRefresh } from 'react-icons/io';

interface foodListItemType extends SurveyResponseItem {
  count: number;
}

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

  return count;
  // return count === 0 ? false : true;
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
  const [distanceList, setDistanceList] = useState<foodListItemType[]>([]);

  useEffect(() => {
    // const res: boolean[] = [];
    selectedFoodList.map((data, index) => {
      checkStoresExist(data.foodName, latlng.lat, latlng.lng).then((value) => {
        // console.log(value, index);
        // res[index] = value;
        setDistanceList((old) => [
          ...old,
          { foodId: data.foodId, foodName: data.foodName, count: value },
        ]);
      });
    });

    // setDistance(res);
  }, [selectedFoodList]);

  // const setDistance = (res: boolean[]) => {
  //   setDistanceList(res);
  //   // console.log(distanceList);
  // };

  // useEffect(() => {
  //   // console.log(distanceList);
  // }, [distanceList]);

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
    setDistanceList([]);
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
            {!distanceList ? (
              <></>
            ) : (
              distanceList.map((data, index) => (
                <FoodItem
                  key={data.foodId}
                  onClick={() => handleSelectedClick(data.foodName)}
                >
                  <FoodItemName>{data.foodName}</FoodItemName>
                  <KmSpan>
                    {data.count > 0 ? <></> : <>1km 이내에 없음</>}
                  </KmSpan>
                </FoodItem>
              ))
            )}
            <ButtonSection>
              <PickAgainButton onClick={handlePickAgain}>
                <IconDiV>
                  <IoMdRefresh size={'6vmin'} />
                </IconDiV>
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

const Wrapper = styled.div``;
const MainDiv = styled.div``;
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
  margin-top: 3vh;
`;

const ListDiv = styled.div`
  clear: both;
  width: 100%;
`;

const FoodList = styled.div`
  padding-top: 0.5vw;
`;
const KmSpan = styled.span`
  float: right;
  margin-right: 5vw;
  font-weight: 700;
  font-size: 1.5vmax;
  margin-top: 0.5vh;
  color: #ff7b30;
`;

const FoodItem = styled.ul`
  align-items: center;
  margin-bottom: 8px;
  padding: 2.5vmax 0 2.5vmax 0;
  background: #f2f2f2;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 2vh;
  margin-left: 2vh;
  margin-right: 2vh;
  color: #383838;
`;

const FoodItemName = styled.span`
  font-weight: 700;
  font-size: 2vmax;
  margin-left: 5vw;
`;

const ButtonSection = styled.div``;
const IconDiV = styled.span`
  padding-top: 10%;
  margin-right: 2vh;
  vertical-align: middle;
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
  background: #ff7b30;
  color: #ffffff;
  align-items: center;
  margin-bottom: 8px;
  padding: 2vmax 0 2vmax 0;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 4vh;
  margin-left: 2vh;
  margin-right: 2vh;
  text-align: center;
  font-weight: 700;
  font-size: 3vmax;
  text-align: center;
`;

export default FoodListSection;
