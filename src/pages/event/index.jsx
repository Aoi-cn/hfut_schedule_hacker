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
import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'
import './index.scss'

function Event(props) {
  // console.log(props)
  const { bizData, uiData, enter } = props
  const { weekIndex, scheduleMatrix, chosenBlank, timeTable } = bizData
  const { courseDetailFLData, showCustomScheduleFL } = uiData

  useEffect(() => {
    enter({ userType: 'me' })
  }, [enter])

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

      <CourseDetailFloatLayout
        courseDetailFLData={courseDetailFLData}
        source='event'
        onClose={() => props.updateUiData({ courseDetailFLData: { isOpened: false } })}
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
