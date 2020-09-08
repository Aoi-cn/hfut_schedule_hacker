import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'

// 刚进入小程序时，判断是否有本地缓存，有的话就不用登录
export const enter = () => async (dispatch) => {
  Taro.getStorage({ key: 'userInfo' })
    .then(async () => {
      const scheduleMatrix = await Taro.getStorage({ key: 'scheduleMatrix' })
      dispatch(updateScheduleData({ scheduleMatrix: scheduleMatrix.data }))
    })
    .catch(() => {
      // 本地缓存获取失败，重新登录
      Taro.redirectTo({ url: '/pages/login/index' })
    })
}

// key失效，自动登录更新key
export const reLogin = () => async (dispatch) => {
  const userInfo = await Taro.getStorage({ key: 'userInfo' })
  const { username, password } = userInfo.data
  const res = await GET('/login', { username, password })
  const { success, msg, key } = res
  if (success) {
    await Taro.setStorage({
      key: 'userInfo',
      data: {
        username,
        password,
        key
      }
    })
    dispatch(updateScheduleData())
  } else {
    console.log(msg)
    Taro.showToast({
      title: '课表更新出错。如需更新成绩，请尝试重新登陆~',
      icon: 'none',
      duration: 3000
    })
  }
}

// 登陆成功/自动登录成功执行
export const updateScheduleData = (payload) => async (dispatch) => {
  // 先渲染本地的课表数据
  if (payload) {
    dispatch(updateBizData({ scheduleMatrix: payload.scheduleMatrix }))
  }
  // 进行课表更新逻辑
  const { data: { key } } = await Taro.getStorage({ key: 'userInfo' })
  const res = await GET('/schedule', { key, semesterId: 114 })
  // 课表请求出错。执行key过期之后的逻辑
  if (!res.body.currentWeek) {
    return dispatch(reLogin())
  }
  // 获取当前的weekIndex(currentWeekIndex)并本地存储
  const currentWeekIndex = res.body.currentWeek - 1
  Taro.setStorage({
    key: 'currentWeekIndex',
    data: currentWeekIndex
  })
  // 获取课表数据
  const scheduleData = res.body.lessons
  const lessonIds = res.body.lessonIds
  // 转化为UI可识别的matrix
  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds)

  // 生成一个时间线数据矩阵
  const dayLineMatrix = makeDayLineMatrix()

  // 将数据存在本地
  await Taro.setStorage({
    key: 'scheduleMatrix',
    data: scheduleMatrix
  })
  await Taro.setStorage({
    key: 'dayLineMatrix',
    data: dayLineMatrix
  })
  dispatch(updateBizData({ scheduleMatrix, dayLineMatrix, currentWeekIndex, weekIndex: currentWeekIndex }))
  Taro.showToast({
    title: '课表更新成功',
    icon: 'none',
    duration: 2000
  })
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
