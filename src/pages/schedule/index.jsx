import React, { useEffect } from 'react'
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
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import ScheduleFooter from './components/ScheduleFooter'
import UpdateNotice from '../../components/UpdateNotice'
import HelpNotice from '../../components/HelpNotice'
import BackgroundImg from './components/BackgroundImg'
import checkUpdate from '../../utils/checkUpdate'

import './index.scss'

function Schedule(props) {
  const { bizData, uiData, enter, userType, updateBizData } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix, chosenBlank, timeTable } = bizData
  const { showUpdateNotice, showHelpNotice, courseDetailFLData, showCustomScheduleFL, colorPickerData } = uiData

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
    Taro.getSavedFileList({
      success: function (savedFileRes) {
        if (savedFileRes.fileList.length > 0) {
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

      { showUpdateNotice && <UpdateNotice onClose={() => props.updateUiData({ showUpdateNotice: false })} />}
      { showHelpNotice && <HelpNotice onClose={() => props.updateUiData({ showHelpNotice: false })} />}

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
        updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({ colorPickerData: { isOpened: true, handleColorChange, theme, color } })}
      />

      <CustomScheduleFL
        isOpened={showCustomScheduleFL}
        onClose={() => props.updateUiData({ showCustomScheduleFL: false })}
        chosenBlank={chosenBlank}
        scheduleMatrix={scheduleMatrix}
        timeTable={timeTable}
        weekIndex={weekIndex}
      />

      <ColorPicker
        isOpened={colorPickerData.isOpened}
        onClose={() => props.updateUiData({ colorPickerData: { isOpened: false } })}
        handleColorChange={colorPickerData.handleColorChange}
        theme={colorPickerData.theme}
        currentColor={colorPickerData.currentColor}
      />

      <BackgroundImg />

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
