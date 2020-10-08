import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import moment from 'moment'

import StandardFloatLayout from '../../../../components/StandardFloatLayout'
import { refreshColor, changeUserType, updateUiData } from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import LittleMenu from '../../../../components/LittleMenu'
import SettingFloatLayout from '../SettingFloatLayout'
import WeekPicker from '../../../../components/schedule-component/WeekPicker'
import './index.scss'

export default (props) => {
  const { weekIndex, currentWeekIndex, changeWeekIndex } = props
  const [showMenu, setShowMenu] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
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
      value: '全校课表',
      icon: 'paihangbang',
      onClick: () => Taro.navigateTo({ url: '/pages/schedule/pages/allSchedule/index' }),
    },
    {
      value: '用前必读',
      icon: 'file-text',
      onClick: () => setShowAbout(true),
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

      {/* <Picker mode='selector'
        range={weekIndexes}
        rangeKey='name'
        value={weekIndex}
        onChange={e => handlePickerChange(e)}
      >
        
      </Picker> */}
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
        isOpened={showAbout}
        onClose={() => setShowAbout(false)}
        title='用前必读'
        content={`本小程序不代表任何组织或机构的利益，完全出于交流学习和方便工大学子的目的而开发。\n
        如在使用中遇到bug、或者有好的功能建议，请联系小程序的开发者（qq：254139147）\n
        本项目已在GitHub开源，仓库名称为：hfut_schedule_hacker。欢迎对前端感兴趣的同学与我一起交流和开发！\n
        情侣课表功能专为我的挚爱：唐小姐开发。祝天下有情人终成眷属~
        `}
        buttons={[{
          value: '查看帮助',
          onClick: () => dispatch(updateUiData({ showHelpNotice: true }))
        }, {
          value: '更新公告',
          onClick: () => dispatch(updateUiData({ showUpdateNotice: true }))
        }]}
      />

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
