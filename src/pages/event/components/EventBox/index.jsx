import React from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import { updateUiData, updateBizData } from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import diffTime from '../../../../utils/diffTime'
import './index.scss'
import '../../../../style/courseBox.scss'

export default ({ boxType, courseBoxList, dayIndex, startTime, timeTable }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const courseBoxData_ = courseBoxList[1] ? courseBoxList[1] : {}
  const { type, name = "", clazzRoom, color } = courseBoxData
  const { name: name_ = "", color: color_ } = courseBoxData_
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const chosenBlank = useSelector(state => state.event.uiData.chosenBlank)
  const dispatch = useDispatch()

  const isChosen = (chosenBlank[0] === dayIndex && chosenBlank[1] === startTime)
  let courseName = name.length <= 16 ? name : (name.slice(0, 15) + "...")
  let courseName_ = name_.length <= 7 ? name_ : (name_.slice(0, 6) + `\n...`)
  if (courseBoxList.length > 1) {
    courseName = name.length <= 7 ? name : (name.slice(0, 7) + `\n...`)
  }

  const handleClickCourse = (data) => {
    if (!name) { return }

    dispatch(updateUiData({
      courseDetailFLData: {
        isOpened: true,
        type,
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
        memo: data.memo,
      },
      chosenBlank: [],
    }))
  }

  const setChosenBlank = () => {
    dispatch(updateUiData({ chosenBlank: [dayIndex, startTime] }))
    dispatch(updateBizData({ chosenBlank: [dayIndex, startTime] }))
  }

  const openCustomScheduleFL = () => {
    setTimeout(() => {
      dispatch(updateUiData({
        showCustomScheduleFL: true,
        chosenBlank: [],
      }))
    });
  }

  const handleMultCourseClick = () => {
    Taro.showActionSheet({
      itemList: courseBoxList.map(courseBD => courseBD.name),
      success: function (res) {
        dispatch(updateUiData({
          courseDetailFLData: {
            isOpened: true,
            ...courseBoxList[res.tapIndex],
          },
          chosenBlank: [],
        }))
      },
    })
  }


  // 这里计算确定高度

  if (!boxType) {
    return ''
  }

  const endTime = startTime + boxType - 1
  let { startTimeText } = timeTable[startTime]
  let { endTimeText } = timeTable[endTime]
  let height = diffTime(startTimeText, endTimeText) * 1.5
  // console.log(boxType)
  // console.log(height)
  // 上午大课间
  let breakTime = 16
  if ((startTime === 0 && boxType === 2) || (startTime === 1 && boxType === 1)) {
    breakTime = 31
  }
  // 午饭和晚饭
  if (startTime === 4 - boxType || startTime === 8 - boxType || startTime === 12 - boxType) {
    startTimeText = timeTable[startTime + boxType - 1].endTimeText
    endTimeText = timeTable[startTime + boxType].startTimeText
    breakTime = diffTime(startTimeText, endTimeText) * 1.5
    // console.log(breakTime)
  }


  if (!name) {
    return (
      <View className='eventBox' style={{ height: height + 'rpx', marginBottom: breakTime + 'rpx' }} onClick={setChosenBlank}>
        {
          isChosen ?
            <View className='eventBox-course' style={{ height: height + 'rpx' }} onClick={openCustomScheduleFL}>
              <IconFont name='plus' size={46} color='#c5c5c5' />
            </View>
            :
            <View className='eventBox-course' style={{ height: height + 'rpx' }}>
            </View>
        }
      </View>
    )
  }
  else if (courseBoxList.length > 2) {
    return (
      <View className='eventBox' style={{ height: height + 'rpx', marginBottom: breakTime + 'rpx' }}>
        <View className={`eventBox-course eventBox-course_mult courseBox-boxColor-${color}_${theme}`} style={{ height: height + 'rpx' }} onClick={handleMultCourseClick}>
          <View className={`eventBox-course-name courseBox-fontColor-${color}_${theme}`}>{`这里有${courseBoxList.length}节课`}</View>
          <View className={`eventBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>点击查看详情</View>
        </View>
      </View>
    )
  }

  return (
    <View
      className='eventBox'
      style={{ height: height + 'rpx', marginBottom: breakTime + 'rpx' }}
    >
      <View
        className={`eventBox-course courseBox-boxColor-${color}_${theme} eventBox-course__${courseBoxList.length > 1 ? 'doubleLeft' : ''}`}
        style={{ height: height + 'rpx' }}
        onClick={() => handleClickCourse(courseBoxData)}
      >
        <View className={`eventBox-course-name courseBox-fontColor-${color}_${theme}`}>{courseName}</View>
        {
          boxType > 1 &&
          <View className={`eventBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>{clazzRoom}</View>
        }
      </View>
      {
        courseBoxList.length > 1 &&
        <View className={`eventBox-course eventBox-course__doubleRight courseBox-boxColor-${color_}_${theme}`} style={{ height: height + 'rpx' }} onClick={() => handleClickCourse(courseBoxData_)}>
          <View className={`eventBox-course-name courseBox-fontColor-${color_}_${theme}`}>{courseName_}</View>
          <View className={`eventBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>{clazzRoom}</View>
        </View>
      }
    </View>
  )
}
