import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import { UPDATE_UIDATA } from '../../../../../../constants/schedule/historySchedule'

export default ({ boxType, courseBoxList, number }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const { name = "", clazzRoom, teacher, timeRange, lessonCode, lessonType, weekIndexes, studentClazzes, studentNumber, lessonId, credits, campus, weekIndexesZh, color } = courseBoxData
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const dispatch = useDispatch()

  if (!boxType && boxType !== 0) { return <View className='courseBox-null'></View> }

  const handleClick = () => {
    if (!name) { return }

    dispatch({
      type: UPDATE_UIDATA,
      payload: {
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
      },
    })
  }

  if (boxType === 0) {
    return null
  }

  return (
    <View className={`courseBox courseBox-${number} courseBox-boxType_${boxType}`} onClick={handleClick}>
      <View className={`courseBox-course courseBox-course-boxType_${boxType} courseBox-boxColor-${color}_${theme}`}>
        <View className={`courseBox-course-name courseBox-fontColor-${color}_${theme}`}>{name.length <= 8 ? name : (name.slice(0, 7) + "...")}</View>
        <View className={`courseBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>{clazzRoom}</View>
      </View>
    </View>
  )
}
