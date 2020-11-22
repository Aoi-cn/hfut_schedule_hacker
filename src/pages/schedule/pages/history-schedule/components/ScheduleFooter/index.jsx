import React from 'react'
import { View, Text } from '@tarojs/components'
import { useSelector } from 'react-redux'

import IconFont from '../../../../../../components/iconfont'

export default (props) => {
  const { changeWeekIndex } = props
  const weekIndex = useSelector(state => state.historySchedule.bizData.weekIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)

  return (
    <View className='generalSchedule-footer'>
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#202124' />
      </View>
      {
        weekIndex !== currentWeekIndex &&
        <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='generalSchedule-footer-pop-text'>本周</Text>
        </View>
      }
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#202124' />
      </View>
    </View>
  )
}
