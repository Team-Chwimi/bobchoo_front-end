import type { NextPage } from 'next';

import Link from 'next/link';

import styled from '@emotion/styled';

const Header: NextPage = () => {
  return (
    <HomeLink>
      <Link href="/">&#60; Home</Link>
    </HomeLink>
  );
};

const HomeLink = styled.span`
  font-size: 20px;
`;

export default Header;
