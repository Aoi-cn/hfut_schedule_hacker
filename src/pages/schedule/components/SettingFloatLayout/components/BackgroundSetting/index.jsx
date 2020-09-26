import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions_ from '../../../../../../actions/schedule'
import IconFont from '../../../../../../components/iconfont'
import CustomButton from '../../../../../../components/CustomButton'
import './index.scss'

function BackgroundSetting(props) {
  const { userConfig, scheduleActions, isOpened, onClose } = props

  const handleSettingImg = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: async function (chooseImgRes) {
        // 选择成功了一张图片，先清空本地的缓存图片
        Taro.showLoading({
          title: '正在设置...',
          mask: true,
        })
        await Taro.getSavedFileList({
          success: function (savedFileRes) {
            if (savedFileRes.fileList.length > 0){
              Taro.removeSavedFile({
                filePath: savedFileRes.fileList[0].filePath,
                complete: function (removeRes) {
                  console.log(removeRes)
                }
              })
            }
          }
        })
        const tempFilePath = chooseImgRes.tempFilePaths[0]
        await Taro.saveFile({
          tempFilePath: tempFilePath,
          success: function (saveFileRes) {
            const savedFilePath = saveFileRes.savedFilePath
            scheduleActions.updateBizData({ backgroundPath: savedFilePath })
          }
        })
        Taro.hideLoading()
      }
    })
  }

  const handleDeleteImg = () => {
    Taro.getSavedFileList({
      success: function (savedFileRes) {
        if (savedFileRes.fileList.length > 0){
          Taro.removeSavedFile({
            filePath: savedFileRes.fileList[0].filePath,
            complete: function (removeRes) {
              console.log(removeRes)
              Taro.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        }
      }
    })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={onClose}
    >
      <View className='settingFloatLayout-header'>课表设置</View>

      <View className='settingFloatLayout-content'>

        <View className='settingFloatLayout-content-item' onClick={handleSettingImg}>
          <Text>设置背景图片</Text>
          <IconFont name='arrow-right' size={54} color='#60646b' />
        </View>

        {/* <View className='settingFloatLayout-line'></View> */}

        <View className='settingFloatLayout-footer'>
          <View className='settingFloatLayout-footer-btnBox'>
            <CustomButton value='删除背景图片' type='primary' onSubmit={handleDeleteImg} />
          </View>
        </View>

      </View>

    </AtFloatLayout >
  )
}

function mapStateToProps(state) {
  return {
    userConfig: state.schedule.bizData.userConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scheduleActions: bindActionCreators(scheduleActions_, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSetting);
