import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
// import Script from 'next/script';

import styled from '@emotion/styled';

import useQuestion from '../hooks/useQuestion';

import { useSelector } from '../store';
import { latlngActions } from '../store/latlng';
import { questionActions } from '../store/question';
import { answerActions } from '../store/answer';

import { axiosInstance } from '../lib/api';

import { QuestionType } from '../types/qestionType';

import LodaingCircular from '../components/common/loadingCircular';

import { PALETTE } from '../data/palette';

import Swal from 'sweetalert2';

// import axios from 'axios';

interface ButtonProps {
  backgroundColor: string;
  fontColor: string;
}

// interface QuestionType {
//   answerList: Array<string>;
//   description: string;
//   overlap: boolean;
//   question: string;
//   questionId: number;
//   // openNow: boolean;
// }

const Home: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.latlng);

  const [canGetLocation, setCanGetLocation] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const { isLoading, data, isError, errorMessage } = useQuestion();

  const imgRef = useRef<HTMLImageElement>(null);

  function onLoad() {
    setIsImgLoaded(true);
  }

  useEffect(() => {
    if (imgRef.current?.complete) {
      onLoad();
    }
  }, []);

  useEffect(() => {
    if (!location.hasCheckedLocation) {
      getLocation().then(() => {
        dispatch(
          latlngActions.setHasCheckedLocation({ hasCheckedLocation: true }),
        );
      });
    } else {
      setIsFirst(false);
    }
  }, []);

  useEffect(() => {
    dispatch(answerActions.reset());
  }, []);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCanGetLocation(true);
        dispatch(
          latlngActions.setLatLng({
            lat: coords.latitude.toString(),
            lng: coords.longitude.toString(),
            hasCurrentLoaction: true,
          }),
        );
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            Swal.fire({
              icon: 'error',
              title: '현재 위치 엑세스가 거부되었습니다.',
              text: '서비스를 원활하게 이용하기 위해서는 현재 위치가 필요해요. 설정에서 위치 조회를 허용해주세요.',
              confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
              width: '400px',
            });
            break;
          case error.POSITION_UNAVAILABLE:
            Swal.fire({
              icon: 'error',
              title: '현재 위치를 확인할 수 없습니다.',
              text: '서비스를 원활하게 이용하기 위해서는 현재 위치가 필요해요. 다시 시도해 주세요.',
              confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: '에러가 발생했습니다.',
              text: '서비스를 원활하게 이용하기 위해서는 현재 위치가 필요해요. 다시 시도해 주세요.',
              confirmButtonText: '&nbsp&nbsp확인&nbsp&nbsp',
            });
            break;
        }
      },
    );
  };

  const handleLocationCheckedClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event.type === 'touchstart' && event.cancelable) event.preventDefault();
    // if (event.cancelable) event.preventDefault();
    // event.preventDefault();
    // const target = event.target as HTMLTextAreaElement;

    if (!location.hasCurrentLoaction) {
      Swal.fire({
        icon: 'info',
        text: '현재 위치가 설정되어있지 않습니다. 서비스를 이용할 수는 있지만 주변 음식점을 알려주기가 어려워요. 그래도 진행하시겠습니까?',
        confirmButtonText: '진행할래요',
        confirmButtonColor: '#339933',
        showCancelButton: true,
        cancelButtonColor: '#dd2222',
        cancelButtonText: '취소할게요',
      }).then((result) => {
        if (result.isConfirmed) {
          // router.push(`/${target.id}`);
        }
      });
    } else {
      // router.push(`/${target.id}`);
    }
  };

  //질문 받아오기
  type resultType = {
    result: QuestionType[];
  };

  const randomnApi = async () => {
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1/random',
      );
      const result = response.data;
      // const result = response.data.questionList;
      // const count = response.data.questionTotalCount;
      // return [result,count];
      return result;
    } catch (err) {
      // console.log(err);
    }
  };
  const handleQestionData = async () => {
    dispatch(questionActions.setQuestions(data?.questionList!));
    dispatch(questionActions.setQuestionTotal(data?.questionTotalCount!));
  };
  const handleRandomData = async () => {
    const randomdata = await randomnApi();
    // console.log(randomdata);
    // const qestions = randomdata;
    const count = 1;
    dispatch(questionActions.setQuestions([randomdata]));
    dispatch(questionActions.setQuestionTotal(count));
  };

  return (
    <Container>
      {/* <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.NEXT_PUBLIC_GA_TRACKING_ID});
        `}
      </Script> */}
      <Wrapper>
        <CopyrightImg
          src="/images/info_logo.png"
          alt="정보 로고"
          onClick={() => router.push('/copyright')}
        />
        <TitleWrapper>
          {!isImgLoaded ? <LodaingCircular /> : <></>}
          <TitleImg
            src="/images/title_logo.png"
            alt="밥추 로고"
            ref={imgRef}
            onLoad={onLoad}
          />
          <TitleInfo>식사 메뉴 추천 서비스</TitleInfo>
        </TitleWrapper>
        <ButtonWrapper>
          <StartButton
            id="random"
            backgroundColor={PALETTE.gray_F2}
            fontColor={PALETTE.orange_point}
            onClick={(event) => {
              // handleLocationCheckedClick(event);
              handleRandomData().then(() => {
                router.push('/random');
              });
            }}
          >
            랜덤으로 선택
          </StartButton>
          <StartButton
            id="survey"
            backgroundColor={PALETTE.orange_point}
            fontColor={PALETTE.white}
            onClick={(event) => {
              // handleLocationCheckedClick(event);
              handleQestionData().then(() => {
                router.push('/survey/1');
              });
            }}
          >
            설문조사 시작
          </StartButton>
        </ButtonWrapper>
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
`;

const CopyrightImg = styled.img`
  float: right;
  top: 5%;
  right: 4%;
  width: 32px;
  height: 32px;
  margin-top: 3vh;
  margin-right: 2vh;
  cursor: pointer;
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15vh 28% 0;
`;

const TitleImg = styled.img`
  width: 30vh;
`;

const TitleInfo = styled.h2`
  margin: 2% 0 3%;
  color: ${PALETTE.gray_52};
  font-size: 30px;
  font-weight: 800;
  line-height: 1.7;
  text-shadow: 1px 1px 2px #a3a3a3;

  @media (max-width: 991px) {
    margin: 1% 0 2%;
    font-size: 24px;
  }
  @media (max-width: 767px) {
    margin: 1% 0 9%;
    font-size: 18px;
  }
  @media (max-width: 575px) {
    margin: 1% 0 13%;
    font-size: 15px;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const StartButton = styled.button<ButtonProps>`
  width: 300px;
  height: 120px;
  border: 0px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  font-family: 'NanumSquareRound';
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.fontColor};
  line-height: 23px;
  transition: color 0.08s ease-in-out;

  &:first-of-type {
    margin-right: 32px;
  }

  @media (max-width: 991px) {
    width: 240px;
    height: 96px;
    font-size: 32px;
  }
  @media (max-width: 767px) {
    width: 233px;
    height: 55px;
    font-size: 22px;

    &:first-of-type {
      margin: 0 0 12px;
    }
  }
  @media (max-width: 575px) {
    width: 212px;
    height: 50px;
    font-size: 20px;

    &:first-of-type {
      margin-bottom: 11px;
    }
  }
`;

export default Home;
