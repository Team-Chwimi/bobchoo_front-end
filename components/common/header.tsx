import Link from 'next/link';

import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HomeLink>
        <Link href="/">&#60; HOME</Link>
      </HomeLink>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  margin-top: 3vh;
  margin-left: 8px;
`;

const HomeLink = styled.div`
  margin-left: 8px;
  font-size: 2vh;
  font-weight: 800;
  color: ${PALETTE.orange_point};
  cursor: pointer;
`;

export default Header;
