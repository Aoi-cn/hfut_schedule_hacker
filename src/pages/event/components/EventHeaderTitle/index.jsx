import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import IconFont from '../../../../components/iconfont'
import SettingFloatLayout from '../SettingFloatLayout'
import { updateBizData, updateUiData } from '../../../../actions/event'
import './index.scss';

export default () => {
  const scheduleMatrix = useSelector(state => state.event.bizData.scheduleMatrix)
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  const weekIndex = useSelector(state => state.event.bizData.weekIndex)
  const dayIndex = useSelector(state => state.event.bizData.dayIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const showCalendar = useSelector(state => state.event.uiData.showCalendar)
  const dispatch = useDispatch()

  const [dailyEventNumber, setDailyEventNumber] = useState(0)
  const [dateZh, setDateZh] = useState(0)
  const [showSetting, setShowSetting] = useState(false)

  const strM = JSON.stringify(scheduleMatrix)

  useEffect(() => {
    let _dateZh = ''
    let _dailyEventNumber = 0
    dayLineMatrix.map((weekData, weekIndex_) => {
      if (weekIndex_ === weekIndex) {
        weekData.map((dayData, dayIndex_) => {
          if (dayIndex_ === dayIndex) {
            _dateZh = `${dayData.dateZh.split('/')[0]}月${parseInt(dayData.dateZh.split('/')[1])}日`
            scheduleMatrix[weekIndex_][dayIndex_].map(courseBoxList => {
              courseBoxList.map(courseBoxData => {
                if (courseBoxData.name) {
                  _dailyEventNumber++
                }
              })
            })
          }
        })
      }
    })
    setDateZh(_dateZh)
    setDailyEventNumber(_dailyEventNumber)
  }, [dayLineMatrix, scheduleMatrix, strM, weekIndex, dayIndex])

  const handleLocate = () => {
    dispatch(updateBizData({ weekIndex: currentWeekIndex }))
    dispatch(updateBizData({ dayIndex: currentDayIndex }))
  }

  return (
    <View className='eventHeaderTitle'>
      <View className='eventHeaderTitle-left'>
        <View className='eventHeaderTitle-title' onClick={() => dispatch(updateUiData({ showCalendar: !showCalendar }))}>
          <Text style={{ marginRight: 8 }}>第{weekIndex + 1}周 {dateZh}</Text>
          <IconFont name='arrow-down-filling' size={24} color='#aaaaaa' />
        </View>
        <View className='eventHeaderTitle-comment'>
          <Text>今日有</Text>
          <Text className='eventHeaderTitle-comment-number'>{dailyEventNumber}项</Text>
          <Text>日程</Text>
        </View>
      </View>

      <View className='eventHeaderTitle-right'>
        <View className='eventHeaderTitle-right-operation' style={{ marginRight: '8rpx' }} onClick={handleLocate}>
          <IconFont name='dingwei' size={48} color='#aaaaaa' />
        </View>
        <View className='eventHeaderTitle-right-operation' onClick={() => setShowSetting(true)}>
          <IconFont name='moreandroid' size={48} color='#aaaaaa' />
        </View>
      </View>

      <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
      />
    </View>
  )
}

