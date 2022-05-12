import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { useSelector } from '../store';
import { latlngActions } from '../store/latlng';

import { PALETTE } from '../data/palette';
import Link from 'next/link';

import Swal from 'sweetalert2';
import axios from 'axios';
import { questionActions } from '../store/question';
import {QuestionType} from '../types/qestionType'

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

  useEffect(() => {
    if (!location.hasCheckedLocation) {
      getLocation();
    }
  }, []);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch(
          latlngActions.setLatLng({
            lat: coords.latitude.toString(),
            lng: coords.longitude.toString(),
            hasCurrentLoaction: true,
          }),
        );
        dispatch(
          latlngActions.setHasCheckedLocation({ hasCheckedLocation: true }),
        );
      },
      (error) => {
        dispatch(
          latlngActions.setHasCheckedLocation({ hasCheckedLocation: true }),
        );
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

  const qestionApi = async() => {
    try{
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+"/api/v1/surveys");
      const result = response.data;
      // const result = response.data.questionList;
      // const count = response.data.questionTotalCount;
      // return [result,count];
      return result;
    }catch(err){
      console.log(err);
    }

  } 
  const handleQestionData = async()=>{
    const data = await qestionApi();
    const qestions = data.questionList;
    const count = data.questionTotalCount;
    
    dispatch(questionActions.setQuestions(qestions));
    dispatch(questionActions.setQuestionTotal(count));
  }

  return (
    <Container>
      {location.hasCheckedLocation && !location.hasCurrentLoaction ? (
        <CurrentLocationInfo>현재 위치 파악 불가</CurrentLocationInfo>
      ) : (
        <></>
      )}
      <button
        style={{ position: 'absolute', left: 0 }}
        onClick={(event) => {
          handleLocationCheckedClick(event);
          router.push('/map');
        }}
      >
        맵으로 이동하는 임시버튼
      </button>
      <CopyrightButton onClick={() => router.push('/copyright')}>
        저작권
      </CopyrightButton>
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
              handleLocationCheckedClick(event);
              handleQestionData();
              router.push('/survey/1');
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
    margin-top: 8%;
  }
`;

const CurrentLocationInfo = styled.span`
  position: absolute;
  top: 4px;
  right: 5%;
`;

const CopyrightButton = styled.button`
  position: absolute;
  top: 3%;
  right: 5%;
  cursor: pointer;

  @media (max-width: 767px) {
    top: 1%;
    right: 3%;
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
    width: 90%;
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
    margin: 1% 0 3%;
    font-size: 15px;
  }
  @media (max-width: 575px) {
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (max-width: 575px) {
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
