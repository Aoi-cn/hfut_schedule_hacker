import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker, Slider } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import * as scheduleActions_ from '../../../../actions/schedule'
import * as loginActions_ from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import CustomButton from '../../../../components/CustomButton'
import './index.scss'

function SettingFloatLayout(props) {
  const { userConfig, userType, scheduleActions, loginActions, isOpened, onClose } = props
  const { theme, showAiXin, imgOpacity, courseOpacity, showRedPoint, showAd } = userConfig
  const [showSetBackground, setShowSetBackground] = useState(false)

  const themeRange = [
    { name: '教务原装', value: 0 },
    { name: '小米课表', value: 1 },
    { name: '莫兰迪色系', value: 2 },
    { name: '美食拼盘', value: 3 },
  ]

  const handleUnbindHerClick = () => {
    Taro.showModal({
      title: '确定要解绑吗',
      content: '此操作将清空ta的所有数据',
      success: function (res) {
        if (res.confirm) {
          loginActions.unBindHer()
        }
      }
    })
  }

  const handleLogoutClick = () => {
    Taro.showModal({
      title: '确定要登出吗',
      content: '此操作将清空所有本地数据',
      success: function (res) {
        if (res.confirm) {
          loginActions.logout()
        }
      }
    })
  }

  const handleImgOpacityChange = (e) => {
    const opacity = e.detail.value
    updateUserConfig({ imgOpacity: opacity / 100 })
  }

  const handleCourseOpacityChange = (e) => {
    const opacity = e.detail.value
    updateUserConfig({ courseOpacity: opacity / 100 })
  }

  const updateUserConfig = (setting) => {
    scheduleActions.updateBizData({
      userConfig: {
        ...userConfig,
        ...setting,
      }
    })
    const config = Taro.getStorageSync('config')
    return Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        userConfig: {
          ...config.userConfig,
          ...setting,
        }
      }
    })
  }

  const handleThemePickerChange = async (e) => {
    await updateUserConfig({ theme: themeRange[parseInt(e.detail.value)].value })
    if (userType === 'me') {
      if (Taro.getStorageSync('her').scheduleMatrix) {
        scheduleActions.refreshColor({ userType: 'her', render: false })
      }
      await scheduleActions.refreshColor({ userType: 'me' })
    } else {
      scheduleActions.refreshColor({ userType: 'me', render: false })
      await scheduleActions.refreshColor({ userType: 'her' })
    }
    Taro.showToast({
      title: '更换成功',
      icon: 'success',
      duration: 1000
    })
  }

  const handleSettingImg = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: async function (chooseImgRes) {
        // 选择成功了一张图片，先清空本地的缓存图片
        await Taro.getSavedFileList({
          success: function (savedFileRes) {
            if (savedFileRes.fileList.length > 0) {
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

            const type = savedFilePath.split('.')[savedFilePath.split('.').length - 1]
            const { userInfo: { username } } = Taro.getStorageSync('me')
            Taro.uploadFile({
              url: 'https://oss.cavano.vip',
              filePath: savedFilePath,
              name: 'file',
              formData: {
                name: savedFilePath,
                key: `backgroundImg/${username}-${(new Date()).valueOf()}.${type}`,
                policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
                OSSAccessKeyId: "LTAI4GBfJcvNtskmbaNkyGoU",
                success_action_status: "200",
                signature: "Rc4ftUk/sn75q36BVOijwJSDG9g=",
              },
              success: function () {
                console.log('chooseImage success, temp path is: ', savedFilePath)
              },
              fail: function ({ errMsg }) {
                console.log('upladImage fail, errMsg is: ', errMsg)
              },
            })
          }
        })
        Taro.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }

  const handleDeleteImg = () => {
    Taro.showModal({
      title: '确定要清空背景吗？',
      success: function (res) {
        if (res.confirm) {
          Taro.getSavedFileList({
            success: function (savedFileRes) {
              if (savedFileRes.fileList.length > 0) {
                Taro.removeSavedFile({
                  filePath: savedFileRes.fileList[0].filePath,
                  complete: function () {
                    scheduleActions.updateBizData({ backgroundPath: '' })
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
      }
    })
  }

  const handleSettingClose = () => {
    setShowSetBackground(false)
    onClose()
  }

  const handleAdChange = (status) => {
    updateUserConfig({ showAd: status })
    if (!status) {
      Taro.showToast({
        title: '关闭成功',
        icon: 'none',
        duration: 1000
      })
    }
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={handleSettingClose}
    >
      <View className='settingFloatLayout-header'>
        课表设置
        <View className='settingFloatLayout-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='settingFloatLayout-content'>

        <Picker mode='selector'
          range={themeRange}
          rangeKey='name'
          value={theme}
          style={{ width: '100%' }}
          onChange={e => handleThemePickerChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>更换配色主题</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        <View className='settingFloatLayout-content-item' onClick={() => setShowSetBackground(true)}>
          <Text>设置背景图片</Text>
          <IconFont name='arrow-right' size={54} color='#60646b' />
        </View>

        {
          userType === 'me' &&
          <View className='settingFloatLayout-content-item'>
            <Text>隐藏情侣课表入口</Text>
            <Switch checked={!showAiXin} onChange={e => updateUserConfig({ showAiXin: !e.detail.value })} color='#29a2ff' />
          </View>
        }

        <View className='settingFloatLayout-content-item'>
          <Text>有备忘录的课程右上角显示红点</Text>
          <Switch checked={showRedPoint} onChange={e => updateUserConfig({ showRedPoint: e.detail.value })} color='#29a2ff' />
        </View>

        {/* <View className='settingFloatLayout-content-item'>
          <Text>关闭广告（广告可援助开发者😅）</Text>
          <Switch checked={!showAd} onChange={e => handleAdChange(!e.detail.value)} color='#29a2ff' />
        </View> */}

        <View className='settingFloatLayout-line'></View>

      </View>

      <View className='settingFloatLayout-footer'>
        <View className='settingFloatLayout-footer-btnBox'>
          <CustomButton value='解绑情侣' type='primary' onSubmit={handleUnbindHerClick} />
        </View>
        <View className='settingFloatLayout-footer_blank'></View>
        <View className='settingFloatLayout-footer-btnBox'>
          <CustomButton value='退出登录' type='danger' onSubmit={handleLogoutClick} />
        </View>
      </View>

      <AtActionSheet isOpened={showSetBackground} onClose={() => setShowSetBackground(false)} cancelText='取消' title='小提示：选择好图片后，可以点击左下角的“预览-编辑”对图片进行裁剪！'>
        <AtActionSheetItem onClick={handleSettingImg}>
          <View className='settingFloatLayout-actionSheet-item'>
            从相册选取图片
          </View>
        </AtActionSheetItem>
        <AtActionSheetItem>
          <View className='settingFloatLayout-actionSheet-item settingFloatLayout-actionSheet-item_slider'>
            <Text className='settingFloatLayout-actionSheet-item_sliderText'>设置图片透明度</Text>
            <Slider
              step={1}
              value={imgOpacity * 100}
              min={0}
              max={100}
              blockSize={24}
              showValue
              activeColor='#29a2ff'
              onchange={handleImgOpacityChange}
            />
          </View>
        </AtActionSheetItem>
        <AtActionSheetItem>
          <View className='settingFloatLayout-actionSheet-item settingFloatLayout-actionSheet-item_slider'>
            <Text className='settingFloatLayout-actionSheet-item_sliderText'>设置课程透明度</Text>
            <Slider
              step={1}
              value={courseOpacity * 100}
              min={0}
              max={100}
              blockSize={24}
              showValue
              activeColor='#29a2ff'
              onchange={handleCourseOpacityChange}
            />
          </View>
        </AtActionSheetItem>
        <AtActionSheetItem onClick={handleDeleteImg} className='settingFloatLayout-actionSheet-danger'>
          <View className='settingFloatLayout-actionSheet-danger'>
            删除已选择的图片
          </View>
        </AtActionSheetItem>
      </AtActionSheet>

    </AtFloatLayout >
  )
}

function mapStateToProps(state) {
  return {
    userConfig: state.schedule.bizData.userConfig,
    userType: state.login.bizData.userType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scheduleActions: bindActionCreators(scheduleActions_, dispatch),
    loginActions: bindActionCreators(loginActions_, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingFloatLayout);
