// actions/event.js 只是想把自定义事件相关的业务逻辑分开
// 其中，state和reducer与schedule完全一致

import Taro from '@tarojs/taro'
// import _ from 'lodash'
import uuid from '../utils/uuid'
import * as eventActions from './event'

import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'

export const addCustomSchedule = (payload) => async (dispatch, getState) => {
  let {
    source,
    name,
    clazzRoom,
    lessonId,
    color,
    dayIndex,
    startTime,
    timeIndexes,
    timeRange,
    weekIndexes,
    memo,
    scheduleMatrix
  } = payload

  const { login: { bizData: { userType: userType } } } = getState()
  const customSchedule = Taro.getStorageSync('custom')
  let userCustomSchedule = customSchedule[userType]
  if (source === 'event') {
    userCustomSchedule = customSchedule['me']
  }

  // lessonId不为空，说明是修改，不是新增
  if (lessonId) {
    scheduleMatrix.map((weekData, weekIndex_) => {
      weekData.map((dayData, dayIndex_) => {
        dayData.map((courseBoxList, timeIndex_) => {
          const { lessonId: lessonId_ } = courseBoxList[0]
          // 删除修改后没有的
          if (lessonId_ == lessonId && weekIndexes.indexOf(weekIndex_ + 1) === -1) {
            // console.log('--------')
            // console.log(courseBoxList[0])
            scheduleMatrix[weekIndex_][dayIndex_][timeIndex_][0] = {}
            userCustomSchedule[weekIndex_][dayIndex_][timeIndex_][0] = {}
          }
        })
      })
    })
  }
  lessonId = lessonId ? lessonId : uuid()

  weekIndexes.map(weekIndex => {
    scheduleMatrix[weekIndex - 1][dayIndex][startTime][0] = {
      type: 'custom',
      name,
      lessonId,
      clazzRoom,
      color,
      dayIndex,
      startTime,
      timeIndexes,
      timeRange,
      weekIndexes,
      memo: memo ? memo : '',
    }
    userCustomSchedule[weekIndex - 1][dayIndex][startTime][0] = {
      type: 'custom',
      name,
      lessonId,
      clazzRoom,
      color,
      dayIndex,
      startTime,
      timeIndexes,
      timeRange,
      weekIndexes,
      memo: memo ? memo : '',
    }
  })

  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })

  // 更新state
  if (!(source === 'event' && userType === 'her')) {
    dispatch(updateBizData({ scheduleMatrix }))
  }

  // 更新event
  if (userType === 'me' || source === 'event') {
    dispatch(eventActions.updateBizData({ scheduleMatrix }))
  }
}

