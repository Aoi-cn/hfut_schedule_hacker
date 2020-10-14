import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import * as actions from '../../../../../../actions/allSchedule'
import IconFont from '../../../../../../components/iconfont'
import './index.scss'

function ScheduleFooter(props) {
  const { bizData, uiData, changeWeekIndex } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, backupScheduleM } = bizData
  const { diff } = uiData

  const handleDiff = () => {
    if (scheduleMatrix.length === 0) {
      return null
    }

    if (!diff) {
      props.diffSchedule({ targetScheduleM: scheduleMatrix })
    } else {
      props.cancelDiff({ backupScheduleM })
    }
  }

  return (
    <View className='allSchedule-footer'>
      <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#202124' />
      </View>
      <View className={`allSchedule-footer-pop allSchedule-footer-pop-${diff ? 'active' : ''}`} onClick={handleDiff} >
        <Text className='allSchedule-footer-pop-text'>对比</Text>
      </View>
      {
        weekIndex !== currentWeekIndex &&
        <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='allSchedule-footer-pop-text'>本周</Text>
        </View>
      }
      <View className='allSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#202124' />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.allSchedule,
  };
}

export default connect(mapStateToProps, actions)(ScheduleFooter);