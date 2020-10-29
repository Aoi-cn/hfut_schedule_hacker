import React from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import * as moment from 'moment'

import { updateUiData } from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import diffTime from '../../../../utils/diffTime'
import './index.scss'
import '../../../../style/courseBox.scss'

export default ({ boxType, courseBoxList, dayIndex, startTime, timeTable }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const courseBoxData_ = courseBoxList[1] ? courseBoxList[1] : {}
  const { type, name = "", clazzRoom, color, memo } = courseBoxData
  const { name: name_ = "", clazzRoom: clazzRoom_, color: color_ } = courseBoxData_

  const chosenBlank = useSelector(state => state.event.uiData.chosenBlank)
  const timeDistance = useSelector(state => state.event.uiData.timeDistance)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const weekIndex = useSelector(state => state.event.bizData.weekIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  // 天气
  const hourlyPrecipitation = useSelector(state => state.event.bizData.weatherHourly.precipitation)

  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const eventBoxHeight = useSelector(state => state.schedule.bizData.userConfig.eventBoxHeight)
  const showBoxMask = useSelector(state => state.schedule.bizData.userConfig.showBoxMask)
  const showEventMemo = useSelector(state => state.schedule.bizData.userConfig.showEventMemo)
  const dispatch = useDispatch()

  const isChosen = (chosenBlank[0] === dayIndex && chosenBlank[1] === startTime)
  let courseName = name.length <= 16 ? name : (name.slice(0, 15) + "...")
  let courseName_ = name_.length <= 7 ? name_ : (name_.slice(0, 6) + `\n...`)
  if (courseBoxList.length > 1) {
    courseName = name.length <= 7 ? name : (name.slice(0, 7) + `\n...`)
  }
  let courseMemo = ''
  if (memo) {
    courseMemo = memo.length <= 20 ? memo : (memo.slice(0, 19) + "...")
  }

  const handleClickCourse = (data) => {
    if (!name) { return }

    dispatch(updateUiData({
      courseDetailFLData: {
        isOpened: true,
        showMemo: true,
        type,
        name: data.name,
        clazzRoom: data.clazzRoom,
        teacher: data.teacher,
        timeRange: data.timeRange,
        timeIndexes: data.timeIndexes,
        dayIndex,
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
  }

  const openCustomScheduleFL = () => {
    setTimeout(() => {
      dispatch(updateUiData({
        customScheduleFLData: {
          isOpened: true,
          ...courseBoxData,
          dayIndex,
          startTime,
          chosenWeeks: [weekIndex + 1],
          currentWeekIndex: currentWeekIndex + 1,
        },
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


  if (!boxType) {
    return ''
  }

  // 这里计算确定高度

  const endTime = startTime + boxType - 1
  let { startTimeText } = timeTable[startTime]
  let { endTimeText } = timeTable[endTime]
  let height = diffTime(startTimeText, endTimeText) * eventBoxHeight
  if (boxType === 1) {
    height += 1
  }
  const virtualHeight = diffTime('07:00', endTimeText)
  // 上午大课间
  // let breakTime = 16
  let breakTime = 10 * eventBoxHeight + 1
  if ((startTime === 0 && boxType === 2) || (startTime === 1 && boxType === 1)) {
    // breakTime = 31
    breakTime = 20 * eventBoxHeight
  }
  // 午饭和晚饭
  let noon = false
  let noonHeight
  if (startTime === 4 - boxType || startTime === 12 - boxType) {
    startTimeText = timeTable[startTime + boxType - 1].endTimeText
    endTimeText = timeTable[startTime + boxType].startTimeText
    breakTime = diffTime(startTimeText, endTimeText) * eventBoxHeight + (eventBoxHeight === 1 ? 0 : 1)
    // 计算午休的高度
    noon = true
    noonHeight = (diffTime(timeTable[3].endTimeText, timeTable[4].startTimeText) - 20) * eventBoxHeight

  } else if (startTime === 8 - boxType) {
    startTimeText = timeTable[startTime + boxType - 1].endTimeText
    endTimeText = timeTable[startTime + boxType].startTimeText
    breakTime = diffTime(startTimeText, endTimeText) * eventBoxHeight + 1
    // noon = true
  }


  // 这里计算mask的高度
  let maskHeight = 0
  let maskBottomRadius = 20
  if (currentDayIndex > dayIndex) {
    maskHeight = height
  } else if (currentDayIndex < dayIndex) {
    maskHeight = 0
  } else {
    if (timeDistance > virtualHeight) {
      maskHeight = height
    } else {
      maskHeight = height - (virtualHeight - timeDistance) * eventBoxHeight
      maskHeight = maskHeight > 0 ? maskHeight : 0
      maskBottomRadius = 0
    }
  }
  // 非本周的情况
  if (weekIndex < currentWeekIndex) {
    maskHeight = height
  } else if (weekIndex > currentWeekIndex) {
    maskHeight = 0
  }

  // 确定是否带伞
  let rainPre = 0
  if (dayLineMatrix.length !== 0 && hourlyPrecipitation && name) {
    // 这里加(减)了15分钟，为了更大范围的预测
    const eventStartMoment = moment(dayLineMatrix[weekIndex][dayIndex].dateZh + ' ' + timeTable[startTime].startTimeText).subtract(15, 'minutes')
    const eventEndMoment = moment(dayLineMatrix[weekIndex][dayIndex].dateZh + ' ' + timeTable[endTime].endTimeText).add(15, 'minutes')
    hourlyPrecipitation.map(hourPre => {
      const { datetime, value } = hourPre
      const preMoment = moment(datetime)

      if (preMoment.isAfter(eventStartMoment) && preMoment.isBefore(eventEndMoment)) {
        rainPre += value
      }
    })
  }


  if (!name) {
    return (
      <View className='eventBox' style={{ height: height + 'rpx', paddingBottom: breakTime + 'rpx' }} onClick={setChosenBlank}>
        {
          isChosen ?
            <View
              className='eventBox-course'
              onClick={openCustomScheduleFL}
              style={{
                height: height + 'rpx',
                padding: 9 * eventBoxHeight + 'rpx',
                paddingLeft: 18 * eventBoxHeight + 'rpx',
                paddingTop: ((boxType === 1 && eventBoxHeight === 1) ? 5 : 9 * eventBoxHeight) + 'rpx',
              }}
            >
              <IconFont name='plus' size={eventBoxHeight === 1 ? 42 : 46} color='#c5c5c5' />
            </View>
            :
            <View className='eventBox-course' style={{ height: height + 'rpx' }}>
            </View>
        }

        {
          noon &&
          <View className='eventBox-noon' style={{
            bottom: 10 * eventBoxHeight + 'rpx',
            height: noonHeight + 'rpx',
            lineHeight: noonHeight + 'rpx',
          }}
          >
            午休
        </View>
        }
      </View>
    )
  }
  else if (courseBoxList.length > 2) {
    return (
      <View
        className='eventBox'
        style={{
          height: height + 'rpx',
          paddingLeft: 18 * eventBoxHeight + 'rpx',
          paddingRight: 18 * eventBoxHeight + 'rpx',
          paddingTop: ((boxType === 1 && eventBoxHeight === 1) ? 5 : 9 * eventBoxHeight) + 'rpx',
          marginBottom: breakTime + 'rpx',
        }}
      >
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
      style={{ height: height + 'rpx', paddingBottom: breakTime + 'rpx' }}
    >
      <View
        className={`eventBox-course courseBox-boxColor-${color}_${theme} eventBox-course__${courseBoxList.length > 1 ? 'doubleLeft' : ''}`}
        style={{
          height: height + 'rpx',
          paddingLeft: 18 * eventBoxHeight + 'rpx',
          paddingRight: 18 * eventBoxHeight + 'rpx',
          paddingTop: ((boxType === 1 && eventBoxHeight === 1) ? 5 : 9 * eventBoxHeight) + 'rpx',
        }}
        onClick={() => handleClickCourse(courseBoxData)}
      >
        <View
          className={`eventBox-course-name courseBox-fontColor-${color}_${theme}`}
          style={{ fontSize: (eventBoxHeight === 1 ? 28 : 32) + 'rpx' }}
        >{courseName}</View>
        {
          boxType > 1 &&
          <View
            className={`eventBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}
            style={{
              fontSize: (eventBoxHeight === 1 ? 24 : 28) + 'rpx',
              // marginTop: 12 * eventBoxHeight + 'rpx'
            }}
          >{clazzRoom}</View>
        }
        {
          (eventBoxHeight === 1.5 && boxType > 1 && showEventMemo) &&
          <View className={`eventBox-course-memo courseBox-fontColor-${color}_${theme}`}>{courseMemo}</View>
        }
      </View>
      {
        courseBoxList.length > 1 &&
        <View className={`eventBox-course eventBox-course__doubleRight courseBox-boxColor-${color_}_${theme}`} style={{ height: height + 'rpx' }} onClick={() => handleClickCourse(courseBoxData_)}>
          <View className={`eventBox-course-name courseBox-fontColor-${color_}_${theme}`}>{courseName_}</View>
          <View className={`eventBox-course-clazzRoom courseBox-fontColor-${color}_${theme}`}>{clazzRoom_}</View>
        </View>
      }

      {
        showBoxMask &&
        <View style={{ height: maskHeight + 'rpx', borderBottomRightRadius: maskBottomRadius + 'rpx', borderBottomLeftRadius: maskBottomRadius + 'rpx' }}
          className='eventBox-mask'
          onClick={() => handleClickCourse(courseBoxData)}
        ></View>
      }

      {
        rainPre > 0.01 &&
        <View className='eventBox-umbrella' onClick={() => {
          Taro.showToast({
            title: '记得带伞!',
            icon: 'none',
            duration: 500
          })
        }}
        >
          <IconFont name='dayu' size={eventBoxHeight === 1 ? 42 : 46} />
        </View>
      }

      {
        noon &&
        <View className='eventBox-noon' style={{
          bottom: 10 * eventBoxHeight + 'rpx',
          height: noonHeight + 'rpx',
          lineHeight: noonHeight + 'rpx',
        }}
        >
          午休
        </View>
      }

    </View>
  )
}
