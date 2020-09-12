import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData } from '../../../../actions/allSchedule'
import './index.less'

export default ({ courseBoxData, number }) => {
  const { name = "", clazzRoom, teacher, timeRange, lessonCode, lessonType, weekIndexes, studentClazzes, studentNumber, lessonId, credits, campus, weekIndexesZh, color } = courseBoxData
  const { level } = useSelector(state => state.allSchedule.bizData)
  const dispatch = useDispatch()

  // 过滤掉重修的课（非本年级的）
  if (studentClazzes) {
    if (studentClazzes[0].indexOf(level) === -1) {
      return (
        <View className={`courseBox courseBox-${number}`}>
        </View>
      )
    }
  }

  const handleClick = () => {
    if (!name) { return }

    dispatch(updateUiData({
      courseDetailFLData: {
        isOpened: true,
        name,
        clazzRoom,
        teacher,
        timeRange,
        lessonCode,
        lessonType,
        weekIndexes,
        studentClazzes,
        studentNumber,
        color,
        lessonId,
        credits,
        campus,
        weekIndexesZh,
      }
    }))
  }

  return (
    <View className={`courseBox courseBox-${number}`} onClick={handleClick}>
      <View className={`courseBox-course ` + `courseBox-course-${color}`}>
        <View className='courseBox-course-name'>{name.length <= 8 ? name : (name.slice(0, 7) + "...")}</View>
        <View className='courseBox-course-clazzRoom'>{clazzRoom}</View>
      </View>
    </View>
  )
}
