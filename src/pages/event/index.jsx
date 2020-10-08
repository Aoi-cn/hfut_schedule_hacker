import React, { useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import * as eventActions from '../../actions/event'
import { updateScheduleData } from '../../actions/schedule'
import EventHeaderTitle from './components/EventHeaderTitle'
import EventTimePicker from './components/EventTimePicker'
import EventTable from './components/EventTable'
import EventTimeList from './components/EventTimeList'

import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'
import ColorPicker from '../../components/schedule-component/ColorPicker'
import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'
import checkUpdate from '../../utils/checkUpdate'
import './index.scss'

function Event(props) {
  // console.log(props)
  const { bizData, uiData, enter } = props
  const { weekIndex, scheduleMatrix, chosenBlank, timeTable } = bizData
  const { courseDetailFLData, showCustomScheduleFL, colorPickerData } = uiData

  useEffect(() => {
    enter({ userType: 'me' })
  }, [enter])

  useEffect(() => {
    checkUpdate()
    setInterval(() => {
      checkUpdate()
    }, 60000);
  }, [])

  usePullDownRefresh(async () => {
    await props.updateScheduleData({ userType: 'me', isEvent: true })
    Taro.stopPullDownRefresh();
  })

  return (
    <View className='event'>

      <View className='event-header'>
        <EventHeaderTitle />
        <EventTimePicker />
      </View>
      <View className='event-content'>
        <EventTimeList />
        <EventTable />
      </View>

      <View className='event-whiteBackground'></View>

      <CourseDetailFloatLayout
        courseDetailFLData={courseDetailFLData}
        source='event'
        onClose={() => props.updateUiData({ courseDetailFLData: { isOpened: false } })}
        updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({ colorPickerData: { isOpened: true, handleColorChange, theme, color } })}
      />

      <CustomScheduleFL
        isOpened={showCustomScheduleFL}
        source='event'
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
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.event,
  };
}

const mapActions = {
  ...eventActions,
  updateScheduleData,
}

export default connect(mapStateToProps, mapActions)(Event);
