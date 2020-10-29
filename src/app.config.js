import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    
    // 'pages/home/pages/donate/index',

    'pages/event/index',
    'pages/schedule/index',
    'pages/home/index',
    
    'pages/login/index',
    'pages/home/pages/gift/index',
    'pages/home/pages/empty-clazz-room/index',
    'pages/home/pages/empty-clazz-room/pages/room-detail-schedule/index',
    'pages/home/pages/course-search/index',
    'pages/home/pages/exam-arrange/index',
    'pages/home/pages/grade/index',
    'pages/home/pages/teacher-evaluate/index',
    'pages/home/pages/donate/index',

    'pages/schedule/pages/all-schedule/index',
    'pages/schedule/pages/mooc/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '课表',
    navigationBarTextStyle: 'black',
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
    ]
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于获取天气信息" 
    }
  },
  usingComponents: useGlobalIconFont(),
}
