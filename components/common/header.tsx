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

const HomeLink = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${PALETTE.orange_point};
  // position: absolute;
  margin-left: 8px;

`;

export default Header;
