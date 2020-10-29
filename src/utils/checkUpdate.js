import Taro from '@tarojs/taro'

export default () => {
  // 检查更新
  const updateManager = Taro.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('更新检查：' + res.hasUpdate)
  })

  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      confirmColor: '#0089ff',
      cancelColor: '#60646b',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
}
