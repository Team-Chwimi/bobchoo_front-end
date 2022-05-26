import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { selectedFoodActions } from '../../store/selectedFood';
import { selectedFoodListActions } from '../../store/selectedFoodList';
import { axiosInstance } from '../../lib/api';
import InfoFoodService from '../../lib/api/infoFood';

import { SurveyResponseItem } from '../../types/answerType';

import Header from '../common/header';

import { PALETTE } from '../../data/palette';

import axios from 'axios';

import { IoMdRefresh } from 'react-icons/io';
import Swal from 'sweetalert2';

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
    if (answers.answerList.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '잘못된 접근입니다',
        text: '곧 메인페이지로 이동합니다',
        confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        router.push('/');
      });
    }
  }, []);

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
    // console.log(data);
    dispatch(
      selectedFoodListActions.setSelectedFoodList({
        foodList: data,
      }),
    );
  };

  const handleRandomMultipleData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomListAPI(JSON.stringify(randomRequest));
    // console.log(data);
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
        <Header />
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
              distanceList.map((data) => (
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
  float: right;
  // width: 61px;
  height: 10vh;
  margin-right: 2vh;
`;

const TitleDiv = styled.div`
  float: left;
  margin-top: 5vh; // 3vh;
  margin-left: 2vh;
  font-style: normal;
  font-size: 40px;
  font-weight: 800;
  word-break: keep-all;
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
  margin-top: 0.5vh;
  margin-right: 5vw;
  font-size: 1.5vmax;
  font-weight: 700;
  color: #ff7b30;
`;

const FoodItem = styled.ul`
  align-items: center;
  margin: 2vh 2vh 8px 2vh;
  padding: 2.5vmax 0 2.5vmax 0;
  border-radius: 15px;
  background: #f2f2f2;
  cursor: pointer;
  color: #383838;
`;

const FoodItemName = styled.span`
  margin-left: 5vw;
  font-size: 2vmax;
  font-weight: 700;
`;

const ButtonSection = styled.div``;

const IconDiV = styled.span`
  vertical-align: middle;
  margin-right: 2vh;
  padding-top: 10%;
`;

const StartVoteButton = styled.button`
  width: 276px;
  height: 55px;
  margin-bottom: 4px;
  background: #ff7b30;
  border: 0px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

const PickAgainButton = styled.div`
  // width: 100%;
  align-items: center;
  margin: 4vh 2vh 8px 2vh;
  padding: 2vmax 0 2vmax 0;
  border-radius: 15px;
  background: #ff7b30;
  cursor: pointer;
  font-size: 3vmax;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

export default FoodListSection;
