import React from 'react'
import { useDispatch } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData } from '../../../../actions/allSchedule'
import './index.less'

export default ({ courseBoxList, number }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const { name = "", clazzRoom, teacher, timeRange, lessonCode, lessonType, weekIndexes, studentClazzes, studentNumber, lessonId, credits, campus, weekIndexesZh, color } = courseBoxData
  const dispatch = useDispatch()

  // 有数据
  if (name) {
    
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
