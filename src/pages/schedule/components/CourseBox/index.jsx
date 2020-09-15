import React from 'react'
import { useDispatch } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData } from '../../../../actions/schedule'
import './index.less'

export default ({ courseBoxList, number }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const courseBoxData_ = courseBoxList[1] ? courseBoxList[1] : {}
  const { name = "", clazzRoom, color } = courseBoxData
  const { name: name_ = "", color: color_ } = courseBoxData_
  const dispatch = useDispatch()

  const handleClick = (data) => {
    if (!name) { return }

    dispatch(updateUiData({
      courseDetailFLData: {
        isOpened: true,
        name: data.name,
        clazzRoom: data.clazzRoom,
        teacher: data.teacher,
        timeRange: data.timeRange,
        lessonCode: data.lessonCode,
        lessonType: data.lessonType,
        weekIndexes: data.weekIndexes,
        studentClazzes: data.studentClazzes,
        studentNumber: data.studentNumber,
        color: data.color,
        lessonId: data.lessonId,
        credits: data.credits,
        campus: data.campus,
        weekIndexesZh: data.weekIndexesZh,
      }
    }))
  }

  let courseName = name.length <= 8 ? name : (name.slice(0, 7) + "...")
  let courseName_ = name_.length <= 4 ? name_ : (name_.slice(0, 4) + `\n...`)
  if (courseBoxList.length > 1) {
    courseName = name.length <= 4 ? name : (name.slice(0, 4) + `\n...`)
  }

  return (
    <View className={`courseBox courseBox-${number}`}>
      <View className={`courseBox-course courseBox-course-${color} courseBox-course__${courseBoxList.length > 1 ? 'doubleLeft' : ''}`} onClick={() => handleClick(courseBoxData)}>
        <View className='courseBox-course-name'>{courseName}</View>
        <View className='courseBox-course-clazzRoom'>{courseBoxList.length > 1 ? '' : clazzRoom}</View>
      </View>
      {
        courseBoxList.length > 1 &&
        <View className={`courseBox-course courseBox-course__doubleRight courseBox-course-${color_}`} onClick={() => handleClick(courseBoxData_)}>
          <View className='courseBox-course-name'>{courseName_}</View>
          {/* <View className='courseBox-course-clazzRoom'>{clazzRoom_}</View> */}
        </View>
      }
    </View>
  )
}
