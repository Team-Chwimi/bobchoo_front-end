type PaletteColor =
  | 'white'
  | 'orange'
  | 'orange_point'
  | 'gray_52'
  | 'gray_F2'
  | 'gray_79'
  | 'gray_38';

type PaletteType = Record<PaletteColor, string>;

export const PALETTE: PaletteType = {
  white: '#fff',
  orange: '#FAAC69',
  orange_point: '#FF7B30',
  gray_F2: '#F2F2F2',
  gray_52: '#525252',
  gray_79: '#797979',
  gray_38: '#383838',
};
