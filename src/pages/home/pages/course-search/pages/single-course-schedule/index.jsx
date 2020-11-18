import React, { memo } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect, useDispatch } from 'react-redux'
import { View } from '@tarojs/components'

import WhiteTable from '../../../../../../components/schedule-component/WhiteTable'
import DayLine from '../../../../../../components/schedule-component/DayLine'
import TimeLine from '../../../../../../components/schedule-component/TimeLine'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import ScheduleFooter from './components/ScheduleFooter'
import CourseDetailFloatLayout2 from '../../../../../../components/schedule-component/CourseDetailFloatLayout2'
import BackgroundImg from '../../../../../../components/schedule-component/BackgroundImg'
import { UPDATE_BIZDATA, UPDATE_UIDATA } from '../../../../../../constants/singleCourseSchedule'
import './index.scss'

const MemoBackgroundImg = memo(BackgroundImg)


function SingleCourseSchedule(props) {
  const { bizData, uiData, dayLineMatrix, currentWeekIndex } = props
  const { weekIndex, scheduleMatrix } = bizData
  const { courseDetailFLData } = uiData
  const dispatch = useDispatch()

  useDidShow(() => {
    Taro.hideHomeButton()
    dispatch({
      type: UPDATE_BIZDATA,
      payload: { weekIndex: currentWeekIndex },
    })
  })

  const changeWeekIndex = (weekIndex_) => {
    if (weekIndex_ < 0) {
      Taro.showToast({
        title: '当前已经是第一周',
        icon: 'none',
        duration: 500
      })
      return null
    } else if (weekIndex_ > 19) {
      Taro.showToast({
        title: '当前已经是最后一周',
        icon: 'none',
        duration: 500
      })
      return null
    }
    dispatch({
      type: UPDATE_BIZDATA,
      payload: { weekIndex: weekIndex_ },
    })
  }

  return (
    <View className='allSchedule'>
      <View className='allSchedule-header'>

        <ScheduleTop changeWeekIndex={changeWeekIndex} />
        <DayLine dayLineData={dayLineMatrix[weekIndex]} />

      </View>

      <View className='allSchedule-content'>
        <TimeLine />
        <View className='allSchedule-content-table'>
          <WhiteTable />
          {
            scheduleMatrix.length === 0 ? null :
              <CourseTable weekScheduleData={scheduleMatrix[weekIndex]} />
          }
        </View>
      </View>

      <ScheduleFooter changeWeekIndex={changeWeekIndex} />

      <CourseDetailFloatLayout2
        courseDetailFLData={courseDetailFLData}
        onClose={() => dispatch({
          type: UPDATE_UIDATA,
          payload: { courseDetailFLData: { isOpened: false } },
        })}
      />

      <MemoBackgroundImg />

    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.singleCourseSchedule,
    dayLineMatrix: state.event.bizData.dayLineMatrix,
    currentWeekIndex: state.event.bizData.currentWeekIndex,
  };
}

export default connect(mapStateToProps)(SingleCourseSchedule);