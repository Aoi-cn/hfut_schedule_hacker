import React, { useState, useEffect } from 'react'
import { View, Picker } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import IconFont from '../../../../../../components/iconfont'
import WeekPicker from '../../../../../../components/schedule-component/WeekPicker'
import themeC from '../../../../../../style/theme'
import semesterData from '../../../../../../assets/data/semesterData'
import { currentSemester } from '../../../../../../config/config.default'
import { UPDATE_BIZDATA } from '../../../../../../constants/schedule/historySchedule'
import './index.scss'

export default (props) => {
  const { changeWeekIndex } = props
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  // const [selectedSemester, setSelectedSemester] = useState({})
  const weekIndex = useSelector(state => state.historySchedule.bizData.weekIndex)
  const semester = useSelector(state => state.historySchedule.bizData.semester)
  const scheduleMatrix = useSelector(state => state.historySchedule.bizData.scheduleMatrix)
  const dispatch = useDispatch()

  useEffect(() => {
    if (scheduleMatrix.length !== 0) {
      return
    }
    for (const singleSD of semesterData) {
      if (singleSD.id === currentSemester.id) {
        dispatch({
          type: UPDATE_BIZDATA,
          payload: { semester: singleSD },
        })
      }
    }
  }, [dispatch, scheduleMatrix])

  const handleSemesterChange = e => {
    dispatch({
      type: UPDATE_BIZDATA,
      payload: { semester: semesterData[e.detail.value] },
    })
  }

  return (
    <View className='scheduleTop'>

      <View className='scheduleTop-aixin'>
        <IconFont name='info-circle-fill' size={42} color={themeC['color-brand']} />
      </View>

      <View className='scheduleTop-title' onClick={() => setShowWeekPicker(true)}>
        {`第${weekIndex + 1}周 `}
        <View className='scheduleTop-title-icon'>
          <IconFont name='icon-test' size={46} color='#ffffff' />
        </View>
      </View>

      <View className='scheduleTop-operation'>
        <Picker
          mode='selector'
          range={semesterData}
          value={semester.index}
          rangeKey='nameZh'
          onChange={handleSemesterChange}
        >
          <IconFont name='search' size={46} color='#ffffff' />
        </Picker>
      </View>

      <WeekPicker
        isOpened={showWeekPicker}
        onClose={() => setShowWeekPicker(false)}
        weekIndex={weekIndex}
        currentWeekIndex={null}
        onChange={changeWeekIndex}
      />

    </View>

  )
}
