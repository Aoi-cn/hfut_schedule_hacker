
// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

export const config = {
  version: '2.10.9',
  autoConfig: {
    showDiffHelp: true,
    showAllSHelp: true,
  },
  userConfig: {
    showAiXin: true,
    theme: 0,
    imgOpacity: 0.9,
    courseOpacity: 0.88,
    eventBoxHeight: 1.5, // 1倍高度或1.5倍高度
    showBoxMask: true,
    showEventMemo: true,
  }
}

export const updateInfo = {
  notices: [{
    info: 'PC端教务正在进行系统升级！',
    comment: '由于PC端教务正在进行系统升级，本小程序近期也会出现服务不稳定等情况，待教务升级完成之后即可恢复正常~',
  },],
  features: [
    {
      info: '1. 慕课查询',
      comment: '点击课表页右上角加号-我的慕课，查看自己（或npy）的慕课信息',
    },
    {
      info: '2. 性能优化',
      comment: '日程页面、课表页面打开速度翻倍！',
    },
  ],
  bugs: [
    {
      info: '1. 背景图片自动居中裁剪，不缩放',
      // comment: '点击课表页右上角加号-我的慕课，查看自己（或npy）的慕课信息！',
    },
  ]
}

export const helpInfo = [
  {
    info: '1. 课表显示不出来怎么办？',
    comment: '先多次下拉刷新试试。如果不行，请尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定，并确认自己的校区选择正确。如果进行了上述操作依旧无法正常显示，请联系开发者修复bug~',
  },
  {
    info: '2. 为什么会出现“更新出错”?',
    comment: '导致该情况的原因有很多，比如：教务又双叒叕炸了、自己更改了教务密码、登陆时校区选择错误、网络不稳定等。请参考第一条帮助进行操作。',
  },
  {
    info: '3. 我的课表好像不准？',
    comment: '本小程序的数据与PC端教务实时同步（封网时也是），请先登录PC端教务查看自己课程是否一致，如有不一致请联系开发者（qq: 254139147）修复bug！',
  },
]
