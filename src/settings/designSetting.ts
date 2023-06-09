// app theme preset color
import { createStorage } from '@/utils/Storage';
const Storage = createStorage({ storage: localStorage });
import { DARK_THEME } from '@/store/mutation-types';

export const appThemeList: string[] = [
  '#2d8cf0',
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
  '#FF3D68',
  '#00C1D4',
  '#71EFA3',
  '#171010',
  '#78DEC7',
  '#1768AC',
  '#FB9300',
  '#FC5404',
];

const setting = {
  // dark theme
  darkTheme: Storage.get(DARK_THEME, false),
  //system theme color
  appTheme: '#2d8cf0',
  //System built-in theme color list
  appThemeList,
};
export default setting;
