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
import scheduleDiffTool from '../utils/scheduleDiffTool'
import { version, updateState } from '../config/config.default'

// 登录成功、手动更新数据
export const updateScheduleData = ({ userType }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在加载...',
    mask: true,
  })

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  // 生成一个时间线数据矩阵，先渲染时间线
  const { dayLineMatrix } = makeDayLineMatrix()
  dispatch(updateBizData({ dayLineMatrix: dayLineMatrix }))

  // 进行课表更新逻辑
  const userData = Taro.getStorageSync(userType)
  if (!userData) {
    console.log('用户数据不存在：' + userType)
    return null
  }
  const { userInfo } = userData
  const { key, campus } = userInfo
  const res = await GET('/schedule', { key, campus, semesterId: 114 })
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
export const enter = ({ userType }) => async (dispatch) => {

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  Taro.getStorage({ key: userType })
    .then(async (userData) => {
      const { scheduleMatrix } = userData.data  // 读取本地的课表数据
      // 到这里还没有被catch，说明本地有可用的缓存。接下来判断版本更新：
      const config = Taro.getStorageSync('config')
      // 本地config都没有，说明是2.1.1或之前版本
      if (!config) {
        dispatch(handleAutoUpdate(config, true))
        return null
      }
      // 2.1.1之后的版本
      const { version: localVersion } = config
      if (localVersion !== version && updateState !== 0) {
        console.log('线上版本：' + version)
        console.log('本地版本：' + localVersion)
        console.log('执行操作状态：' + updateState)
        dispatch(handleAutoUpdate(config))
        return null
      }
      const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()  // 生成一个时间线矩阵
      dispatch(updateBizData({ scheduleMatrix, dayLineMatrix, currentWeekIndex, weekIndex: currentWeekIndex }))
    })
    .catch((e) => {
      // 本地缓存获取失败，重新登录
      console.error(e);
      Taro.redirectTo({ url: '/pages/login/index' })
    })
}

// 检测到版本更新后的自动数据更新
export const handleAutoUpdate = (config, force) => async (dispatch) => {
  if (updateState === 1 || force) {
    // state=1 需更新数据
    await dispatch(updateScheduleData({ userType: 'her' }))
    dispatch(updateScheduleData({ userType: 'me' }))
    if (!config) {
      Taro.setStorage({
        key: 'config',
        data: {
          version,
          showDiffHelp: true,
          showAllSHelp: true,
        },
      })
    } else {
      Taro.setStorage({
        key: 'config',
        data: {
          ...config,
          version,
        },
      })
    }
  } else {
    // state=2 退出登录
    dispatch(loginActions.logout())
    Taro.showToast({
      title: '检测到重大版本更新，请重新登陆一下~',
      icon: "none",
      duration: 2500,
    })
  }
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
    dispatch(updateScheduleData({ userType }))
  } else {
    console.log(msg)
    Taro.showToast({
      title: '课表更新出错。如需更新成绩，请尝试重新登陆~',
      icon: 'none',
      duration: 3000
    })
  }
}

export const refreshColor = ({ userType }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在刷新...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))

  const userData = await Taro.getStorage({ key: userType })
  const { userInfo, scheduleData, lessonIds } = userData.data

  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds)
  await dispatch(updateBizData({ scheduleMatrix }))
  await Taro.setStorage({
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds
    }
  })
  Taro.hideLoading()
}

export const updateSingleCourseColor = (payload) => async (dispatch) => {
  const { userType, newColor, courseDetailFLData: { courseDetailFLData } } = payload
  const { lessonId } = courseDetailFLData

  const userData = await Taro.getStorage({ key: userType })
  const { userInfo, scheduleData, scheduleMatrix, lessonIds } = userData.data

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, courseIndex) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          if (courseBoxData.lessonId === lessonId) {
            scheduleMatrix[weekIndex][dayIndex][courseIndex][timeIndex].color = newColor
          }
        })
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

export const changeUserType = ({ userType }) => async (dispatch) => {
  const newUserType = userType === 'me' ? 'her' : 'me'
  dispatch(loginActions.updateBizData({
    username: '',
    password: '',
    userType: newUserType,
  }))
  dispatch(enter({ userType: newUserType }))
  Taro.showToast({
    title: '切换成功',
    icon: 'none',
    duration: 800
  })
}

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


export const cancelDiff = () => async (dispatch) => {
  Taro.showLoading({
    title: '正在关闭...',
    mask: true,
  })
  await dispatch(updateUiData({ diff: false }))
  const { scheduleMatrix } = Taro.getStorageSync('her')
  await dispatch(updateBizData({ scheduleMatrix }))
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
