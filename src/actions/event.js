// actions/event.js 只是想把自定义事件相关的业务逻辑分开
// 其中，state和reducer与schedule完全一致

import Taro from '@tarojs/taro'
// import _ from 'lodash'
import uuid from '../utils/uuid'

import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'

export const addCustomSchedule = (payload) => async (dispatch, getState) => {
  const {
    name,
    clazzRoom,
    color,
    dayIndex,
    startTime,
    timeIndex,
    timeIndexes,
    timeRange,
    weekIndexes,
    scheduleMatrix
  } = payload

  const { login: { bizData: { userType: userType } } } = getState()
  const customSchedule = Taro.getStorageSync('custom')
  const customScheduleM = customSchedule[userType]
  const lessonId = uuid()

  weekIndexes.map(weekIndex => {
    scheduleMatrix[weekIndex - 1][dayIndex][startTime][0] = {
      type: 'custom',
      name,
      lessonId,
      clazzRoom,
      color,
      dayIndex,
      startTime,
      timeIndex,
      timeIndexes,
      timeRange,
      weekIndexes,
      memo: '',
    }
    customScheduleM[weekIndex - 1][dayIndex][startTime][0] = {
      type: 'custom',
      name,
      lessonId,
      clazzRoom,
      color,
      dayIndex,
      startTime,
      timeIndex,
      timeIndexes,
      timeRange,
      weekIndexes,
      memo: '',
    }
  })

  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })

  dispatch(updateBizData({ scheduleMatrix }))
}

// 改变单个自定义事件的颜色
export const updateSingleCustomColor = (payload) => async (dispatch, getState) => {
  const { schedule: { bizData: { scheduleMatrix } } } = getState()
  const { userType, newColor, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  const userData = Taro.getStorageSync(userType)

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  const userCustomSchedule = customSchedule[userType]

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
  Taro.setStorage({
    key: userType,
    data: {
      ...userData,
      scheduleMatrix,
    }
  })
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新底部弹出框
  courseDetailFLData.color = newColor
  dispatch(updateUiData({ courseDetailFLData }))
  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 500
  })
}

// 删除单个自定义事件
export const deleteSingleCustom = (payload) => async (dispatch) => {
  const { userType,  courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  const userData = Taro.getStorageSync(userType)
  const { scheduleMatrix } = userData

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  const userCustomSchedule = customSchedule[userType]

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
  Taro.setStorage({
    key: userType,
    data: {
      ...userData,
      scheduleMatrix,
    }
  })
  dispatch(updateBizData({ scheduleMatrix }))
  // 关闭弹出框
  courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))
  Taro.showToast({
    title: '删除成功',
    icon: 'none',
    duration: 500
  })
}

// 改变单个自定义事件的颜色
export const updateSingleCustomMemo = (payload) => async (dispatch, getState) => {
  const { schedule: { bizData: { scheduleMatrix } } } = getState()
  const { userType, type, memo, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  const userData = Taro.getStorageSync(userType)

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  const customSchedule = Taro.getStorageSync('custom')
  const userCustomSchedule = customSchedule[userType]

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
  Taro.setStorage({
    key: userType,
    data: {
      ...userData,
      scheduleMatrix,
    }
  })
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新底部弹出框
  courseDetailFLData.memo = memo
  courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))
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
