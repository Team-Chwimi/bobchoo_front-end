import Link from 'next/link';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { PALETTE } from '../../data/palette';
import { SurveyResponseType } from '../../types/answerType';
import { useEffect } from 'react';
import { FaShareAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

const TitleImg: React.FC = () => {
  const imgUrl = useSelector<SurveyResponseType>((state) => state.foodImg);
  const foodName = useSelector<SurveyResponseType>((state) => state.foodName);
  useEffect(() => {
    console.log(imgUrl);
  }, []);
  return (
    <Container>
      <MainDiv>
        <TitleDiv>오늘의 밥추!!</TitleDiv>
        <ImageWrapper src="/images/bobdol_nacho.gif" alt="밥돌이 이미지" />
      </MainDiv>
      <ImgDiv>
        <MenuImage
          src="https://firebasestorage.googleapis.com/v0/b/bobchoo-f5928.appspot.com/o/%EA%B2%BD%EC%96%91%EC%8B%9D%EB%8F%88%EA%B9%8C%EC%8A%A4.jpg?alt=media&token=e327d6dc-ef55-4a8c-84f2-bfdf0a901273"
          alt="foodImg"
        />
        <FoodNameDiv>경양식돈까스</FoodNameDiv>
      </ImgDiv>

      <ButtonDiv>
        <MapButton>
          {' '}
          <IconDiV>
            <FaMapMarkedAlt size={"6vmin"}/>
          </IconDiV>
          <ButtonName>
            주변식당찾기
          </ButtonName>
        </MapButton>
        <ShareButton>
          <IconDiV>
            <FaShareAlt size={"6vmin"}/>
          </IconDiV>
          <ButtonName>
           공유하기
          </ButtonName>
        </ShareButton>
        <RechooseButton>
          <IconDiV>
            <IoMdRefresh size={"6vmin"}/>
          </IconDiV>
          <ButtonName>
            다시 고르기
          </ButtonName>
        </RechooseButton>
      </ButtonDiv>
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
