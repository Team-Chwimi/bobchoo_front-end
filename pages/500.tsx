import type { NextPage } from 'next';

import ErrorSection from '../components/common/errorSection';

const Custom500: NextPage = () => {
  return <ErrorSection errorMessage="내부 서버에 오류가 발생했습니다" />;
};

export default Custom500;
