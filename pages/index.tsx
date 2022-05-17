import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import useQuestion from '../hooks/useQuestion';

import { useSelector } from '../store';
import { latlngActions } from '../store/latlng';
import { questionActions } from '../store/question';

import { QuestionType } from '../types/qestionType';

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

  const { isLoading, data, isError, errorMessage } = useQuestion();

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

  const handleQestionData = async () => {
    // const data = await qestionApi();
    // const qestions: QuestionType[] = data?.questionList;
    // const count: number = data?.questionTotalCount;

    dispatch(questionActions.setQuestions(data?.questionList!));
    dispatch(questionActions.setQuestionTotal(data?.questionTotalCount!));
  };

  return (
    <Container>
      {/* {
        // location.hasCheckedLocation && !location.hasCurrentLoaction
        !isFirst && !canGetLocation ? (
          <CurrentLocationInfo>현재 위치 파악 불가</CurrentLocationInfo>
        ) : (
          <></>
        )
      } */}
      {/* <button
        style={{ position: 'absolute', left: 0 }}
        onClick={(event) => {
          handleLocationCheckedClick(event);
          router.push('/map');
        }}
      >
        맵으로 이동하는 임시버튼
      </button>
      <button
        style={{ position: 'absolute', left: 0, top: 25 }}
        onClick={(event) => {
          router.push('/list');
        }}
      >
        우선 결과 전체화면으로 이동하는 버튼
      </button> */}
      <CopyrightImg
        src="/images/info_logo.png"
        alt="정보 로고"
        onClick={() => router.push('/copyright')}
      />
      <Wrapper>
        <TitleWrapper>
          <TitleImg src="/images/title_logo.png" alt="밥추 로고" />
          <TitleInfo>식사 메뉴 추천 서비스</TitleInfo>
        </TitleWrapper>
        <ButtonWrapper>
          <StartButton
            id="random"
            backgroundColor={PALETTE.gray_F2}
            fontColor={PALETTE.orange_point}
            onClick={handleLocationCheckedClick}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 3vh;

  @media (max-width: 991px) {
    // margin-top: 1%;
  }
  @media (max-width: 767px) {
    margin-top: 6%;
  }
  @media (max-width: 575px) {
    margin-top: 9%;
  }
`;

const CurrentLocationInfo = styled.span`
  position: absolute;
  top: 4px;
  right: 5%;
`;

const CopyrightImg = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 5%;
  right: 4%;
  cursor: pointer;

  @media (max-width: 991px) {
    top: 2%;
    right: 3%;
  }
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 28%;

  @media (max-width: 991px) {
    margin: 0 24%;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
    margin: 0 16%;
  }
`;

const TitleImg = styled.img`
  width: 95%;

  @media (max-width: 991px) {
    width: 85%;
  }
  @media (max-width: 767px) {
    width: 95%;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
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
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  font-size: 40px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  line-height: 23px;
  border: 0px;
  border-radius: 15px;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

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
      margin: 0 0 11px;
    }
  }
`;

export default Home;
