import React from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import { updateBizData } from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import './index.scss';

export default () => {
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const dayIndex = useSelector(state => state.event.bizData.dayIndex)
  const dispatch = useDispatch()

  if (dayLineMatrix.length === 0) {
    return ''
  }

  const weekData = dayLineMatrix[currentWeekIndex]

  const handleClickDay = (dayIndex_) => {
    dispatch(updateBizData({ dayIndex: dayIndex_ }))
  }

  return (
    <View className='eventTimePicker'>
      <View className='eventTimePicker-calendar'>

      </View>
      <View className='eventTimePicker-dayLine'>
        {
          weekData.map((dayData, dayIndex_) => (
            <View className='eventTimePicker-dayLine-item' key={dayData.dateZh}>
              <View
                className={`eventTimePicker-dayLine-box eventTimePicker-dayLine-box_${dayIndex === dayIndex_ ? 'active' : ''}`}
                onClick={() => handleClickDay(dayIndex_)}
              >
                <View className='eventTimePicker-dayLine-box_day'>
                  {dayData.dayZh}
                </View>
                <View className='eventTimePicker-dayLine-box_date'>
                  {parseInt(dayData.dateZh.split('/')[1])}
                </View>
              </View>
              {
                dayIndex_ === currentDayIndex &&
                <View className='eventTimePicker-dayLine-item_arrow'>
                  <IconFont name='arrow-up-filling' size={24} color='#aaaaaa' />
                </View>
              }
            </View>
          ))
        }
      </View>
    </View>
  )
}

