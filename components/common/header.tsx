import Link from 'next/link';

import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';
import { HeaderType } from '../../data/link';

interface HeaderProps extends HeaderType {}

const Header: React.FC<HeaderProps> = ({ linkName, linkPath }) => {
  return (
    <HomeLink
    onClick={()=>{
      window.location.replace("/");
    }}>
      {/* <Link href={linkPath}>&#60; {linkName}</Link> */}
      {/* <Link href={linkPath}>{linkName}</Link> */}
      &#60; HOME
    </HomeLink>
  );
};

const HomeLink = styled.span`
  font-size: 16px;
  font-weight: 800;
  margin-left: 1vh;
  margin-top: 5vw;
  color: ${PALETTE.orange_point};
`;

export default Header;
