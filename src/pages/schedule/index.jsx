import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import IconFont from '../../components/iconfont'
import * as actions from '../../actions/schedule'
import WhiteTable from './components/WhiteTable'
import CourseTable from './components/CourseTable'
import DayLine from './components/DayLine'
import TimeLine from './components/TimeLine'
import ScheduleTop from './components/ScheduleTop'
import CourseDetailFloatLayout from './components/CourseDetailFloatLayout'
import './index.less'

function Schedule(props) {
  const { bizData, uiData } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix } = bizData
  const { courseDetailFLData } = uiData

  useDidShow(() => {
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#0089ff',
    })
    // 自动更新
    props.enter()
  })

  const changeWeekIndex = (weekIndex_) => {
    if (weekIndex_ < 0) {
      Taro.showToast({
        title: '当前已经是第一周',
        icon: 'none',
        duration: 1000
      })
      return null
    } else if (weekIndex_ > 19) {
      Taro.showToast({
        title: '当前已经是最后一周',
        icon: 'none',
        duration: 1000
      })
      return null
    }
    props.updateBizData({ weekIndex: weekIndex_ })
  }

  return (
    <View className='schedule'>
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

      <View className='schedule-footer'>
        <View className='schedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
          <IconFont name='arrow-lift' size={52} color='#202124' />
        </View>
        <View className='schedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
          <IconFont name='arrow-right' size={52} color='#202124' />
        </View>
      </View>

      <CourseDetailFloatLayout 
        isOpened={courseDetailFLData.isOpened}
        onClose={() => props.updateUiData({ courseDetailFLData: { isOpened: false } })}
        name={courseDetailFLData.name}
        clazzRoom={courseDetailFLData.clazzRoom}
        teacher={courseDetailFLData.teacher}
        timeRange={courseDetailFLData.timeRange}
        lessonCode={courseDetailFLData.lessonCode}
        studentClazzes={courseDetailFLData.studentClazzes}
        studentNumber={courseDetailFLData.studentNumber}
        color={courseDetailFLData.color}
        lessonId={courseDetailFLData.lessonId}
      />
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.schedule
  };
}

export default connect(mapStateToProps, actions)(Schedule);
