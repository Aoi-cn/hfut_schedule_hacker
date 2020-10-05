
// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

export const config = {
  version: '2.10.0',
  autoConfig: {
    showDiffHelp: true,
    showAllSHelp: true,
  },
  userConfig: {
    showAiXin: true,
    theme: 0,
    imgOpacity: 0.9,
    courseOpacity: 0.88,
  }
}

export const updateInfo = {
  features: [
    {
      info: '1. 加入“日程”页面',
      comment: '全新入口页，更清晰的展示日程安排。',
      type: 2,
    },
    {
      info: '2. 自定义事件',
      comment: '支持自定义事件！点击没课的时间段试试吧~',
      type: 2,
    },
    {
      info: '3. 课程备忘录',
      comment: '可以用来记录作业、课堂测试、注意事项等~',
      type: 1,
    },
    // {
    //   info: '4. 全新主题：SKY色系',
    //   comment: '管理学院网络文化工作室-罗时锴倾情奉献',
    //   type: 1,
    // },
  ],
  bugs: [
    {
      info: '1. 同一时间两门以上课程的显示',
    },
    {
      info: '2. 界面美化，bug修复',
    },
  ]
}

export const helpInfo = [
  {
    info: '1.课表显示不出来怎么办？',
    comment: '先下拉刷新试试。如果不行，请尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定，并确认自己的校区选择正确。如果进行了上述操作依旧无法正常显示，请联系开发者修复bug~',
  },
  {
    info: '2.为什么会出现“课表更新失败”?',
    comment: '导致该情况的原因有很多，比如：更改了教务密码、登陆时校区选择错误、网络不稳定等。请参考第一条帮助进行操作。',
  },
  {
    info: '3.我的课表好像不准？',
    comment: '本小程序的数据与PC端教务实时同步（封网时也是），请先登录PC端教务查看自己课程是否一致，如有不一致请联系开发者（qq: 254139147）修复bug！',
  },
]
