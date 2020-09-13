import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import * as loginActions from './login'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'

// 登录成功、手动更新数据
export const updateScheduleData = () => async (dispatch) => {
  Taro.showLoading({ 
    title: '正在加载...',
    mask: true,
   })

  // 先获取当前用户
  let userType = await Taro.getStorage({ key: 'userType' })
  userType = userType.data

  // 生成一个时间线数据矩阵，先渲染时间线
  const { dayLineMatrix } = makeDayLineMatrix()
  dispatch(updateBizData({ dayLineMatrix: dayLineMatrix }))

  // 进行课表更新逻辑
  const userData = await Taro.getStorage({ key: userType })
  const { userInfo } = userData.data
  const { key } = userInfo
  const res = await GET('/schedule', { key, semesterId: 114 })
  // 课表请求出错。执行key过期之后的逻辑
  if (!res.body.currentWeek) {
    return dispatch(reLogin({ userType }))
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
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds
    }
  })
  dispatch(updateBizData({ scheduleMatrix, currentWeekIndex, weekIndex: currentWeekIndex }))
  Taro.hideLoading()
  Taro.showToast({
    title: '课表更新成功',
    icon: 'none',
    duration: 2000
  })
}

// 刚进入小程序时，判断是否有本地缓存，有的话就不用登录
export const enter = () => async (dispatch) => {
  let userType = ''
  try {
    userType = await Taro.getStorage({ key: 'userType' })
    userType = userType.data
  } catch (e) {
    console.error(e);
    Taro.redirectTo({ url: '/pages/login/index' })
    return null
  }


  Taro.getStorage({ key: userType })
    .then(async (userData) => {
      const { scheduleMatrix } = userData.data  // 读取本地的课表数据
      const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()  // 生成一个时间线矩阵
      dispatch(updateBizData({ scheduleMatrix, dayLineMatrix, currentWeekIndex }))
      // 自动更新
      // dispatch(updateScheduleData({ scheduleMatrix: scheduleMatrix.data, dayLineMatrix: dayLineMatrix.data }))
    })
    .catch((e) => {
      // 本地缓存获取失败，重新登录
      console.error(e);
      Taro.redirectTo({ url: '/pages/login/index' })
    })
}

// key失效，自动登录更新key
export const reLogin = ({ userType }) => async (dispatch) => {
  const userData = await Taro.getStorage({ key: userType })
  const { userInfo } = userData.data
  const { username, password } = userInfo
  const res = await GET('/login', { username, password })
  const { success, msg, key } = res
  if (success) {
    await Taro.setStorage({
      key: userType,
      data: {
        userInfo: {
          username,
          password,
          key
        },
        scheduleMatrix: [],
        scheduleData: [],
        lessonIds: [],
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

export const refreshColor = () => async (dispatch) => {
  let userType = await Taro.getStorage({ key: 'userType' })
  userType = userType.data
  const userData = await Taro.getStorage({ key: userType })
  const { userInfo, scheduleData, lessonIds } = userData.data

  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds)
  dispatch(updateBizData({ scheduleMatrix }))
  Taro.setStorage({
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds
    }
  })
}

export const updateSingleCourseColor = (payload) => async (dispatch) => {
  const { newColor, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  let userType = await Taro.getStorage({ key: 'userType' })
  userType = userType.data
  const userData = await Taro.getStorage({ key: userType })
  const { userInfo, scheduleData, scheduleMatrix, lessonIds } = userData.data

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxData, courseIndex) => {
        if (courseBoxData.lessonId === lessonId) {
          scheduleMatrix[weekIndex][dayIndex][courseIndex].color = newColor
        }
      })
    })
  })
  // 存新的课表数据矩阵
  Taro.setStorage({
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds
    }
  })
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新底部弹出框
  courseDetailFLData.color = newColor
  courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))
  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 500
  })
}

export const changeUserType = () => async (dispatch) => {
  let userType = await Taro.getStorage({ key: 'userType' })
  userType = userType.data
  const newUserType = userType === 'me' ? 'her' : 'me'
  await Taro.setStorage({
    key: 'userType',
    data: newUserType
  })
  dispatch(loginActions.updateBizData({
    username: '',
    password: '',
    userType: newUserType,
  }))
  dispatch(enter({ userType }))
  Taro.showToast({
    title: '切换成功',
    icon: 'none',
    duration: 800
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
