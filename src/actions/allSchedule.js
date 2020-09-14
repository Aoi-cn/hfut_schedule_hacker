import Taro from '@tarojs/taro'
import _ from 'lodash'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/allSchedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'
import scheduleDiffTool from '../utils/scheduleDiffTool'

export const updateScheduleData = (payload) => async (dispatch) => {
  const { clazz } = payload

  Taro.showLoading({
    title: '正在查询...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))

  const res = await GET('/schedule/schedule', { clazz })
  const { scheduleData, lessonIds } = res
  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds)
  await dispatch(updateBizData({ scheduleMatrix, backupScheduleM: _.cloneDeep(scheduleMatrix) }))
  Taro.hideLoading()
}

// 首次进入，检查本地存储有没有selectInfo和scheduleData。
// 有的话就dispaatch，没有就请求selectInfo并存在本地
export const enter = () => async (dispatch) => {
  const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()
  dispatch(updateBizData({ dayLineMatrix: dayLineMatrix, currentWeekIndex }))
  Taro.getStorage({ key: 'selectInfo' })
    .then(async ({ data: selectInfo }) => {
      dispatch(updateBizData({ selectInfo }))
    })
    .catch(async () => {
      const res = await GET('/schedule/select_info', {})
      Taro.setStorage({
        key: 'selectInfo',
        data: res
      })
      dispatch(updateBizData({ selectInfo: res }))
    })
}

export const diffSchedule = ({ targetScheduleM }) => async (dispatch) => {
  Taro.showLoading({ 
    title: '正在对比...',
    mask: true,
   })
  await dispatch(updateUiData({ diff: true }))
  const { scheduleMatrix: mineScheduleM } = Taro.getStorageSync('me')
  const diffScheduleM = scheduleDiffTool(targetScheduleM, mineScheduleM)
  await dispatch(updateBizData({ scheduleMatrix: diffScheduleM }))
  Taro.hideLoading()
}

export const cancelDiff = ({ backupScheduleM }) => async (dispatch) => {
  Taro.showLoading({ 
    title: '正在关闭...',
    mask: true,
   })
  await dispatch(updateUiData({ diff: false }))
  await dispatch(updateBizData({ scheduleMatrix: _.cloneDeep(backupScheduleM) }))
  Taro.hideLoading()
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
