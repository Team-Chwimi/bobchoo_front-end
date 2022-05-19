import { useRouter } from 'next/router';
import Link from 'next/link';

import { useState } from 'react';

import styled from '@emotion/styled';

import { useSelector } from '../../store';

import LoadingBobdol from '../common/loadingBobdol';

import { PALETTE } from '../../data/palette';

import { FaShareAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { axiosInstance } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { selectedFoodActions } from '../../store/selectedFood';

const TitleImg: React.FC = () => {
  const results = useSelector((state) => state.selectedFood);
  const answers = useSelector((state) => state.answer);
  const requestType = useSelector((state) => state.requestType);

  const dispatch = useDispatch();

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const router = useRouter();

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
    dispatch(
      selectedFoodActions.setSelectedFood({
        foodName: data.foodName,
        foodImg: data.foodImg,
      }),
    );
  };

  const handleRandomOneData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomAPI(JSON.stringify(randomRequest));
    dispatch(
      selectedFoodActions.setSelectedFood({
        foodName: data.foodName,
        foodImg: data.foodImg,
      }),
    );
  };

  const handlePickAgain = () => {
    console.log(requestType.type);
    if (requestType.type === 'random') {
      handleRandomOneData().then(() => {
        setIsImgLoaded(false);
      });
    } else {
      handleOneData().then(() => {
        setIsImgLoaded(false);
      });
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
      <ImgDiv>
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
              {' '}
              <IconDiV>
                <FaMapMarkedAlt size={'6vmin'} />
              </IconDiV>
              <ButtonName onClick={() => router.push('/map')}>
                주변식당찾기
              </ButtonName>
            </MapButton>
            <ShareButton>
              <IconDiV>
                <FaShareAlt size={'6vmin'} />
              </IconDiV>
              <ButtonName>공유하기</ButtonName>
            </ShareButton>
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

const Container = styled.span`
  //   font-size: 16px;
  //   font-weight: 800;
  //   color: ${PALETTE.orange_point};
`;

const MainDiv = styled.div``;

const IconDiV = styled.span`
  padding-top: 10%;
  margin-right: 2vh;
  vertical-align: middle;
`;
const ButtonName = styled.span`
  font-style: normal;
  font-weight: 800;
  font-size: 6vmin;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  padding: 0 5% 0 5%;
  margin-top: 4vh;
  min-height: 100px;
`;

const MapButton = styled.div`
  background: #ff7b30;
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
  background: #f2f2f2;
  border-radius: 15px;
  max-width: 100%;
  line-height: 70px;
  min-height: 70px;
  padding: 2% 0% 2% 0%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #ff7b30;
  margin-top: 2vh;

  text-align: center;
  cursor: pointer;
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

const ImageWrapper = styled.img`
  // width: 61px;
  height: 10vh;
  float: right;
  margin-right: 2vh;
`;

const ImgDiv = styled.div`
  padding: 0 5% 0 5%;
  position: relative;
`;

const MenuImage = styled.img`
  max-width: 100%;
  margin-top: 3vh;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const FoodNameDiv = styled.div`
  position: absolute;
  width: 90vmin;
  background: rgba(255, 255, 255, 0.75);
  font-style: normal;
  font-weight: 800;
  font-size: 8vmin;
  text-align: center;
  padding: 5% 0% 5% 0%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #383838;
  transform: translate(0%, -100%);
`;

export default TitleImg;
