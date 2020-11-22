import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import moment from 'moment'

import StandardFloatLayout from '../../../../components/StandardFloatLayout'
import { refreshColor, changeUserType } from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import LittleMenu from '../../../../components/LittleMenu'
import SettingFloatLayout from '../SettingFloatLayout'
import WeekPicker from '../../../../components/schedule-component/WeekPicker'
import './index.scss'

export default (props) => {
  const { weekIndex, currentWeekIndex, changeWeekIndex, preRender } = props

  if (preRender) {
    return (
      <View className='scheduleTop'>

        <View className='scheduleTop-aixin'>
        </View>

        <View className='scheduleTop-title' onClick={() => setShowWeekPicker(true)}>
          正在加载...
        <View className='scheduleTop-title-icon'>
            <IconFont name='arrow-down' size={46} color='#ffffff' />
          </View>
        </View>

        <View className='scheduleTop-operation'>
          <IconFont name='plus' size={46} color='#ffffff' />
        </View>
      </View>
    )
  }

  const [showMenu, setShowMenu] = useState(false)
  const [showLoverBox, setShowLoverBox] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const userType = useSelector(state => state.login.bizData.userType)
  const showAiXin = useSelector(state => state.schedule.bizData.userConfig.showAiXin)
  const dispatch = useDispatch()

  const daysZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const menuList = [
    {
      value: '刷新颜色',
      icon: 'swap',
      onClick: () => dispatch(refreshColor({ userType })),
    },
    {
      value: `${userType === 'me' ? '我的' : 'ta的'}慕课`,
      icon: 'paihangbang',
      onClick: () => Taro.navigateTo({ url: '/pages/schedule/pages/mooc/index' }),
    },
    {
      value: '历史课表',
      icon: 'bofangjilu',
      onClick: () => Taro.navigateTo({ url: '/pages/schedule/pages/history-schedule/index' }),
    },
    {
      value: '课表设置',
      icon: 'shezhi',
      onClick: () => setShowSetting(true),
    },
  ]

  const handleAiXinClick = () => {
    Taro.getStorage({ key: 'her' })
      .then(() => {
        dispatch(changeUserType({ userType }))
      })
      .catch(() => {
        setShowLoverBox(true)
      })
  }

  const handleLoverScheduleClick = async () => {
    dispatch(changeUserType({ userType }))
    setShowLoverBox(false)
  }

  const handleClickOperate = () => {
    setShowMenu(!showMenu)
  }

  return (
    <View className='scheduleTop'>

      <View className='scheduleTop-aixin' onClick={handleAiXinClick}>
        {
          showAiXin &&
          (userType === 'me' ?
            <IconFont name='aixin' size={42} color='#ffffff' />
            :
            <IconFont name='aixin-filled' size={42} color='#fcacc7' />)
        }
      </View>

      <View className='scheduleTop-title' onClick={() => setShowWeekPicker(true)}>
        {`第${weekIndex + 1}周 ` + (currentWeekIndex === weekIndex ? `（当前${daysZh[moment().day()]}）` : `（当前第${currentWeekIndex + 1}周）`)}
        <View className='scheduleTop-title-icon'>
          <IconFont name='arrow-down' size={46} color='#ffffff' />
        </View>
      </View>

      <View className={`scheduleTop-operation scheduleTop-operation_${showMenu ? 'open' : ''}`} onClick={handleClickOperate}>
        <IconFont name='plus' size={46} color='#ffffff' />
      </View>
      <LittleMenu menuList={menuList} showMenu={showMenu} />
      {
        showMenu &&
        <View onClick={() => setShowMenu(false)} className='scheduleTop-mask'></View>
      }

      <StandardFloatLayout
        isOpened={showLoverBox}
        onClose={() => setShowLoverBox(false)}
        title='情侣课表'
        content='再绑定一个学生的课表数据，一键切换查看！'
        buttons={[{
          value: '取消',
          type: 'cancel',
          onClick: () => setShowLoverBox(false)
        }, {
          value: '开始',
          type: 'call',
          onClick: handleLoverScheduleClick
        }]}
      />

      <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
      />

      <WeekPicker
        isOpened={showWeekPicker}
        onClose={() => setShowWeekPicker(false)}
        weekIndex={weekIndex}
        currentWeekIndex={currentWeekIndex}
        onChange={changeWeekIndex}
      />

    </View>

  )
}
