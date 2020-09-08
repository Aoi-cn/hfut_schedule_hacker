import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Picker } from '@tarojs/components'

import { updateScheduleData, refreshColor } from '../../../../actions/schedule'
import { logout } from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import LittleMenu from '../../../../components/LittleMenu'
import './index.less'

export default (props) => {
  const { weekIndex, currentWeekIndex, changeWeekIndex } = props
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()

  const weekIndexes = [
    { name: '第1周', index: 1 },
    { name: '第2周', index: 2 },
    { name: '第3周', index: 3 },
    { name: '第4周', index: 4 },
    { name: '第5周', index: 5 },
    { name: '第6周', index: 6 },
    { name: '第7周', index: 7 },
    { name: '第8周', index: 8 },
    { name: '第9周', index: 9 },
    { name: '第10周', index: 10 },
    { name: '第11周', index: 11 },
    { name: '第12周', index: 12 },
    { name: '第13周', index: 13 },
    { name: '第14周', index: 14 },
    { name: '第15周', index: 15 },
    { name: '第16周', index: 16 },
    { name: '第17周', index: 17 },
    { name: '第18周', index: 18 },
    { name: '第19周', index: 19 },
    { name: '第20周', index: 20 },
  ]
  
  const refreshColor_ = () => {
    dispatch(refreshColor())
  }

  const refreshData = () => {
    dispatch(updateScheduleData())
  }

  const logout_ = () => {
    dispatch(logout())
  }

  const menuList = [
    {
      value: '刷新颜色',
      icon: 'swap',
      onClick: refreshColor_,
    },
    {
      value: '更新数据',
      icon: 'sync',
      onClick: refreshData,
    },
    {
      value: '退出登录',
      icon: 'login',
      onClick: logout_,
    },
  ]

  

  const handlePickerChange = (e) => {
    const weekIndex_ = parseInt(e.detail.value)
    changeWeekIndex(weekIndex_)
  }

  return (
    <View className='scheduleTop'>
      <Picker mode='selector'
        range={weekIndexes}
        rangeKey='name'
        value={weekIndex}
        onChange={e => handlePickerChange(e)}
      >
        <View className='scheduleTop-title'>
          {`第${weekIndex + 1}周 ` + (currentWeekIndex === weekIndex ? "" : `（当前第${currentWeekIndex + 1}周）`)}
          <View className='scheduleTop-title-icon'>
            <IconFont name='icon-test' size={46} color='#ffffff' />
          </View>
        </View>
      </Picker>

      <View className='scheduleTop-operation' onClick={() => setShowMenu(!showMenu)}>
        <IconFont name='plus' size={42} color='#ffffff' />
      </View>
      <LittleMenu menuList={menuList} showMenu={showMenu} />
      {
        showMenu &&
        <View onClick={() => setShowMenu(false)} className='scheduleTop-mask'></View>
      }
      
    </View>

  )
}
