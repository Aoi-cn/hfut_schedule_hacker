import React, { useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image } from '@tarojs/components'

import * as actions from '../../actions/schedule'
import WhiteTable from '../../components/schedule-component/WhiteTable'
import DayLine from '../../components/schedule-component/DayLine'
import TimeLine from '../../components/schedule-component/TimeLine'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import CourseDetailFloatLayout from './components/CourseDetailFloatLayout'
import ScheduleFooter from './components/ScheduleFooter'
import UpdateNotice from '../../components/UpdateNotice'
import HelpNotice from '../../components/HelpNotice'
import './index.scss'

function Schedule(props) {
  const { bizData, uiData, enter, userType, updateBizData } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix, backgroundPath } = bizData
  const { showUpdateNotice, showHelpNotice, courseDetailFLData } = uiData

  useEffect(() => {
    enter({ userType })
  }, [enter, userType])

  useEffect(() => {
    console.log('执行！！！！！')
    Taro.getSavedFileList({
      success: function (savedFileRes) {
        if (savedFileRes.fileList.length > 0){
          updateBizData({ backgroundPath: savedFileRes.fileList[0].filePath })
        }
      }
    })
  }, [updateBizData])

  usePullDownRefresh(async () => {
    await props.updateScheduleData({ userType })
    Taro.stopPullDownRefresh();
  })

  const changeWeekIndex = async (weekIndex_) => {
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
    await props.updateBizData({ weekIndex: weekIndex_ })
  }

  return (
    <View className='schedule'>

      { showUpdateNotice && <UpdateNotice />}
      { showHelpNotice && <HelpNotice />}

      <View className='schedule-header'>

        <ScheduleTop
          weekIndex={weekIndex}
          currentWeekIndex={currentWeekIndex}
          changeWeekIndex={changeWeekIndex}
        />
        <DayLine dayLineData={dayLineMatrix[weekIndex]} />
      </View>

      <View className='schedule-content'>
        <TimeLine />
        <View className='schedule-content-table'>
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

      <View className='schedule-background'>
        <Image style='width: 100%; height: 100%; opacity: 1' mode='scaleToFill' src={backgroundPath} />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.schedule,
    userType: state.login.bizData.userType,
  };
}

export default connect(mapStateToProps, actions)(Schedule);
