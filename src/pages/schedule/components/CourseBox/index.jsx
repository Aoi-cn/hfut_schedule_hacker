import React from 'react'
import { useDispatch } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData } from '../../../../actions/schedule'
import './index.less'

export default ({ courseBoxData }) => {
  const { name = "", clazzRoom, teacher, timeRange, lessonCode, studentClazzes, studentNumber, lessonId, color } = courseBoxData
  const dispatch = useDispatch()

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
        studentClazzes,
        studentNumber,
        color,
        lessonId,
      }
    }))
  }

  return (
    <View className='courseBox' onClick={handleClick}>
      <View className={`courseBox-course ` + `courseBox-course-${color}`}>
        <View className='courseBox-course-name'>{name.length <= 8 ? name : (name.slice(0, 7) + "...")}</View>
        <View className='courseBox-course-clazzRoom'>{clazzRoom}</View>
      </View>
    </View>
  )
}
