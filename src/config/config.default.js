
// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

export const config = {
  version: '2.5.0dev1',
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
      info: '1.新增课表主题：莫兰迪色',
      comment: '快点击右上角的加号-课表设置-更换课表主题试试吧！',
    },
    {
      info: '2.全新的版本更新提示',
      comment: '就是你现在看到的~',
    },
  ],
  bugs: [
    {
      info: '1.修复多个同学反馈的课程时间显示问题',
      // comment: '就是你现在看到的~',
    },
    {
      info: '2.修复一个建艺小姐姐反馈的课程时长问题',
      comment: '目前已支持显示3小时和4小时的课程',
    },
  ]
}

export const helpInfo = [
  {
    info: '1.课表显示不出来怎么办？',
    comment: '请先尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定。如果进行了上述操作依旧无法正常显示，请联系开发者修复bug~',
  },
  {
    info: '2.以后会推出查看绩点排名的功能吗？',
    comment: '绩点排名功能实现比较复杂，HFUTonline已经做的很好了，大家看绩点可以先去那里~',
  },
]
