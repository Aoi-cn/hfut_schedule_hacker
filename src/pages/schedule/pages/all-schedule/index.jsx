import React, { useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import * as actions from '../../../../actions/allSchedule'
import WhiteTable from '../../../../components/schedule-component/WhiteTable'
import DayLine from '../../../../components/schedule-component/DayLine'
import TimeLine from '../../../../components/schedule-component/TimeLine'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import CourseDetailFloatLayout from './components/CourseDetailFloatLayout'
import ScheduleFooter from './components/ScheduleFooter'
import './index.scss'


function AllSchedule(props) {
  const { bizData, uiData, showAd } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix } = bizData
  const { courseDetailFLData } = uiData

  // useEffect(() => {
  //   if (showAd) {
  //     const interstitialAd = Taro.createInterstitialAd({
  //       adUnitId: 'adunit-e8c3c88c149f8a07'
  //     })
  //     interstitialAd.show().catch((err) => {
  //       console.error(err)
  //     })
  //   }
  // }, [showAd])

  useDidShow(() => {
    Taro.hideHomeButton()
    props.enter()
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
    props.updateBizData({ weekIndex: weekIndex_ })
  }

  return (
    <View className='allSchedule'>
      <View className='allSchedule-header'>

        <ScheduleTop
          weekIndex={weekIndex}
          currentWeekIndex={currentWeekIndex}
          changeWeekIndex={changeWeekIndex}
        />
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

      <CourseDetailFloatLayout
        courseDetailFLData={courseDetailFLData}
        onClose={() => props.updateUiData({ courseDetailFLData: { isOpened: false } })}
      />

    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.allSchedule,
    showAd: state.schedule.bizData.userConfig.showAd,
  };
}

export default connect(mapStateToProps, actions)(AllSchedule);