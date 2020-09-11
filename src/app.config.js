import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    
    'pages/schedule/index',
    'pages/login/index',
    'pages/allSchedule/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '课表',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: '#fff',
    // borderStyle: 'white',
    custom: false,
    list: [{
      pagePath: 'pages/schedule/index',
      text: '我的课表',
      iconPath: 'assets/me.png',
      selectedIconPath: 'assets/me_active.png',
    }, {
      pagePath: 'pages/allSchedule/index',
      text: '全校课表',
      iconPath: 'assets/all.png',
      selectedIconPath: 'assets/all_active.png',
    }]
  },
  usingComponents: useGlobalIconFont(),
}
