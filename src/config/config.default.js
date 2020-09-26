
// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

export const config = {
  version: '2.6.5',
  autoConfig: {
    showDiffHelp: true,
    showAllSHelp: true,
  },
  userConfig: {
    showAiXin: true,
    theme: 0,
  }
}

export const updateInfo = {
  features: [
    {
      info: '1.自定义课表背景',
      comment: '不仅仅是纯白的！现在可以自己上传图片设置背景~ ',
      type: 2,
    },
    {
      info: '2.一键恢复到当前周',
      type: 1,
    },
  ],
  bugs: [
    {
      info: '1.优化课表的布局显示和交互',
    },
    {
      info: '2.性能优化',
    },
  ]
}

export const helpInfo = [
  {
    info: '1.课表显示不出来怎么办？',
    comment: '请先尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定。如果进行了上述操作依旧无法正常显示，请联系开发者修复bug~',
  },
  {
    info: '2.为什么会出现“课表更新失败”?',
    comment: '导致该情况的原因有很多，比如：更改了教务密码、登陆时校区选择错误、网络不稳定等。建议推出后台重进，或者退出登录重新绑定。',
  },
  {
    info: '3.以后会推出查看绩点排名的功能吗？',
    comment: '绩点排名功能实现比较复杂，HFUTonline已经做的很好了，大家看绩点可以先去那里~',
  },
]