// 改变单个自定义事件的颜色
export const updateSingleCustomColor = (payload) => async (dispatch, getState) => {
  const {
    schedule: { uiData: { courseDetailFLData: { isOpened: isScheduleOpened } } },
    event: { uiData: { courseDetailFLData: { isOpened: isEventOpened } } },
  } = getState()
  const { userType, source, newColor, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  // 拿到scheduleMatrix和本地数据
  let userData, scheduleMatrix
  if (source === 'event') {
    // 在event页面进行的操作
    scheduleMatrix = getState().event.bizData.scheduleMatrix
    userData = Taro.getStorageSync('me')
  } else {
    // 在scheudle页面进行的操作
    scheduleMatrix = getState().schedule.bizData.scheduleMatrix
    userData = Taro.getStorageSync(userType)
  }

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  let userCustomSchedule = customSchedule[userType]
  if (source === 'event') {
    userCustomSchedule = customSchedule['me']
  }

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, courseIndex) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          if (courseBoxData.lessonId === lessonId) {
            scheduleMatrix[weekIndex][dayIndex][courseIndex][timeIndex].color = newColor
            userCustomSchedule[weekIndex][dayIndex][courseIndex][timeIndex].color = newColor
          }
        })
      })
    })
  })
  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })
  if (source === 'event') {
    Taro.setStorage({
      key: 'me',
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  } else {
    Taro.setStorage({
      key: userType,
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  }

  // 更新底部弹出框，这里要分情况
  courseDetailFLData.color = newColor
  if (isScheduleOpened) {
    dispatch(updateUiData({ courseDetailFLData }))
  } else if (isEventOpened) {
    dispatch(eventActions.updateUiData({ courseDetailFLData }))
  }

  // 更新state
  if (!(source === 'event' && userType === 'her')) {
    dispatch(updateBizData({ scheduleMatrix }))
  }

  // 更新event
  if (source === 'event' || userType === 'me') {
    dispatch(eventActions.updateBizData({ scheduleMatrix }))
  }

  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 500
  })
}

// 删除单个自定义事件
export const deleteSingleCustom = (payload) => async (dispatch, getState) => {
  const { userType, source, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  // 改动1
  // 拿到scheduleMatrix和本地数据
  let userData, scheduleMatrix
  if (source === 'event') {
    // 在event页面进行的操作
    scheduleMatrix = getState().event.bizData.scheduleMatrix
    userData = Taro.getStorageSync('me')
  } else {
    // 在scheudle页面进行的操作
    scheduleMatrix = getState().schedule.bizData.scheduleMatrix
    userData = Taro.getStorageSync(userType)
  }

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  // 改动2
  let userCustomSchedule = customSchedule[userType]
  if (source === 'event') {
    userCustomSchedule = customSchedule['me']
  }

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, courseIndex) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          if (courseBoxData.lessonId === lessonId) {
            scheduleMatrix[weekIndex][dayIndex][courseIndex][timeIndex] = {}
            userCustomSchedule[weekIndex][dayIndex][courseIndex][timeIndex] = {}
          }
        })
      })
    })
  })
  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })
  // 改动3
  if (source === 'event') {
    Taro.setStorage({
      key: 'me',
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  } else {
    Taro.setStorage({
      key: userType,
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  }

  // 改动4
  // 关闭弹出框
  courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))

  // 更新state
  if (!(source === 'event' && userType === 'her')) {
    dispatch(updateBizData({ scheduleMatrix }))
  }

  // 更新event
  if (source === 'event' || userType === 'me') {
    dispatch(eventActions.updateBizData({ scheduleMatrix }))
    dispatch(eventActions.updateUiData({ courseDetailFLData }))
  }

  Taro.showToast({
    title: '删除成功',
    icon: 'none',
    duration: 500
  })
}


// 改变单个自定义事件的备忘录
export const updateSingleCustomMemo = (payload) => async (dispatch, getState) => {
  const { userType, source, type, memo, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  // 拿到scheduleMatrix和本地数据
  let userData, scheduleMatrix
  if (source === 'event') {
    // 在event页面进行的操作
    scheduleMatrix = getState().event.bizData.scheduleMatrix
    userData = Taro.getStorageSync('me')
  } else {
    // 在scheudle页面进行的操作
    scheduleMatrix = getState().schedule.bizData.scheduleMatrix
    userData = Taro.getStorageSync(userType)
  }

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  let userCustomSchedule = customSchedule[userType]
  if (source === 'event') {
    userCustomSchedule = customSchedule['me']
  }

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, courseIndex) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          if (courseBoxData.lessonId === lessonId) {
            scheduleMatrix[weekIndex][dayIndex][courseIndex][timeIndex].memo = memo
            if (type === 'custom') {
              userCustomSchedule[weekIndex][dayIndex][courseIndex][timeIndex].memo = memo
            }
          }
        })
      })
    })
  })
  if (type === 'custom') {
    Taro.setStorage({
      key: 'custom',
      data: customSchedule
    })
  }
  if (source === 'event') {
    Taro.setStorage({
      key: 'me',
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  } else {
    Taro.setStorage({
      key: userType,
      data: {
        ...userData,
        scheduleMatrix,
      }
    })
  }

  // 更新底部弹出框
  courseDetailFLData.memo = memo
  courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))

  // 更新state
  if (!(source === 'event' && userType === 'her')) {
    dispatch(updateBizData({ scheduleMatrix }))
  }

  // 更新event
  if (userType === 'me' || source === 'event') {
    dispatch(eventActions.updateBizData({ scheduleMatrix }))
    dispatch(eventActions.updateUiData({ courseDetailFLData }))
  }
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
