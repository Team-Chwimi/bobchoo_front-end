export const makeAddress = (address: string) => {
  return address
    .replace('대한민국 ', '')
    .replace('대한민국', '')
    .replace('KR ', '')
    .replace('서울특별시 KR', '');
};

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const handleUrlClick =
  (url: string): (() => void) =>
  () =>
    openInNewTab(url);
