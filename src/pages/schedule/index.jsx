import React, { useEffect, memo, useState } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import * as actions from '../../actions/schedule'
import WhiteTable from '../../components/schedule-component/WhiteTable'
import DayLine from '../../components/schedule-component/DayLine'
import TimeLine from '../../components/schedule-component/TimeLine'
import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'
import ColorPicker from '../../components/schedule-component/ColorPicker'
import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'
import BackgroundImg from '../../components/schedule-component/BackgroundImg'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import ScheduleFooter from './components/ScheduleFooter'
import checkUpdate from '../../utils/checkUpdate'

const MemoBackgroundImg = memo(BackgroundImg)


function Schedule(props) {
  const { bizData, uiData, enter, userType } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix, timeTable, backgroundPath } = bizData
  const { courseDetailFLData, customScheduleFLData, colorPickerData } = uiData
  const [renderElse, setRenderElse] = useState(false)

  useEffect(() => {
    enter({ userType })
  }, [enter, userType])

  useEffect(() => {
    checkUpdate()
    setInterval(() => {
      checkUpdate()
    }, 60000);
  }, [])

  useEffect(() => {
    // 性能优化部分，延时加载部分组件
    if (!renderElse && backgroundPath) {
      setTimeout(() => {
        setRenderElse(true)
      }, 200);
    }
  })


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
    <View className='generalSchedule'>

      <View className='generalSchedule-header'>
        <ScheduleTop
          weekIndex={weekIndex}
          currentWeekIndex={currentWeekIndex}
          changeWeekIndex={changeWeekIndex}
          preRender={!renderElse}
        />
        <DayLine dayLineData={dayLineMatrix[weekIndex]} />
      </View>

      <View className='generalSchedule-content'>
        <TimeLine />
        <View className='generalSchedule-content-table'>
          <WhiteTable />
          <CourseTable weekScheduleData={scheduleMatrix[weekIndex]} />
        </View>
      </View>

      <MemoBackgroundImg />

      <ScheduleFooter changeWeekIndex={changeWeekIndex} />

      {
        renderElse &&
        <>
          <CourseDetailFloatLayout
            courseDetailFLData={courseDetailFLData}
            onClose={() => props.updateUiData({ courseDetailFLData: { ...courseDetailFLData, isOpened: false } })}
            updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({
              colorPickerData: { isOpened: true, handleColorChange, theme, color },
              courseDetailFLData: { ...courseDetailFLData, showMemo: false }
            })}
            openCustomScheduleFL={({ dayIndex, startTime, courseType, chosenWeeks }) => props.updateUiData({
              customScheduleFLData: {
                ...courseDetailFLData,
                isOpened: true,
                type: 'change',
                dayIndex,
                startTime,
                courseType,
                chosenWeeks,
                currentWeekIndex: currentWeekIndex + 1,
              },
              chosenBlank: [],
              courseDetailFLData: { ...courseDetailFLData, showMemo: false }
            })}
          />

          <CustomScheduleFL
            isOpened={customScheduleFLData.isOpened}
            customScheduleFLData={customScheduleFLData}
            updateData={(newData) => props.updateUiData({
              customScheduleFLData: {
                ...customScheduleFLData,
                ...newData,
              }
            })}
            updateCourseDetailFL={(data) => props.updateUiData({
              courseDetailFLData: {
                ...courseDetailFLData,
                ...data
              }
            })}
            onClose={() => props.updateUiData({
              customScheduleFLData: { isOpened: false },
              courseDetailFLData: { ...courseDetailFLData, showMemo: true }
            })}
            scheduleMatrix={scheduleMatrix}
            timeTable={timeTable}
            weekIndex={weekIndex}
            updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({ colorPickerData: { isOpened: true, handleColorChange, theme, color } })}
          />

          <ColorPicker
            isOpened={colorPickerData.isOpened}
            onClose={() => props.updateUiData({
              colorPickerData: { isOpened: false },
              courseDetailFLData: { ...courseDetailFLData, showMemo: true }
            })}
            handleColorChange={colorPickerData.handleColorChange}
            theme={colorPickerData.theme}
            currentColor={colorPickerData.currentColor}
          />
        </>
      }

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
