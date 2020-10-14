import React from 'react'
import { View, Text } from '@tarojs/components'
import { useSelector } from 'react-redux'

import IconFont from '../../../../../../../../components/iconfont'
import './index.scss'

export default (props) => {
  const { changeWeekIndex } = props
  const weekIndex = useSelector(state => state.roomDetailSchedule.bizData.weekIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)

  return (
    <View className='allSchedule-footer'>
      <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#202124' />
      </View>
      {
        weekIndex !== currentWeekIndex &&
        <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='allSchedule-footer-pop-text'>本周</Text>
        </View>
      }
      <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#202124' />
      </View>
    </View>
  )
}
