// import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/event'
import * as scheduleActions from './schedule'

// event的enter直接走schedule的enter
export const enter = () => async (dispatch, getState) => {
  await dispatch(scheduleActions.enter({ userType: 'me', isEvent: true }))
  const { schedule: { bizData: { scheduleMatrix, dayLineMatrix, currentWeekIndex, timeTable } } } = getState()
  let dayIndex = 0
  dayLineMatrix.map((weekData) => {
    weekData.map((dayData, dayIndex_) => {
      const { today } = dayData
      if (today) {
        dayIndex = dayIndex_
      }
    })
  })

  dispatch(updateBizData({
    scheduleMatrix,
    dayLineMatrix,
    currentWeekIndex,
    weekIndex: currentWeekIndex,
    timeTable,
    dayIndex,
    currentDayIndex: dayIndex,
  }))
}

export const updateBizData = (payload) => {
  return {
    type: UPDATE_BIZDATA,
    payload,
  }
}

export const updateUiData = (payload) => {
  return {
    type: UPDATE_UIDATA,
    payload,
  }
}

export const logout = () => {
  // 执行登出逻辑
  return {
    type: LOGOUT,
  }
}
