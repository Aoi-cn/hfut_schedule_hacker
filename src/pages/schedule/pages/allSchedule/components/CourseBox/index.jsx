import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData } from '../../../../../../actions/allSchedule'
import '../../../../../../style/courseBox.scss'
// import './index.scss'

export default ({ courseBoxList, number }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const { name = "", clazzRoom, teacher, timeRange, lessonCode, lessonType, weekIndexes, studentClazzes, studentNumber, lessonId, credits, campus, weekIndexesZh, color } = courseBoxData
  const { theme } = useSelector(state => state.schedule.bizData.userConfig)
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
      <View className={`courseBox-course courseBox-boxColor-${color}_${theme}`}>
        <View className={`courseBox-course-name courseBox-fontColor-${color}_${theme}`}>{name.length <= 8 ? name : (name.slice(0, 7) + "...")}</View>
        <View className={`courseBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>{clazzRoom}</View>
      </View>
    </View>
  )
}
