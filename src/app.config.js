import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    
    // 'pages/home/index',

    'pages/event/index',
    'pages/schedule/index',
    'pages/home/index',
    
    'pages/login/index',
    'pages/home/pages/gift/index',
    'pages/home/pages/empty-clazz-room/index',
    'pages/home/pages/empty-clazz-room/pages/room-detail-schedule/index',

    'pages/schedule/pages/all-schedule/index',
    'pages/schedule/pages/mooc/index',
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
      pagePath: 'pages/home/index',
      text: '我',
      iconPath: 'assets/home.png',
      selectedIconPath: 'assets/home_active.png',
    },
    // {
    //   pagePath: 'pages/schedule/pages/all-schedule/index',
    //   text: '全校',
    //   iconPath: 'assets/network.png',
    //   selectedIconPath: 'assets/network_active.png',
    // },
    // {
    //   pagePath: 'pages/gift/index',
    //   text: '反馈',
    //   iconPath: 'assets/gift.png',
    //   selectedIconPath: 'assets/gift_active.png',
    // }
    ]
  },
  usingComponents: useGlobalIconFont(),
}
