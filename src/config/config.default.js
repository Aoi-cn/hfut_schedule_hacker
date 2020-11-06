
// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

export const config = {
  version: '4.1.0',
  autoConfig: {
    showDiffHelp: true,
    showAllSHelp: true,
    showHomeRedPoint: true,
    showWeatherRedPoint: true, // event页面天气右上角的红点
  },
  userConfig: {
    // schedule的
    showAiXin: true,
    theme: 0,
    imgOpacity: 0.9,
    courseOpacity: 0.88,
    showRedPoint: true, // 课表上有备忘录的课程右上角的红点
    showAd: true,

    // event的
    eventBoxHeight: 1.5, // 1倍高度或1.5倍高度
    showBoxMask: true,
    showEventMemo: true, // event上显示memo
    exactWeather: true,
  }
}

export const updateInfo = {
  notices: [
    {
      info: '最近事情比较多，还有四门考试，所以更新的比较慢。谢谢同学们的支持，该来的总会来的！🤪'
    }
  ],
  features: [
    {
      info: '1. 图书馆馆藏检索',
      comment: '最棒的图书馆检索体验！',
    },
    {
      info: '2. 天气详情',
      comment: '点击左上角的天气图标可以查看天气详情哦~',
    },
    {
      info: '3. 优化部分细节，更新捐赠感谢列表',
      // comment: '用前必读中加入历史更新模块',
    },
    {
      info: '4. 添上了一句话',
      // comment: '用前必读中加入历史更新模块',
    },
  ],
  bugs: []
}

export const helpInfo = [
  {
    info: '1. 课表显示不出来/更新失败怎么办？',
    comment: '先多次下拉刷新试试。如果不行，请尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定，并确认自己的校区选择正确。如果进行了上述操作依旧无法正常显示，请联系开发者修复bug~',
  },
  {
    info: '2. 我的课表好像不准？',
    comment: '本小程序的数据与PC端教务实时同步（封网时也是），请先登录PC端教务查看自己课程是否一致，如有不一致请联系开发者（qq: 254139147）修复bug！',
  },
  {
    info: '3. 退出登录、解绑情侣等选项在哪里？',
    comment: '课表页-右上角加号-课表设置',
  },
]
