import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import * as actions from '../../../../../../actions/allSchedule'
import IconFont from '../../../../../../components/iconfont'

function ScheduleFooter(props) {
  const { weekIndex, currentWeekIndex, scheduleMatrix, backupScheduleM, diff, changeWeekIndex } = props

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
    <View className='generalSchedule-footer'>
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#202124' />
      </View>
      <View className={`generalSchedule-footer-pop generalSchedule-footer-pop-${diff ? 'active' : ''}`} onClick={handleDiff} >
        <Text className='generalSchedule-footer-pop-text'>对比</Text>
      </View>
      {
        weekIndex !== currentWeekIndex &&
        <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='generalSchedule-footer-pop-text'>本周</Text>
        </View>
      }
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#202124' />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    weekIndex: state.allSchedule.bizData.weekIndex,
    currentWeekIndex: state.allSchedule.bizData.currentWeekIndex,
    scheduleMatrix: state.allSchedule.bizData.scheduleMatrix,
    backupScheduleM: state.allSchedule.bizData.backupScheduleM,
    diff: state.allSchedule.uiData.diff,
  };
}

export default connect(mapStateToProps, actions)(ScheduleFooter);