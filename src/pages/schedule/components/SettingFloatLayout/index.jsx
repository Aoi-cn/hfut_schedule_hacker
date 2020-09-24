import React from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions_ from '../../../../actions/schedule'
import * as loginActions_ from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import CustomButton from '../../../../components/CustomButton'
import './index.scss'

function SettingFloatLayout(props) {
  const { userConfig, userType, scheduleActions, loginActions, isOpened, onClose } = props
  const { theme, showAiXin } = userConfig

  const themeRange = [
    { name: '默认', value: 0 },
    { name: '活泼', value: 1 },
    { name: '莫兰蒂', value: 2 },
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

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={onClose}
    >
      <View className='settingFloatLayout-header'>课表设置</View>

      <View className='settingFloatLayout-content'>

        <Picker mode='selector'
          range={themeRange}
          rangeKey='name'
          value={theme}
          style={{ width: '100%' }}
          onChange={e => handleThemePickerChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>更换课表主题</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        {
          userType === 'me' &&
          <View className='settingFloatLayout-content-item'>
            <Text>隐藏情侣课表入口</Text>
            <Switch checked={!showAiXin} onChange={e => updateUserConfig({ showAiXin: !e.detail.value })} color='#29a2ff' />
          </View>
        }

        <View className='settingFloatLayout-line'></View>

        <View className='settingFloatLayout-footer'>
          <View className='settingFloatLayout-footer-btnBox'>
            <CustomButton value='解绑情侣' type='primary' onSubmit={handleUnbindHerClick} />
          </View>
          <View className='settingFloatLayout-footer_blank'></View>
          <View className='settingFloatLayout-footer-btnBox'>
            <CustomButton value='退出登录' type='danger' onSubmit={handleLogoutClick} />
          </View>
        </View>

      </View>

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
