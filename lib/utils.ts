export const makeAddress = (address: string) => {
  return address
    .replace('대한민국 ', '')
    .replace('대한민국', '')
    .replace('KR ', '')
    .replace('서울특별시 KR', '');
};
