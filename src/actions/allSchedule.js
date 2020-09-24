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
  const { clazz, level } = payload

  Taro.showLoading({
    title: '正在查询...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))

  const res = await GET('/schedule/schedule', { clazz })
  const { scheduleData, lessonIds } = res
  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds)
  scheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          // 过滤掉重修的课（非本年级的）、公选课
          const { studentClazzes, lessonType } = courseBoxData
          if (!studentClazzes || !lessonType) {
            return null
          }
          if (studentClazzes[0].indexOf(level) === -1 || lessonType.indexOf('公选') !== -1) {
            courseBoxList[timeIndex] = {}
            console.log(courseBoxData)
          }
        })
      })
    })
  })
  await dispatch(updateBizData({ scheduleMatrix, backupScheduleM: _.cloneDeep(scheduleMatrix) }))
  Taro.hideLoading()
}

// 首次进入，检查本地存储有没有selectInfo和scheduleData。
// 有的话就dispaatch，没有就请求selectInfo并存在本地
export const enter = () => async (dispatch) => {
  // 先判断是不是第一次进入，是的话就显示help
  const config = Taro.getStorageSync('config')
  if (config.autoConfig.showAllSHelp) {
    Taro.showModal({
      title: '提示',
      content: `点击右上角的搜索按钮开始`,
      showCancel: false,
      confirmText: '我知道了',
    })
    Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        autoConfig: {
          ...config.autoConfig,
          showAllSHelp: false,
        }
      }
    })
  }
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

// 开始执行diff
export const diffSchedule = ({ targetScheduleM }) => async (dispatch) => {
  // 先判断是不是第一次点击，是的话就显示help
  const config = Taro.getStorageSync('config')
  if (config.showDiffHelp) {
    Taro.showModal({
      title: '提示',
      content: `这是将另一张课表与自己的进行对比：绿色代表两方都没课；红色代表两方都有课；黄色代表只有自己有课；蓝色代表只有对方有课。`,
      showCancel: false,
      confirmText: '我知道了',
    })
    Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        showDiffHelp: false,
      }
    })
  }
  
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
