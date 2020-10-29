import React from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions_ from '../../../../actions/schedule'
import * as eventActions_ from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import './index.scss'

function SettingFloatLayout(props) {
  const { userConfig, scheduleActions, eventActions, isOpened, onClose } = props
  const { eventBoxHeight, showBoxMask, showEventMemo, exactWeather } = userConfig

  const eventHeightRange = [
    { name: '1倍', value: 1 },
    { name: '1.5倍', value: 1.5 },
  ]

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

  const handleEventHeightPickerChange = async (e) => {
    await updateUserConfig({ eventBoxHeight: eventHeightRange[parseInt(e.detail.value)].value })
  }

  const handleChangeExactWeather = (e) => {
    updateUserConfig({ exactWeather: e.detail.value })
    if (e.detail.value) {
      eventActions.updateExactWeather()
    }
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={onClose}
    >
      <View className='settingFloatLayout-header'>
        日程设置
        <View className='settingFloatLayout-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='settingFloatLayout-content'>

        <Picker mode='selector'
          range={eventHeightRange}
          rangeKey='name'
          value={eventBoxHeight === 1 ? 0 : 1}
          style={{ width: '100%' }}
          onChange={e => handleEventHeightPickerChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>日程盒子高度</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        <View className='settingFloatLayout-content-item'>
          <Text>日程上显示备忘录</Text>
          <Switch checked={showEventMemo} onChange={e => updateUserConfig({ showEventMemo: e.detail.value })} color='#29a2ff' />
        </View>

        <View className='settingFloatLayout-content-item'>
          <Text>当前时间前的日程阴影</Text>
          <Switch checked={showBoxMask} onChange={e => updateUserConfig({ showBoxMask: e.detail.value })} color='#29a2ff' />
        </View>

        <View className='settingFloatLayout-content-item'>
          <Text>精确天气（需开启位置信息）</Text>
          <Switch checked={exactWeather} onChange={handleChangeExactWeather} color='#29a2ff' />
        </View>

        {/* <View className='settingFloatLayout-line'></View> */}

        <View  className='settingFloatLayout-footer'></View>

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
    eventActions: bindActionCreators(eventActions_, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingFloatLayout);
