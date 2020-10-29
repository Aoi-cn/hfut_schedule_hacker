import React from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { AtCalendar } from "taro-ui"

import { updateBizData, updateUiData, updateDayByCalendar } from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import './index.scss';

export default () => {
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  const weekIndex = useSelector(state => state.event.bizData.weekIndex)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const dayIndex = useSelector(state => state.event.bizData.dayIndex)
  const showCalendar = useSelector(state => state.event.uiData.showCalendar)
  const dispatch = useDispatch()

  let weekData = []
  if (dayLineMatrix.length === 0) {
    weekData = [
      { dayZh: "周一", dateZh: "10/01", today: false },
      { dayZh: "周二", dateZh: "10/02", today: false },
      { dayZh: "周三", dateZh: "10/03", today: false },
      { dayZh: "周四", dateZh: "10/04", today: false },
      { dayZh: "周五", dateZh: "10/05", today: false },
      { dayZh: "周六", dateZh: "10/06", today: false },
      { dayZh: "周日", dateZh: "10/07", today: false },
    ]
  } else {
    weekData = dayLineMatrix[weekIndex]
  }

  const handleClickDay = (dayIndex_) => {
    dispatch(updateBizData({ dayIndex: dayIndex_ }))
  }

  const handleClickCalendarDay = ({ value: { end } }) => {
    dispatch(updateDayByCalendar({ date: end }))
  }

  return (
    <View className='eventTimePicker'>
      {
        showCalendar ?
          <View className='eventTimePicker-calendar'>
            <AtCalendar isSwiper={false} minDate='2020/9/7' maxDate='2021/1/24' onSelectDate={e => handleClickCalendarDay(e)} />
            <View className='eventTimePicker-calendar-back' onClick={() => dispatch(updateUiData({ showCalendar: false }))}>收起</View>
          </View>
          :
          <View className='eventTimePicker-dayLine'>
            {
              weekData.map((dayData, dayIndex_) => (
                <View className='eventTimePicker-dayLine-item' key={dayData.dateZh}>
                  <View
                    className={`eventTimePicker-dayLine-box ${dayLineMatrix.length === 0 && 'eventTimePicker-dayLine-box_static'} eventTimePicker-dayLine-box_${dayIndex === dayIndex_ ? 'active' : ''}`}
                    onClick={() => handleClickDay(dayIndex_)}
                  >
                    <View className='eventTimePicker-dayLine-box_day'>
                      {dayData.dayZh}
                    </View>
                    <View className='eventTimePicker-dayLine-box_date'>
                      {parseInt(dayData.dateZh.split('/')[2])}
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
      }
    </View>
  )
}

