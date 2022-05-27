import axios from 'axios';

export const checkStoresExist = async (
  foodName: string,
  lat: string,
  lng: string,
) => {
  const kakaoKey: string = process.env
    .NEXT_PUBLIC_KAKAOMAP_REST_APPKEY as string;

  let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${foodName}&y=${lat}&x=${lng}&radius=1000&category_group_code=FD6`;
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `KakaoAK ${kakaoKey}`,
    },
  };
  axios.defaults.withCredentials = false;
  let response = await axios.get(url, config);
  let count = Number(response.data.documents.length);

  return count;
};
