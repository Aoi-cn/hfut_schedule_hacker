import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    'pages/event/index',
    'pages/schedule/index',
    'pages/login/index',
    'pages/gift/index',
    'pages/schedule/pages/allSchedule/index',
    // 'pages/advise/index',

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
      pagePath: 'pages/event/index',
      text: '日程',
      iconPath: 'assets/event.png',
      selectedIconPath: 'assets/event_active.png',
    },
    {
      pagePath: 'pages/schedule/index',
      text: '课表',
      iconPath: 'assets/schedule.png',
      selectedIconPath: 'assets/schedule_active.png',
    },
    {
      pagePath: 'pages/gift/index',
      text: '反馈',
      iconPath: 'assets/gift.png',
      selectedIconPath: 'assets/gift_active.png',
    }
    ]
  },
  usingComponents: useGlobalIconFont(),
}
