import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    'pages/schedule/index',
    'pages/login/index',
    
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: useGlobalIconFont(),
}
