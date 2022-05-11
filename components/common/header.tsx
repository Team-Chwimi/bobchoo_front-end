import Link from 'next/link';

import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';
import { HeaderType } from '../../data/link';

interface HeaderProps extends HeaderType {}

const Header: React.FC<HeaderProps> = ({ linkName, linkPath }) => {
  return (
    <HomeLink>
      {/* <Link href={linkPath}>&#60; {linkName}</Link> */}
      <Link href={linkPath}>{linkName}</Link>
    </HomeLink>
  );
};

const HomeLink = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: ${PALETTE.orange_point};
`;

export default Header;
