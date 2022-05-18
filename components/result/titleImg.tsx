import Link from 'next/link';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { PALETTE } from '../../data/palette';
import { SurveyResponseType } from '../../types/answerType';
import { useEffect } from 'react';

const TitleImg: React.FC = () => {
  const imgUrl = useSelector<SurveyResponseType>((state) => state.foodImg);
  const foodName = useSelector<SurveyResponseType>((state) => state.foodName);
  useEffect(() => {
    console.log(imgUrl);
  }, []);
  return (
    <Container>
      <TitleDiv>
        오늘의 밥추!!
      </TitleDiv>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/bobchoo-f5928.appspot.com/o/%EA%B2%BD%EC%96%91%EC%8B%9D%EB%8F%88%EA%B9%8C%EC%8A%A4.jpg?alt=media&token=e327d6dc-ef55-4a8c-84f2-bfdf0a901273"
          alt="foodImg"
          width={600}
          height={400}
          layout='intrinsic'
        />
    </Container>
  );
};

const Container = styled.span`
  //   font-size: 16px;
  //   font-weight: 800;
  //   color: ${PALETTE.orange_point};
`;
const TitleDiv = styled.div``;

export default TitleImg;
