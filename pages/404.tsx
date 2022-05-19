import type { NextPage } from 'next';

import ErrorSection from '../components/common/errorSection';

const Custom404: NextPage = () => {
  return <ErrorSection errorMessage="요청하신 페이지를 찾을 수 없습니다" />;
};

export default Custom404;
