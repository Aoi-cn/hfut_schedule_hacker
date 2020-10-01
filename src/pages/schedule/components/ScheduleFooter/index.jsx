import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import * as actions from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import './index.scss'

function ScheduleFooter(props) {
  const { bizData, uiData, userType, changeWeekIndex } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix } = bizData
  const { diff } = uiData

  const handleDiff = () => {
    if (!diff) {
      props.diffSchedule({ targetScheduleM: scheduleMatrix })
    } else {
      props.cancelDiff()
    }
  }

  return (
    <View className='schedule-footer'>
      <View className='schedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#60646b' />
      </View>
      {
        userType === 'her' &&
        <View className={`schedule-footer-pop schedule-footer-pop-${diff ? 'active' : ''}`} onClick={handleDiff} >
          <Text className='schedule-footer-pop-text'>对比</Text>
        </View>
      }
      {
        weekIndex !== currentWeekIndex &&
        <View className='schedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='schedule-footer-pop-text'>定位</Text>
        </View>
      }
      <View className='schedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#60646b' />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    userType: state.login.bizData.userType,
    ...state.schedule,
  };
}

export default connect(mapStateToProps, actions)(ScheduleFooter);