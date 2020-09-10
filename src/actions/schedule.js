import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'

// 刚进入小程序时，判断是否有本地缓存，有的话就不用登录
export const enter = () => async (dispatch) => {
  Taro.getStorage({ key: 'userInfo' })
    .then(async () => {
      // 读取本次数据
      const scheduleMatrix = await Taro.getStorage({ key: 'scheduleMatrix' })
      const dayLineMatrix = await Taro.getStorage({ key: 'dayLineMatrix' })
      dispatch(updateBizData({ scheduleMatrix: scheduleMatrix.data, dayLineMatrix: dayLineMatrix.data }))
      // 自动更新
      // dispatch(updateScheduleData({ scheduleMatrix: scheduleMatrix.data, dayLineMatrix: dayLineMatrix.data }))
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
export const updateScheduleData = () => async (dispatch) => {
  Taro.showLoading({ title: '正在加载...' })
  // 生成一个时间线数据矩阵，先渲染时间线
  const dayLineMatrix = await Taro.getStorage({ key: 'dayLineMatrix' })
  dispatch(updateBizData({ dayLineMatrix: dayLineMatrix.data }))

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

  

  // 将数据存在本地
  await Taro.setStorage({
    key: 'scheduleData',
    data: scheduleData
  })
  await Taro.setStorage({
    key: 'lessonIds',
    data: lessonIds
  })
  await Taro.setStorage({
    key: 'scheduleMatrix',
    data: scheduleMatrix
  })
  dispatch(updateBizData({ scheduleMatrix, currentWeekIndex, weekIndex: currentWeekIndex }))
  Taro.hideLoading()
  Taro.showToast({
    title: '课表更新成功',
    icon: 'none',
    duration: 2000
  })
}

export const refreshColor = () => async (dispatch) => {
  const scheduleData = await Taro.getStorage({ key: 'scheduleData' })
  const lessonIds = await Taro.getStorage({ key: 'lessonIds' })
  const scheduleMatrix = dataToMatrix(scheduleData.data, lessonIds.data)
  dispatch(updateBizData({ scheduleMatrix }))
  Taro.setStorage({
    key: 'scheduleMatrix',
    data: scheduleMatrix
  })
}

export const updateSingleCourseColor = (props) => async (dispatch) => {
  const { newColor, courseDetailFLData } = props
  const { lessonId } = courseDetailFLData
  let scheduleMatrix = await Taro.getStorage({ key: 'scheduleMatrix' })
  scheduleMatrix = scheduleMatrix.data
  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxData, courseIndex) => {
        console.log(courseBoxData)
        if (courseBoxData.lessonId === lessonId) {
          scheduleMatrix[weekIndex][dayIndex][courseIndex].color = newColor
        }
      })
      
    })
  })
  // 存新的课表数据矩阵
  Taro.setStorage({
    key: 'scheduleMatrix',
    data: scheduleMatrix
  })
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新底部弹出框
  courseDetailFLData.color = newColor
  dispatch(updateUiData({ courseDetailFLData }))
  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 1000
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
