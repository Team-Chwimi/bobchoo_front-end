import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { axiosInstance } from '../../lib/api';
import { selectedFoodActions } from '../../store/selectedFood';

import LoadingBobdol from '../common/loadingBobdol';

import { PALETTE } from '../../data/palette';

import { FaShareAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

import Swal from 'sweetalert2';

interface style {
  display: string;
}

const TitleImg: React.FC = () => {
  const results = useSelector((state) => state.selectedFood);
  const answers = useSelector((state) => state.answer);
  const requestType = useSelector((state) => state.requestType);

  const dispatch = useDispatch();

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [beforeFood, setBeforeFood] = useState<String>('');

  const router = useRouter();

  useEffect(() => {
    setBeforeFood(results.foodName);
  }, []);

  useEffect(() => {
    console.log(isImgLoaded);
  }, [isImgLoaded]);

  const postOneApi = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/surveys/results`,
      request,
    );
    return response.data;
  };

  const postRandomAPI = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/random/results`,
      request,
    );
    return response.data;
  };

  const handleOneData = async () => {
    const surveyRequest = answers;
    const data = await postOneApi(JSON.stringify(surveyRequest));
    if (data.foodName === beforeFood) {
      Swal.fire({
        // icon: 'success',
        title: '동일한 음식 메뉴가 나왔습니다',
        text: '다른 음식을 원하시면 설문을 다시 진행해주세요',
        confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
        timer: 3000,
        timerProgressBar: true,
      });
      // let timesRun = 0;
      // let interval = setInterval(function () {
      //   timesRun++;
      //   console.log(timesRun);
      //   if (timesRun === 3) {
      //     setIsImgLoaded(true);
      //     clearInterval(interval);
      //   }
      //   setIsImgLoaded(false);
      // }, 1000);
    } else {
      dispatch(
        selectedFoodActions.setSelectedFood({
          foodName: data.foodName,
          foodImg: data.foodImg,
        }),
      );
      setIsImgLoaded(false);
    }
  };

  const handleRandomOneData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomAPI(JSON.stringify(randomRequest));
    if (data.foodName === beforeFood) {
      Swal.fire({
        title: '동일한 음식 메뉴가 나왔습니다',
        text: '다른 음식을 원하시면 설문을 다시 진행해주세요',
        confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      setIsImgLoaded(false);
      dispatch(
        selectedFoodActions.setSelectedFood({
          foodName: data.foodName,
          foodImg: data.foodImg,
        }),
      );
    }
  };

  const handlePickAgain = () => {
    if (requestType.type === 'random') {
      handleRandomOneData();
    } else {
      handleOneData();
    }
  };

  const display = () => {
    if (!isImgLoaded) {
      return 'none';
    } else {
      return 'block';
    }
  };

  return (
    <Container>
      {!isImgLoaded ? (
        <LoadingBobdol />
      ) : (
        <>
          <MainDiv>
            <TitleDiv>오늘의 밥추!!</TitleDiv>
            <ImageWrapper src="/images/bobdol_nacho.gif" alt="밥돌이 이미지" />
          </MainDiv>
        </>
      )}
      <ImgDiv display={display()}>
        <MenuImage
          src={results.foodImg}
          alt={`${results.foodName} 이미지`}
          onLoad={() => {
            setIsImgLoaded(true);
          }}
        />
        {!isImgLoaded ? <></> : <FoodNameDiv>{results.foodName}</FoodNameDiv>}
      </ImgDiv>
      {!isImgLoaded ? (
        <></>
      ) : (
        <>
          <ButtonDiv>
            <MapButton>
              <IconDiV>
                <FaMapMarkedAlt size={'6vmin'} />
              </IconDiV>
              <ButtonName onClick={() => router.push('/map')}>
                주변식당찾기
              </ButtonName>
            </MapButton>
            {/* <ShareButton>
              <IconDiV>
                <FaShareAlt size={'6vmin'} />
              </IconDiV>
              <ButtonName>공유하기</ButtonName>
            </ShareButton> */}
            <RechooseButton>
              <IconDiV>
                <IoMdRefresh size={'6vmin'} />
              </IconDiV>
              <ButtonName onClick={handlePickAgain}>다시 고르기</ButtonName>
            </RechooseButton>
          </ButtonDiv>
        </>
      )}
    </Container>
  );
};

const Container = styled.section``;

const MainDiv = styled.div``;

const IconDiV = styled.span`
  margin-right: 2vh;
  padding-top: 10%;
  vertical-align: middle;
`;

const ButtonName = styled.span`
  cursor: pointer;
  font-style: normal;
  font-size: 3vmax;
  font-weight: 800;
`;

const ButtonDiv = styled.div`
  min-height: 100px;
  margin-top: 4vh;
  padding: 0 0% 0 5%;
`;

const MapButton = styled.div`
  max-width: 100%;
  min-height: 70px;
  margin-top: 2vh;
  padding: 2% 0% 2% 0%;
  background: #ff7b30;
  border-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  line-height: 70px;
  color: #ffffff;
  text-align: center;
`;

const ShareButton = styled.div`
  background: #faac69;
  border-radius: 15px;
  line-height: 70px;
  min-height: 70px;
  max-width: 100%;
  padding: 2% 0% 2% 0%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #ffffff;
  margin-top: 2vh;

  text-align: center;
  cursor: pointer;
`;

const RechooseButton = styled.div`
  max-width: 100%;
  min-height: 70px;
  margin-top: 2vh;
  padding: 2% 0% 2% 0%;
  border-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  background: #f2f2f2;
  cursor: pointer;
  color: #ff7b30;
  text-align: center;
  line-height: 70px;
`;

const TitleDiv = styled.div`
  float: left;
  margin-top: 5vh;
  margin-left: 3vh;
  font-size: 40px;
  font-weight: 800;
  word-break: keep-all;
`;

const ImageWrapper = styled.img`
  float: right;
  height: 10vh;
`;

const ImgDiv = styled.div<style>`
  position: relative;
  display: ${(props) => props.display};
  padding: 0 0% 0 5%;
`;

const MenuImage = styled.img`
  max-width: 100%;
  margin-top: 3vh;
  object-fit: cover;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const FoodNameDiv = styled.div`
  position: absolute;
  min-width: 100%;
  padding: 5% 0% 5% 0%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: rgba(255, 255, 255, 0.75);
  font-style: normal;
  font-size: 8vmin;
  font-weight: 800;
  text-align: center;
  color: #383838;
  transform: translate(0%, -100%);
`;

export default TitleImg;
